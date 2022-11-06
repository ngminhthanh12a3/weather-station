const { DeviceInfo } = require("../../models");

module.exports = async (req, res, next) => {
  
  const { current, pageSize } = req.query;
  const dataSource = (await DeviceInfo.find().lean().exec()) || [];
  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current,
  };
  return res.json({ ...result });
};
