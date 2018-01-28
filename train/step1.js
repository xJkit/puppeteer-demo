const getAllElmts = async page => {
  console.log('step1: 獲取所需節點...');
  const idInput = await page.$('#person_id');
  const getInDateSelect = await page.$('#getin_date');
  const fromStationSelect = await page.$('#from_station');
  const toStationSelect = await page.$('#to_station');
  const trainNumberInput = await page.$('#train_no');
  const orderNumberSelect = await page.$('#order_qty_str');
  const submitBtn = await page.$('.btn.btn-primary');

  return {
    idInput,
    getInDateSelect,
    fromStationSelect,
    toStationSelect,
    trainNumberInput,
    orderNumberSelect,
    submitBtn
  };
}

module.exports = {
  getAllElmts
};
