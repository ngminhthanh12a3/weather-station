// exports.getBcryptPassword = require("./bcryptHandler").getBcryptPassword;
// exports.checkCorrectPassword = require("./bcryptHandler").checkCorrectPassword;
// exports.chacha20DecryptHandler = require("./chacha20DecryptHandler");

// exports.storeToTempDeviceJSON = require("./device").storeToTempDeviceJSON;
// exports.handleDecryptValue = require("./decryptValue").handleDecryptValue;
// exports.handleDeviceJSONStatus =
//   require("./decryptValue").handleDeviceJSONStatus;

// exports.storeToDB = require("./db").storeToDB;
// exports.loadDeviceInfoFromDB = require("./db").loadDeviceInfoFromDB;
// exports.loadOTAFieldsFromDB = require("./db").loadOTAFieldsFromDB;
// exports.loadDeviceInfoAnalysis = require("./db").loadDeviceInfoAnalysis;

// exports.sendRequestToBroker = require("./broker").sendRequestToBroker;
// exports.publishToBroker = require("./broker").publishToBroker;

// exports.handleDeviceInfoAnalysis = require("./handleDeviceInfoAnalysis");
// exports.CC20_P1305_decrypt_handler = require("./CC20_P1305_decrypt_handler")
// exports.HandleDeviceWarning = require("./HandleDeviceWarning");

module.exports = {
  ...require("./bcryptHandler"),
  chacha20DecryptHandler: require("./chacha20DecryptHandler"),

  ...require("./device"),
  ...require("./decryptValue"),

  ...require("./db"),

  ...require("./broker"),

  handleDeviceInfoAnalysis: require("./handleDeviceInfoAnalysis"),
  CC20_P1305_decrypt_handler: require("./CC20_P1305_decrypt_handler"),
  HandleDeviceWarning: require("./HandleDeviceWarning"),

  ...require("./FrameProtocol")

}