const { chromium } = require('playwright');
(async () => {
  const dir = process.argv[2];
  const browser = await chromium.launch();
  for (const [name, width] of [['desktop', 700], ['mobile', 390]]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
    await page.goto('file://' + dir + '/preview.html');
    await page.waitForLoadState('networkidle');
    console.log(name, 'matches600 =', await page.evaluate(() => matchMedia('(max-width:600px)').matches));
    await page.screenshot({ path: dir + '/' + name + '.png', fullPage: true });
    await page.close();
  }
  await browser.close();
})();
