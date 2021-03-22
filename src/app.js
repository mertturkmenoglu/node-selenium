const fs = require('fs');

const { Builder, By, Key } = require('selenium-webdriver');
const { v4: uuidv4 } = require('uuid');

const ENCODING = 'base64';
const FILE_EXTENSION = '.png';


const getGoogle = async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.google.com/')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    const screenshot = await driver.takeScreenshot();
    const filename = uuidv4() + FILE_EXTENSION;

    fs.writeFile(filename, screenshot, ENCODING, err => {
      console.log(err);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

getGoogle()