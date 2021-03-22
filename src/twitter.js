const { Builder, By } = require('selenium-webdriver');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const PASSWORD_XPATH = '/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[2]/label/div/div[2]/div/input';
const LOGIN_BUTTON_XPATH = '/html/body/div/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div/span/span';
const TEXT_AREA_XPATH = '/html/body/div/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div[1]/div/div/div/div[2]/div/div/div/div/span';
const TWEET_BUTTON_XPATH = '/html/body/div/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[4]/div/div/div[2]/div[3]/div/span/span';
const getGoogle = async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://twitter.com/login/')
    await driver.sleep(5000);
    await driver.findElement(By.className('r-30o5oe')).sendKeys(process.env.TW_EMAIL);
    await driver.sleep(2000);
    await driver.findElement(By.xpath(PASSWORD_XPATH)).sendKeys(process.env.TW_PASSWORD);
    await driver.sleep(2000);
    await driver.findElement(By.xpath(LOGIN_BUTTON_XPATH)).then(btn => btn.click());
    await driver.sleep(2000);
    await driver.findElement(By.xpath(TEXT_AREA_XPATH)).sendKeys('Hello World ' + uuidv4());
    await driver.sleep(2000);
    await driver.findElement(By.xpath(TWEET_BUTTON_XPATH)).then(btn => btn.click());
    await driver.sleep(5000);
  } catch (error) {
    console.error('Error happened', error.message);
  } finally {
    await driver.quit();
  }
}

getGoogle()