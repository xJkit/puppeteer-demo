const genCaptchaImg = async page => {
  const img = await page.$('#idRandomPic');
  await img.screenshot({ path: 'captcha.jpg'});
};

const getAllElmts = async page => {
  const captchaInput = await page.$('#randInput');
  const submitBtn = await page.$('#sbutton');

  return {
    captchaInput,
    submitBtn
  }
}

module.exports = {
  genCaptchaImg,
  getAllElmts
};
