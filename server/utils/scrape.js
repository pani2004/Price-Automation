import { chromium } from 'playwright'; 
import scraperConfig from './scraperConfig.json' assert { type: 'json' };

export const scrape = async (query) => {
    const websites = Object.keys(scraperConfig);
    const results = [];
    console.log(`Starting scrape for query: "${query}"`);
    for (const website of websites) {
        try {
            console.log(`\nStarting scrape for website: ${website}`);
            const config = scraperConfig[website];
            const url = config.url.replace('{query}', encodeURIComponent(query));
            console.log(`Navigating to URL: ${url}`);
            const browser = await chromium.launch({ headless: true });
            const page = await browser.newPage();
            // Navigate to the URL and wait for the page to load
            await page.goto(url, { waitUntil: 'load', timeout: 120000 });
            console.log(`Waiting for selector: ${config.selectors.product}`);
            await page.waitForSelector(config.selectors.product, { state: 'visible' });
            // Extract product data from the page using the provided selectors
            const products = await page.evaluate((config) => {
                const items = [];
                const productElements = document.querySelectorAll(config.selectors.product);
                console.log(`Found ${productElements.length} product elements on ${config.website}`);
                productElements.forEach((item, index) => {
                    // Extracting product data using configured selectors
                    const title = item.querySelector(config.selectors.title)?.textContent.trim();
                    const price = item.querySelector(config.selectors.price)?.textContent.trim();
                    const link = item.querySelector(config.selectors.link)?.href;
                    console.log(`Product ${index + 1}:`);
                    console.log(`Title: ${title}`);
                    console.log(`Price: ${price}`);
                    console.log(`Link: ${link}`);
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
    console.log('\nScraping complete. Returning results.');
    if (results.length === 0) {
        console.log('No products were scraped from any website');
    } else {
        console.log('Scraped Results:', JSON.stringify(results, null, 2));
    }
    return results;
};
