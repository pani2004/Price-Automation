import { chromium } from 'playwright';
import scraperConfig from './scraperConfig.json' assert { type: 'json' };

export const scrape = async (query) => {
    const websites = Object.keys(scraperConfig);
    const results = [];
    const browser = await chromium.launch({ headless: false });

    console.log(`Starting scrape for query: "${query}"`);

    for (const website of websites) {
        const config = scraperConfig[website];
        const url = config.url.replace(/{query}/g, encodeURIComponent(query));
        console.log(`\nScraping ${website} at ${url}`);

        try {
            const context = await browser.newContext({
                extraHTTPHeaders: config.headers || {}, // Apply headers from config
            });
            const page = await context.newPage();

            // Grant geolocation permissions
            await context.grantPermissions(['geolocation'], { origin: url });
            console.log('Geolocation permission granted.');

            await page.goto(url, { waitUntil: 'load', timeout: 120000 });

            // Dismiss location popup if exists
            if (config.selectors.dismissPopup) {
                try {
                    await page.waitForSelector(config.selectors.dismissPopup, { timeout: 5000 });
                    await page.click(config.selectors.dismissPopup);
                    console.log('Location permission popup closed.');
                } catch (err) {
                    console.log('No location popup detected or could not close it.');
                }
            }

            // Wait for the product container to load
            await page.waitForSelector(config.selectors.product, { state: 'visible', timeout: 30000 });

            // Scrape the products
            const products = await page.evaluate((config) => {
                const productElements = Array.from(document.querySelectorAll(config.selectors.product));
                return productElements.map((productElement) => {
                    const title = productElement.querySelector(config.selectors.title)?.textContent.trim();
                    const priceElement = productElement.querySelector(config.selectors.price);
                    const price = priceElement?.childNodes[0]?.textContent.trim();
                    const link = productElement.querySelector(config.selectors.link)?.href;

                    if (title && price && link) {
                        return {
                            title,
                            price,
                            link: link.startsWith('http') ? link : `https://${config.website}.com${link}`,
                        };
                    }
                    return null;
                }).filter(Boolean);
            }, config);

            results.push({ website, products });
            console.log(`Scraped ${products.length} products from ${website}.`);

            await context.close();
        } catch (error) {
            console.error(`Failed to scrape ${website}: ${error.message}`);
        }
    }

    await browser.close();
    console.log('Scraping complete.');
    return results;
};

