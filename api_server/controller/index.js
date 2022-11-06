// exports.indexCTRL = require("./indexCTRL");
// exports.signupCTRL = require("./signupCTRL");
// exports.signinCTRL = require("./signinCTRL");
// exports.signoutCTRL = require("./signoutCTRL");
// exports.checkSigninCTRL = require("./checkSigninCTRL");
// exports.otaCTRL = require("./otaCTRL");
// exports.analysisCTRL = require("./analysisCTRL");

// exports.fields_CTRL = require("./ota").fields_CTRL;
// exports.upload_ota_bin_CTRL = require("./ota").upload_ota_bin_CTRL;
// exports.otaSTM_CTRL = require("./ota").otaSTM_CTRL;

// exports.file_list_CTRL = require("./api").file_list_CTRL;
// exports.device_list_CTRL = require("./api").device_list_CTRL;
// exports.delete_ota_files_CTRL = require("./api").delete_ota_files_CTRL;
// exports.set_ota_status_CTRL = require("./api").set_ota_status_CTRL;
// exports.send_custom_broker_request_CTRL =
//   require("./api").send_custom_broker_request_CTRL;

// exports.device_info_list_CTRL = require("./api").device_info_list_CTRL;

// exports.bin_OTA_Dir_load_CTRL = require("./api").bin_OTA_Dir_load_CTRL;
module.exports = {
  indexCTRL: require("./indexCTRL"),
  signupCTRL: require("./signupCTRL"),
  signinCTRL: require("./signinCTRL"),
  signoutCTRL: require("./signoutCTRL"),
  checkSigninCTRL: require("./checkSigninCTRL"),
  otaCTRL: require("./otaCTRL"),
  analysisCTRL: require("./analysisCTRL"),

  ...require("./ota"),
  ...require("./api"),
};
