'use strict';
const dhalang = require('./dhalang')

const createPdf = async () => {
    const configuration = dhalang.getConfiguration();

    let browser;
    try {
        browser = await dhalang.launchPuppeteer(configuration);
        const page = await browser.newPage();
        await dhalang.configurePage(page, configuration.userOptions);
        await page.goto(configuration.webPageUrl, dhalang.getNavigationParameters(configuration));
        await page.waitForTimeout(250);
        const screenshotOptions = configuration.imageType === "png" ? configuration.pngOptions : configuration.jpegOptions
        await page.screenshot({
            ...{
                path: configuration.tempFilePath,
                type: configuration.imageType,
            },
            ...screenshotOptions
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    } finally {
        if (browser) {
            browser.close();
        }
        process.exit();
    }
};
createPdf();