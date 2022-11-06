const { emitToClient } = require("../../bin/emitToClient");
const { handleDeviceJSONStatus } = require("../decryptValue");
const { getBitFromFormatData } = require("../formatData");

module.exports = (decryptJSON) => {
  const { chacha20DecryptValue } = require("../../constants");
  const { devID, ...propsJSON } = decryptJSON;

  // initialize
  if (!chacha20DecryptValue[devID]) chacha20DecryptValue[devID] = {};

  //  
  chacha20DecryptValue[devID] = { ...propsJSON };

  // fix error for DEACTIVE device
  if(getBitFromFormatData(decryptJSON["status"], 0x1, 1))
    handleDeviceJSONStatus(chacha20DecryptValue, devID);
};
