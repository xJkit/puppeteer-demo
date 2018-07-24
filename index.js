// puppeteer example
const dotenv = require('dotenv');

const train = require('./train');
console.log('開始執行台鐵訂票系統 scrapping...');

dotenv.config();
console.log('設定環境變數...');

train.run();
