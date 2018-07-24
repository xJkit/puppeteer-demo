const path = require('path');
const terminalImage = require('terminal-image');
const puppeteer = require('puppeteer');
const moment = require('moment');
const inquirer = require('inquirer');
const utils = require('./utils');

const { getStationCode } = require('./constant');

const { ORDER_TRAIN } = require('../target');

/** steps */
const step1 = require('./step1');
const step2 = require('./step2');

const run = async () => {
  /** Pre defined config */
  const ID = process.env.ID;
  const FROM_STATION = process.env.FROM_STATION;
  const TO_STATION = process.env.TO_STATION;
  const TRAIN_NO = process.env.TRAIN_NO;
  const TICKET_NUMBER = process.env.TICKET_NUMBER; // 張數
  const TRAVEL_DATE = process.env.TRAVEL_DATE;

  console.log('====================================');
  console.log(`身分證字號： ${ID}`);
  console.log(`起站 ${FROM_STATION}`);
  console.log(`迄站： ${TO_STATION}`);
  console.log(`列車代號： ${TRAIN_NO}`);
  console.log(`出發日期 ${TRAVEL_DATE}`);
  console.log(`張數： ${TICKET_NUMBER}`);
  console.log('====================================');
  /**** */


  const browser = await puppeteer.launch({ headless: true });
  browser.on('targetcreated', () => console.log('browser created a new page'));

  const page = await browser.newPage()

  console.log(`go to ${ORDER_TRAIN} ...`);
  await page.goto(ORDER_TRAIN);

  /** take actions below */
  /** 取得選項數值 */
  const { idInput, getInDateSelect, fromStationSelect, toStationSelect, orderNumberSelect, trainNumberInput, submitBtn } = await step1.getAllElmts(page);
  console.log('=======STEP 1=============================');
  console.log(`填入身分證字號：${ID}...`);
  await idInput.type(ID);

  console.log('取得上車可選擇日期');
  const getInDates = await utils.getSelectOptionValues(getInDateSelect);
  console.log(getInDates);

  console.log('取得出發站');
  const fromStations = await utils.getSelectOptionValues(fromStationSelect);
  console.log(fromStations.slice(0, 10));

  console.log('取得張數選項');
  const orderNumberOptions = await utils.getSelectOptionValues(orderNumberSelect);
  console.log(orderNumberOptions);


  /** 設定選項數值 */
  const dateIndex = getInDates.map(date => date.slice(0, 10)).indexOf(TRAVEL_DATE);
  if (dateIndex < 0) throw new Error('沒有可選的日期，請重新調整。');

  console.log(`選擇出發日期: ${getInDates[dateIndex]}`);
  await getInDateSelect.type(getInDates[dateIndex]);


  console.log(`選擇出發站: ${FROM_STATION}`);
  await fromStationSelect.type(getStationCode(FROM_STATION));

  console.log(`選擇目的站: ${TO_STATION}`);
  await toStationSelect.type(getStationCode(TO_STATION));

  console.log(`輸入車次代碼： ${TRAIN_NO}`);
  await trainNumberInput.type(TRAIN_NO);

  console.log(`選擇訂票張數： ${TICKET_NUMBER}`);
  await orderNumberSelect.type(TICKET_NUMBER);


  console.log('提交資料...');
  await submitBtn.click();

  console.log('等待頁面跳轉...');
  await page.waitForNavigation({ waitUntil: 'load' });




  console.log('=====STEP 2===============================');
  console.log('取得 captcha 圖片...');
  const captchaImgBuf = await step2.genCaptchaImg(page);
  console.log( // 印出 captcha 圖片
    await terminalImage.buffer(captchaImgBuf)
  );

  const { captchaInput, submitBtn: submitCaptchaBtn } = await step2.getAllElmts(page);
  const { captchaNum } = await inquirer.prompt([{
    type: 'input',
    name: 'captchaNum',
    message: '請輸入台鐵驗證碼'
  }]);
  await captchaInput.type(captchaNum);
  console.log('提交表單...');
  await submitCaptchaBtn.click();

  console.log('等待頁面跳轉...');
  await page.waitForNavigation({ waitUntil: 'load' });

  const resultImgBuf = await page.screenshot();
  console.log( // 印出結果
    await terminalImage.buffer(resultImgBuf)
  );

  await browser.close();
  console.log('browser closed');

};

module.exports = { run };