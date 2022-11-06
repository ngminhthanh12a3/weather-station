// exports.storeToDB = require("./storeToDB");
// exports.loadDeviceInfoFromDB = require("./loadDeviceInfoFromDB");
// exports.loadOTAFieldsFromDB = require("./loadOTAFieldsFromDB");
// exports.loadDeviceInfoAnalysis = require("./loadDeviceInfoAnalysis");
module.exports = {
    storeToDB : require("./storeToDB"),
    loadDeviceInfoFromDB : require("./loadDeviceInfoFromDB"),
    loadOTAFieldsFromDB : require("./loadOTAFieldsFromDB"),
    loadDeviceInfoAnalysis : require("./loadDeviceInfoAnalysis"),
    AddHistoryLogToDB: require("./AddHistoryLogToDB")
}
