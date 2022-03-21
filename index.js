const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.systemrequirementslab.com/game-lists/third-person-shooters/?id=1097') //replace the link from which you wanna extract the text and img
    await page.screenshot({ path: 'game.png' })

    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#main-table > tbody > tr > td:nth-child(2) > div > div:nth-child(2) > main > div > div:nth-child(1) > div > div:nth-child(1) > div > h1')
        ).map(x => x.textContent)
    })

    await fs.writeFile('headlinegame.txt', headline.join("\r\n"))

    await browser.close();

}

start()