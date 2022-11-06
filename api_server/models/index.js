// exports.User = require("./User");
// exports.DeviceInfo = require("./DeviceInfo");
// exports.OTA_Field = require("./OTA_Field");
// exports.OTA_Filelist = require("./OTA_Filelist");
// exports.DeviceInfoAnalysis = require("./DeviceInfoAnalysis");
module.exports = {
    User :require("./User"),
    DeviceInfo :require("./DeviceInfo"),
    OTA_Field :require("./OTA_Field"),
    OTA_Filelist :require("./OTA_Filelist"),
    DeviceInfoAnalysis :require("./DeviceInfoAnalysis"),
    ClientFields: require("./ClientFields"),
    DeviceLatestNormalStatus: require("./DeviceLatestNormalStatus"),
    DevicelatestWarningStatus: require("./DevicelatestWarningStatus"),
    DeviceAllWarningStatus: require("./DeviceAllWarningStatus"),
    DeviceAllStatusChange: require("./DeviceAllStatusChange")
}

