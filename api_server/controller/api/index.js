// module.exports.device_info_load_CTRL = require("./device_info_load_CTRL");
// module.exports.set_broker_request_CTRL = require("./set_broker_request_CTRL");
// module.exports.currentUser_CTRL = require("./currentUser_CTRL");
// module.exports.file_list_CTRL = require("./file_list_CTRL");
// module.exports.device_list_CTRL = require("./device_list_CTRL");
// module.exports.delete_ota_files_CTRL = require("./delete_ota_files_CTRL");
// module.exports.set_ota_status_CTRL = require("./set_ota_status_CTRL");
// module.exports.send_custom_broker_request_CTRL = require("./send_custom_broker_request_CTRL");
// module.exports.device_info_list_CTRL = require("./device_info_list_CTRL");

// module.exports.bin_OTA_Dir_load_CTRL = require("./bin_OTA_Dir");
module.exports = {
  device_info_load_CTRL: require("./device_info_load_CTRL"),
  set_broker_request_CTRL: require("./set_broker_request_CTRL"),
  currentUser_CTRL: require("./currentUser_CTRL"),
  file_list_CTRL: require("./file_list_CTRL"),
  device_list_CTRL: require("./device_list_CTRL"),
  delete_ota_files_CTRL: require("./delete_ota_files_CTRL"),
  set_ota_status_CTRL: require("./set_ota_status_CTRL"),
  send_custom_broker_request_CTRL: require("./send_custom_broker_request_CTRL"),
  device_info_list_CTRL: require("./device_info_list_CTRL"),
  bin_OTA_Dir_load_CTRL: require("./bin_OTA_Dir_load_CTRL"),
  bin_OTA_Dir_open_CTRL: require("./bin_OTA_Dir_open_CTRL"),
  bin_OTA_Dir_delete_CTRL: require("./bin_OTA_Dir_delete_CTRL"),
  ...require("./FMCToken_CTRL")
};
