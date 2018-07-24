const getStationCode = name => {
  return {
    '汐止': '096',
    '南港': '097',
    '松山': '098',
    '台北': '100',
    '台南': '175',
    '台東': '004',
  }[name];
};

module.exports = {
  getStationCode
};
