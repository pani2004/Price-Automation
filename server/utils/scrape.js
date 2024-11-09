import { chromium } from 'playwright';  // Import Playwright's chromium browser module
import scraperConfig from './scraperConfig.json' assert { type: 'json' };  // Scraper config file

export const scrape = async (query) => {
    const websites = Object.keys(scraperConfig);
    const results = [];

    console.log(`Starting scrape for query: "${query}"`);

    for (const website of websites) {
        try {
            console.log(`Starting scrape for website: ${website}`);

            const config = scraperConfig[website];
            const url = config.url.replace('{query}', encodeURIComponent(query));

            console.log(`Navigating to URL: ${url}`);

            // Launching the browser and setting up page
            const browser = await chromium.launch({ headless: true });
            const page = await browser.newPage();

            await page.goto(url, { waitUntil: 'load', timeout: 120000 });

            // If scraping Flipkart, log and check product elements
            if (website === 'flipkart') {
                console.log("Page loaded. Checking available selectors...");

                // Logging all found product elements
                const productElements = await page.$$eval('.DOjaWF.gdgoEp', elements => elements.map(el => el.className));
                console.log('Found product elements:', productElements);
            }

            console.log(`Waiting for selector: ${config.selectors.product}`);
            await page.waitForSelector(config.selectors.product, { state: 'visible' });

            // Extracting product data using evaluate
            const products = await page.evaluate((config) => {
                const items = [];

                // Select all product elements matching the configured class
                const productElements = document.querySelectorAll(config.selectors.product);
                console.log(`Found ${productElements.length} product elements`);

                productElements.forEach((item) => {
                    const title = item.querySelector(config.selectors.title)?.textContent.trim();
                    const price = item.querySelector(config.selectors.price)?.textContent.trim();
                    const link = item.querySelector(config.selectors.link)?.href;

                    // Log the extracted data
                    console.log('Extracted data:');
                    console.log('Title:', title);
                    console.log('Price:', price);
                    console.log('Link:', link);

                    // Only push items if data is valid
                    if (title && price && link) {
                        items.push({
                            title,
                            price,
                            link: link.startsWith('http') ? link : `https://www.${config.website}.com${link}`,
                        });
                    } else {
                        console.log('Skipping product due to missing data');
                    }
                });

                return items;
            }, config);

            console.log(`Scraped ${products.length} products from ${website}`);

            if (products.length > 0) {
                results.push({ website, products });
            } else {
                console.log(`No products found for ${website}`);
            }

            await browser.close();
        } catch (error) {
            console.error(`Failed to scrape ${website}:`, error.message);
        }
    }

    console.log('Scraping complete. Returning results.');

    return results;
};
