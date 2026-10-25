const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-first-run', '--no-default-browser-check']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Opening Brevo...');
  await page.goto('https://app.brevo.com/', { waitUntil: 'networkidle' });
  console.log('Page title:', await page.title());

  // Take screenshot
  await page.screenshot({ path: '/tmp/brevo-initial.png', fullPage: true });
  console.log('Screenshot saved to /tmp/brevo-initial.png');

  // Wait for manual login
  console.log('Please log in manually in the browser window...');
  await page.waitForURL('**/dashboard**', { timeout: 300000 });
  console.log('Logged in!');

  // Navigate to SMTP settings
  await page.goto('https://app.brevo.com/settings/keys/smtp', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/brevo-smtp.png', fullPage: true });
  console.log('SMTP settings page loaded');

  // Keep browser open for manual work
  console.log('Browser will stay open for 5 minutes for manual setup...');
  await page.waitForTimeout(300000);
  await browser.close();
})();