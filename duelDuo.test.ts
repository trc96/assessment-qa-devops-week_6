
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

describe('tests for duel duo', () => {

    test('Title shows up when page loads', async () => {
        const title = await driver.findElement(By.id('title'))
        const displayed = await title.isDisplayed()
        expect(displayed).toBe(true)
    })
    
    test('Draw button displays the div with id = "choices"', async () => {
        await driver.findElement(By.id('draw')).click()
        await driver.sleep(2000)

        const div = await driver.findElement(By.id('choices'))
        const displayed = await div.isDisplayed()

        expect(displayed).toBe(true)
        await driver.sleep(2000)
    })

    test('"Add to Duo" button displays the div with id = "player-duo"', async () => {
        await driver.findElement(By.id('draw')).click()
        await driver.sleep(2000)

        await driver.findElement(By.xpath('(//button[text()= "Add to Duo"])[1]')).click()
        const playerDuoDiv = await driver.findElement(By.id('player-duo'))
        const displayed = await playerDuoDiv.isDisplayed()
        expect(displayed).toBe(true)
    })
})

