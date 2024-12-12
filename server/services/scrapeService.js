import { chromium } from 'playwright';
import { promises as fs } from 'fs';

const hardwareScraperConfig = JSON.parse(await fs.readFile(new URL('../utils/hardwareScraperConfig.json', import.meta.url), 'utf8'));

const scrapeCategory = async (query, config, category, make, model) => {
  const websites = Object.keys(config);
  const results = [];
  const browser = await chromium.launch({ headless: false });

  console.log(`Starting scrape for category: "${category}", query: "${query}", make: "${make}", model: "${model}"`);

  for (const website of websites) {
    const websiteConfig = config[website];
    const searchQuery = encodeURIComponent(`${query} ${make} ${model}`);
    const url = websiteConfig.url.replace(/{query}/g, searchQuery);
    console.log(`Scraping ${website} at ${url}`);

    try {
      const context = await browser.newContext({
        extraHTTPHeaders: websiteConfig.headers || {}, 
      });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 120000 });

      await page.waitForSelector(websiteConfig.selectors.product, { state: 'visible', timeout: 30000 });
      const products = await page.evaluate(({ websiteConfig, make, model }) => {
        return Array.from(document.querySelectorAll(websiteConfig.selectors.product))
          .slice(0, 5) // Limit to 5 products
          .map((productElement) => {
            const title = productElement.querySelector(websiteConfig.selectors.title)?.textContent.trim();
            const priceElement = productElement.querySelector(websiteConfig.selectors.price);
            const price = priceElement?.childNodes[0]?.textContent.trim();
            const link = productElement.querySelector(websiteConfig.selectors.link)?.href;
            const rating = productElement.querySelector(websiteConfig.selectors.rating)?.textContent.trim(); // Add rating

            if (title && price && link) {
              return {
                title,
                price,
                link: link.startsWith('http') ? link : `https://${websiteConfig.website}.com${link}`,
                make,
                model,
                rating, // Include rating
              };
            }
            return null;
          })
          .filter(product => product !== null);
      }, { websiteConfig, make, model });

      if (products.length > 0) {
        results.push({ website, products });
        console.log(`Scraped ${products.length} products from ${website}.`);
      }

      await context.close();
    } catch (error) {
      console.error(`Failed to scrape ${website}: ${error.message}`);
    }
  }

  await browser.close();
  console.log(`${category} scraping complete.`);
  return results;
};

export const scrapeHardware = (query, make, model) =>
  scrapeCategory(query, hardwareScraperConfig, 'Hardware', make, model);

