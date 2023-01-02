const eventemitter = require("events").EventEmitter;
const chacha20DecryptHandler = require("../chacha20DecryptHandler");
const { emitToClient } = require("../../bin/emitToClient");
const { DeviceInfo } = require("../../models");
const { publishToBroker } = require("../broker");
const { storeToDB } = require("../db");
const {
  clearBitFromFormatData,
  getBitFromFormatData,
} = require("../formatData");

const timeOutWifiStatus = 20000;

module.exports = (chacha20DecryptValue, devID) => {
  // cleartimeout
  const { deviceStatusTimeoutID } = require("../../constants");

  // fix error: undefined
  if (deviceStatusTimeoutID[devID])
    clearTimeout(deviceStatusTimeoutID[devID].wifi_statusTimeoutID);
  // initialize if undefined
  else deviceStatusTimeoutID[devID] = {};

  //timeOutToSetDeActive.
  deviceStatusTimeoutID[devID].wifi_statusTimeoutID = setTimeout(async () => {
    // fix error
    if (chacha20DecryptValue[devID]) {

      const UPDATE_JSON = { devID, ...chacha20DecryptValue[devID] };

      // clearBitFromFormatData(UPDATE_JSON, 0x1, 1, "status");
      UPDATE_JSON["wifi_status"] = "DEACTIVE";

      // const ENCRYPT_BUFFER = Uint8Array.from(JSON.stringify(UPDATE_JSON))
      const UPDATE_JSON_STRING = JSON.stringify(UPDATE_JSON);
      const UPDATE_JSON_BUFFER = new Uint8Array(UPDATE_JSON_STRING.length);
      
      let i = 0;
      for await (let CHAR of UPDATE_JSON_STRING)
        UPDATE_JSON_BUFFER[i++] = CHAR.charCodeAt(0);
      
      console.log("UPDATE_JSON_BUFFER: ", UPDATE_JSON_BUFFER);
      const ENCRYPT_JSON = await chacha20DecryptHandler(UPDATE_JSON_BUFFER, false, true);
      
      publishToBroker('esp/publish', ENCRYPT_JSON);
      // const e = new eventemitter();
      // e.emit()
      // chacha20DecryptValue[devID].wifi_status = "DEACTIVE";
      // clearBitFromFormatData(chacha20DecryptValue[devID], 0x1, 1, "status");

      // const emitJSON = {};
      // emitJSON[devID] = chacha20DecryptValue[devID];
      // storeToDB(
      //   DeviceInfo,
      //   { devID, ...chacha20DecryptValue[devID] },
      //   { devID }
      // );

      // emitToClient(emitJSON, "encryptDT");

      // const wifiStatus = getBitFromFormatData(
      //   chacha20DecryptValue[devID],
      //   0x1,
      //   1,
      //   "status"
      // )
      //   ? "ACTIVE"
      //   : "DEACTIVE";

      // emitToClient(
      //   {
      //     type: "info",
      //     message: "Device Wifi Status",
      //     description: `Device ${devID}. Wifi Status: ${wifiStatus}`,
      //   },
      //   "notification"
      // );
      
    }
  }, timeOutWifiStatus);
};
