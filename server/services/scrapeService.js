import { chromium } from 'playwright';
import stationaryScraperConfig from '../scraperConfig/stationaryScraperConfig.json' assert { type: 'json' };
import furnitureScraperConfig from '../scraperConfig/furnitureScraperConfig.json' assert { type: 'json' };
import vehicleScraperConfig from '../scraperConfig/vehicleScraperConfig.json' assert { type: 'json' };
import networkDevicesScraperConfig from '../scraperConfig/networkDevicesScraperConfig.json' assert { type: 'json' };

const scrapeCategory = async (query, config, category) => {
  const websites = Object.keys(config);
  const results = [];
  const browser = await chromium.launch({ headless: false });

  console.log(`Starting scrape for category: "${category}" and query: "${query}"`);

  for (const website of websites) {
    const websiteConfig = config[website];
    const url = websiteConfig.url.replace(/{query}/g, encodeURIComponent(query));
    console.log(`Scraping ${website} at ${url}`);

    try {
      const context = await browser.newContext({
        extraHTTPHeaders: websiteConfig.headers || {}, 
      });
      const page = await context.newPage();
      await context.grantPermissions(['geolocation'], { origin: url });
      console.log('Geolocation permission granted.');

      await page.goto(url, { waitUntil: 'load', timeout: 120000 });
      if (websiteConfig.selectors.dismissPopup) {
        try {
          await page.waitForSelector(websiteConfig.selectors.dismissPopup, { timeout: 5000 });
          await page.click(websiteConfig.selectors.dismissPopup);
          console.log('Location permission popup closed.');
        } catch (err) {
          console.log('No location popup detected or could not close it.');
        }
      }
      await page.waitForSelector(websiteConfig.selectors.product, { state: 'visible', timeout: 30000 });
      const product = await page.evaluate((websiteConfig) => {
        const productElement = document.querySelector(websiteConfig.selectors.product);
        if (productElement) {
          const title = productElement.querySelector(websiteConfig.selectors.title)?.textContent.trim();
          const priceElement = productElement.querySelector(websiteConfig.selectors.price);
          const price = priceElement?.childNodes[0]?.textContent.trim();
          const link = productElement.querySelector(websiteConfig.selectors.link)?.href;

          if (title && price && link) {
            return {
              title,
              price,
              link: link.startsWith('http') ? link : `https://${websiteConfig.website}.com${link}`,
            };
          }
        }
        return null;
      }, websiteConfig);

      if (product) {
        results.push({ website, products: [product] });
        console.log(`Scraped 1 product from ${website}.`);
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

export const scrapeStationary = (query) => scrapeCategory(query, stationaryScraperConfig, 'Stationary');
export const scrapeFurniture = (query) => scrapeCategory(query, furnitureScraperConfig, 'Furniture');
export const scrapeVehicle = (query) => scrapeCategory(query, vehicleScraperConfig, 'Vehicle');
export const scrapeNetworkDevices = (query) => scrapeCategory(query, networkDevicesScraperConfig, 'Network Devices');
