const Compute_CRC16 = require('./Compute_CRC16');

module.exports = (DATA, CRC_CHECK = 0) => {
  const CRC = Compute_CRC16(DATA);
  if (CRC !== CRC_CHECK) {
    // console.log("[CRC, CRC_CHECK] = ", [CRC, CRC_CHECK])
  }
  return CRC === CRC_CHECK;
};
