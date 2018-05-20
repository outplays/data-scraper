const puppeteer = require('puppeteer');

const urlString = 'www.google.com';

async function scrape(url){
    const browser = await puppeteer.launch({dumpio: true, args: ['--no-sandbox']});
    
    const page = await browser.newPage();
    await page.goto(url);
    console.log('going to ', url);
    var pageContent = await page.content();
    console.log(pageContent);
    await browser.close();

    return { url, pageContent};
}

module.exports = scrape;