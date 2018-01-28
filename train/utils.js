const getSelectOptionValues = async selectElmt => {
  const options = await selectElmt.$$('option');
  const values = options.map(async option => {
    const value = await option.getProperty('value');
    const jsonValue = await value.jsonValue();
    return jsonValue;
  });
  return await Promise.all(values);
};

module.exports = {
  getSelectOptionValues
};
