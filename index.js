const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('') //replace the link from which you wanna extract the text and img
    await page.screenshot({ path: '/ScreenShots/' })

    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('') // selector which you wanna scrape the text
        ).map(x => x.textContent)
    })

    await fs.writeFile('/Headline/', headline.join("\r\n"))

    await browser.close();

}

start()