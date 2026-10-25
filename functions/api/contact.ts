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

export const onRequestPost: PagesFunction<{ TURNSTILE_SECRET: string; BREVO_API_KEY: string }> = async (context) => {
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

    // Send email via Brevo (formerly Sendinblue)
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'ryopc pages', email: 'info@ryopc.org' },
        to: [{ email: 'info@ryopc.org', name: 'ryopc pages' }],
        subject: '【ryopc pages】お問い合わせ',
        htmlContent: `
          <h2>新しいお問い合わせ</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">お名前</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">メールアドレス</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">お問い合わせ種別</td><td style="padding: 8px; border: 1px solid #ddd;">${formData.category}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">お問い合わせ内容</td><td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${formData.message}</td></tr>
          </table>
          <p style="margin-top: 16px; color: #666; font-size: 12px;">このメールは ryopc pages のお問い合わせフォームから送信されました。</p>
        `,
        textContent: `
新しいお問い合わせ

お名前: ${formData.name}
メールアドレス: ${formData.email}
お問い合わせ種別: ${formData.category}
お問い合わせ内容: ${formData.message}

---
このメールは ryopc pages のお問い合わせフォームから送信されました。
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Brevo error:', emailResponse.status, errorText);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
        status: 502,
        headers: corsHeaders,
      });
    }

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