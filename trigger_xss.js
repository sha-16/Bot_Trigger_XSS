const puppeteer = require('puppeteer');
const phpSessidValue = require('fs').readFileSync('cookie.txt').toString();

const host = "127.0.0.1";
const url = "http://" + host + "/page_with_js.php";
const timeout = 2000;

(async () => {
  const browser = await puppeteer.launch({ headless: "new",
        args: [
     '--no-sandbox',
     '--disable-setuid-sandbox'
    ]
      });
  const page = await browser.newPage();

  await page.setCookie({
    name: 'PHPSESSID',
    value: phpSessidValue,
    domain: host,
    path: '/',
    httpOnly: false
  });

  page.on('request', (request) => {
    console.log("[URL] URL=" + request.url());
  });

  page.setDefaultTimeout(timeout);

  try {
    await page.goto(url);
    console.log("[INFO] rendered page");
  } catch (error) {
    console.log("[INFO] Timeout");
  } finally {
    await browser.close();
  }
})();
