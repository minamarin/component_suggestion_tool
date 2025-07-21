import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeVisaComponentTitles() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();


  const url = 'https://design.visa.com/components/';
  await page.goto(url, { waitUntil: 'networkidle2' });
// await page.screenshot({ path: 'debug.png' });
await page.waitForSelector('#onetrust-accept-btn-handler', { timeout: 10000 });
await page.click('#onetrust-accept-btn-handler');
await page.waitForTimeout(3000); // Give React time to render after accept
    const currentUrl = page.url();
  console.log('Current page URL:', currentUrl);

  const html = await page.content();
console.log(html, '<--- html after goto');

  console.log('✅ Scraping component titles...');
  
  const titles = await page.evaluate(() => {
    // return Array.from(document.querySelectorAll('.v-content-card-title.v-typography-headline-4'))
    return Array.from(document.querySelectorAll('[data-collection-item]'))
      // .map(el => el.innerText.trim())
      .map(el => el.getAttribute('data-collection-item'))
      .filter(title => title.length > 0);
  });

  console.log(`✅ Found ${titles.length} component titles`);
  console.log(titles);

  fs.writeFileSync('./components.json', JSON.stringify(titles, null, 2));
  console.log('✅ Titles saved to components.json');

  await browser.close();
}

scrapeVisaComponentTitles();

// import puppeteer from 'puppeteer';
// import fs from 'fs';

// async function scrapeVisaComponents() {
//   const browser = await puppeteer.launch({ headless: 'new' });
//   const page = await browser.newPage();

//   // Step 1: Get component list from components landing page
//   const landingUrl = 'https://design.visa.com/components/';
//   await page.goto(landingUrl, { waitUntil: 'networkidle2' });

//   console.log('✅ Scraping component list...');
//  const componentList = await page.evaluate(() => {
//   const list = [];
//   document.querySelectorAll('.v-content-card.v-content-card-clickable.v-flex-grow').forEach(card => {
//     const name = card.querySelector('.v-content-card-title')?.innerText || 'Unnamed';
//     const url = card.querySelector('a')?.href || '';
//     if (url) {
//       list.push({ name, url });
//     }
//   });
//   return list;
// });

//   console.log(`✅ Found ${componentList.length} components.`);

//   const components = [];

//   // Step 2: Visit each component page and extract details
// //   for (const component of componentList) {
// //     console.log(`🔍 Scraping ${component.name} (${component.url})...`);

// //     try {
// //       await page.goto(component.url, { waitUntil: 'networkidle2' });

// //       // Wait for a code block or similar element to load
// //       await page.waitForSelector('pre code', { timeout: 10000 });

// //       const data = await page.evaluate(() => {
// //         const code = document.querySelector('pre code')?.innerText || '';
// //         const description = document.querySelector('p')?.innerText || '';
// //         return { code, description };
// //       });

// //       components.push({
// //         name: component.name,
// //         url: component.url,
// //         description: data.description,
// //         codeExample: data.code
// //       });
// //     } catch (err) {
// //       console.warn(`⚠️ Skipped ${component.name} due to error:`, err.message);
// //     }
// //   }

//   // Step 3: Save to JSON
//   fs.writeFileSync('./components.json', JSON.stringify(components, null, 2));
//   console.log(`✅ Finished scraping ${components.length} components. Saved to components.json`);

//   await browser.close();
// }

// scrapeVisaComponents();