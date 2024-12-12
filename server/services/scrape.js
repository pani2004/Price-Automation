import { chromium } from 'playwright';
import { readFile } from 'fs/promises';
const networkDevicesConfig = JSON.parse(await readFile(new URL('../utils/networkDevicesScraperConfig.json', import.meta.url)));
const furnitureConfig = JSON.parse(await readFile(new URL('../utils/furnitureScraperConfig.json', import.meta.url)));
const stationaryConfig = JSON.parse(await readFile(new URL('../utils/stationaryScraperConfig.json', import.meta.url)));
const scraperConfig = {
    network: networkDevicesConfig,
    furniture: furnitureConfig,
    stationary: stationaryConfig
};

export const scrape = async (query, category) => {
    const availableCategories = Object.keys(scraperConfig).map((key) => key.toLowerCase());
    const normalizedCategory = category.toLowerCase();
    const results = [];
    if (!availableCategories.includes(normalizedCategory)) {
        throw new Error(`Invalid category: ${category}. Available categories are: ${availableCategories.join(', ')}`);
    }
    const configKey = Object.keys(scraperConfig).find(
        (key) => key.toLowerCase() === normalizedCategory
    );
    const config = scraperConfig[configKey];
    const websites = Object.keys(config);
    const browser = await chromium.launch({ headless: false });

    console.log(`Starting scrape for query: "${query}" in category: "${category}"`);

    for (const website of websites) {
        const websiteConfig = config[website];
        const url = websiteConfig.url.replace(/{query}/g, encodeURIComponent(query));
        console.log(`\nScraping ${website} at ${url}`);

        try {
            const context = await browser.newContext({
                extraHTTPHeaders: websiteConfig.headers || {},
            });
            const page = await context.newPage();

            console.log(`Navigating to URL: ${url}`);
            await page.goto(url, { waitUntil: 'load', timeout: 120000 });
            console.log('Page loaded successfully.');
            console.log(`Waiting for product container with selector: ${websiteConfig.selectors.product}`);
            await page.waitForSelector(websiteConfig.selectors.product, { state: 'visible', timeout: 60000 });
            console.log('Starting to scrape product details...');
            const products = await page.evaluate((websiteConfig) => {
                return Array.from(document.querySelectorAll(websiteConfig.selectors.product))
                    .slice(0, 5) 
                    .map((productElement) => ({
                        title: productElement.querySelector(websiteConfig.selectors.title)?.textContent.trim(),
                        price: productElement.querySelector(websiteConfig.selectors.price)?.textContent.trim(),
                        link: productElement.querySelector(websiteConfig.selectors.link)?.href,
                    }))
                    .filter((product) => product.title && product.price && product.link);
            }, websiteConfig);

            console.log(`Scraped ${products.length} products from ${website}.`);
            results.push({ website, products });

            await context.close();
        } catch (error) {
            console.error(`Failed to scrape ${website}: ${error.message}`);
        }
    }
    await browser.close();
    console.log('Scraping complete.');
    return results;
};