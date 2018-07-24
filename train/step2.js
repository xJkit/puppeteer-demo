const genCaptchaImg = async page => {
  const img = await page.$('#idRandomPic');
  return img.screenshot();
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
