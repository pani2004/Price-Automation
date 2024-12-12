import { chromium } from 'playwright';

const googleShoppingConfig = {
    url: "https://www.google.com/search?q={query}&hl=en&tbm=shop&psb=1&uact=5&sclient=products-cc",
    selectors: {
        product: ".sh-dgr__content",
        title: ".tAxDx",
        price: ".a8Pemb.OFFNJ",
        link: ".Rsc7Yb",
    },
    website: "google_shopping",
};

/**
 * Scrape products based on query.
 * @param {string} query - Search term.
 * @returns {Array} - List of scraped products.
 */
export const scrape1 = async (query) => {
    const results = [];
    const browser = await chromium.launch({ headless: true });

    try {
        const url = googleShoppingConfig.url.replace(/{query}/g, encodeURIComponent(query));
        console.log(`Scraping Google Shopping at ${url}`);

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

        console.log('Scrolling to load more products...');
        for (let i = 0; i < 10; i++) { // Scroll multiple times
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await page.waitForTimeout(1000); // Wait for new content to load
        }

        console.log(`Waiting for product container with selector: ${googleShoppingConfig.selectors.product}`);
        await page.waitForSelector(googleShoppingConfig.selectors.product, { state: 'visible', timeout: 60000 });

        // Debug: Count the number of product elements
        const productCount = await page.evaluate((config) =>
            document.querySelectorAll(config.selectors.product).length, googleShoppingConfig);
        console.log(`Found ${productCount} product elements.`);

        if (productCount === 0) {
            console.error('No products found. Check selectors or content loading.');
            return results;
        }

        console.log('Starting to scrape product details...');
        const products = await page.evaluate((config) => {
            return Array.from(document.querySelectorAll(config.selectors.product)).map((productElement) => ({
                title: productElement.querySelector(config.selectors.title)?.textContent.trim() || 'N/A',
                price: productElement.querySelector(config.selectors.price)?.textContent.trim() || 'N/A',
                link: productElement.querySelector(config.selectors.link)?.href || 'N/A',
            }));
        }, googleShoppingConfig);

        console.log(`Scraped ${products.length} products.`);
        results.push({ website: googleShoppingConfig.website, products });
    } catch (error) {
        console.error(`Failed to scrape Google Shopping: ${error.message}`);
    } finally {
        await browser.close();
    }

    console.log('Scraping complete.');
    return results;
};



