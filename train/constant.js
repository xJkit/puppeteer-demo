const getStationCode = name => {
  return {
    '南港': '097',
    '台南': '175',
  }[name];
};

module.exports = {
  getStationCode
};
