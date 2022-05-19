import puppeteer from "puppeteer";

async function browsers() {
  const browser = await puppeteer.launch({
    headless: true,
    // headless: false,
    slowMo: 10, // slow down by 250ms
  });
  return browser;
}

async function pages(browser) {
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });
  return page;
}

async function waitTillHTMLRendered(page, timeout = 30000) {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

    console.log(`${Math.trunc((lastHTMLSize / currentHTMLSize) * 100)}% Loading page rendered...`);
    // console.log("last: ", lastHTMLSize, " <> curr: ", currentHTMLSize, " body html size: ", bodyHTMLSize);

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log("Page rendered fully..");
      break;
    }

    lastHTMLSize = currentHTMLSize;
    // await page.waitFor(checkDurationMsecs);
    await page.waitForTimeout(checkDurationMsecs);
  }
}

export { browsers, pages, waitTillHTMLRendered };
