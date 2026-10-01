/*
 * Renders tools/og-image.html into the link-preview images Next.js serves:
 *   app/opengraph-image.png  (Facebook / Messenger / WhatsApp / LinkedIn)
 *   app/twitter-image.png    (X / Twitter)
 *
 * Usage: node tools/render-og.cjs
 * Needs puppeteer-core and a local Chrome; set CHROME_PATH to override.
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const root = path.resolve(__dirname, "..");
const source = "file:///" + path.join(__dirname, "og-image.html").replace(/\\/g, "/");
const target = path.join(root, "app", "opengraph-image.png");

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(source, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: target });
  fs.copyFileSync(target, path.join(root, "app", "twitter-image.png"));
  console.log("wrote app/opengraph-image.png and app/twitter-image.png");
  await browser.close();
})();
