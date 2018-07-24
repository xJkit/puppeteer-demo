const getSelectOptionValues = async selectElmt => {
  const options = await selectElmt.$$('option');
  const values = options.map(async option => {
    const value = await option.getProperty('value');
    const jsonValue = await value.jsonValue();
    return jsonValue;
  });
  return await Promise.all(values);
};

const getAvailabelDates = (originalList = []) => {
  return originalList.map(date => date.slice(0, 10));
}
/**
取得上車可選擇日期
[ '2018/07/25-00',
  '2018/07/26-01',
  '2018/07/27-02',
  '2018/07/28-03',
  '2018/07/29-04',
  '2018/07/30-05',
  '2018/07/31-06',
  '2018/08/01-07',
  '2018/08/02-08',
  '2018/08/03-09',
  '2018/08/04-10',
  '2018/08/05-11',
  '2018/08/06-12',
  '2018/08/07-13',
  '2018/08/08-14' ]
 */

module.exports = {
  getSelectOptionValues,
  getAvailabelDates
};
