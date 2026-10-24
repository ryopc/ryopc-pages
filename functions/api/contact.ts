import { TurnstileResponse, ContactFormData } from '../../src/lib/turnstile';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestPost: PagesFunction<{ TURNSTILE_SECRET: string }> = async (context) => {
  const { request, env, waitUntil } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let formData: ContactFormData;
    let turnstileToken: string;

    if (contentType.includes('application/json')) {
      const body = await request.json<{ formData: ContactFormData; turnstileToken: string }>();
      formData = body.formData;
      turnstileToken = body.turnstileToken;
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      formData = {
        name: form.get('name') as string,
        email: form.get('email') as string,
        category: form.get('category') as string,
        message: form.get('message') as string,
      };
      turnstileToken = form.get('cf-turnstile-response') as string;
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Unsupported content type' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return new Response(JSON.stringify({ success: false, error: 'Turnstile token missing' }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';

    const verifyResult = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET, clientIp, 'contact');

    if (!verifyResult.success) {
      return new Response(JSON.stringify({ success: false, error: 'Turnstile verification failed' }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    // Turnstile verification passed - form data is valid
    // In production, you would store to KV/D1 or forward to your preferred service
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      category: formData.category,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'お問い合わせを受け付けました。確認の上、ご連絡いたします。' 
    }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

async function verifyTurnstileToken(
  token: string,
  secret: string,
  clientIp: string,
  expectedAction: string
): Promise<TurnstileResponse> {
  const expectedHostnames = new Set(
    (['localhost', '127.0.0.1', 'pages.ryopc.org'] as string[])
  );

  if (typeof token !== 'string' || token.length === 0 || token.length > 2048 || expectedHostnames.size === 0) {
    return { success: false, 'error-codes': ['invalid-input-response'] };
  }

  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: clientIp,
      }),
    });

    if (!r.ok) {
      throw new Error(`siteverify ${r.status}`);
    }

    const result = (await r.json()) as TurnstileResponse;

    if (!result.success || result.action !== expectedAction || !expectedHostnames.has(result.hostname)) {
      return { success: false, 'error-codes': ['invalid-input-response'] };
    }

    return result;
  } catch {
    return { success: false, 'error-codes': ['timeout-or-duplicate'] };
  }
}