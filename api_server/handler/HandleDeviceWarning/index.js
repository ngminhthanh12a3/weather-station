// const { DeviceLatestNormalStatus, DevicelatestWarningStatus, DeviceAllWarningStatus } = require("../../models");
const { GetDeformatJSON, HandleWatchingForWarning, HandleWatchingForStatusChange } = require("./handlers");

module.exports = async (DecryptJSON = {}) => {
    //predefine
    // const { storeToDB } = require("../../handler");

    const DeformatJSON = GetDeformatJSON(DecryptJSON) || {};

    const {devID = -1} = DecryptJSON;
    
    HandleWatchingForWarning(DecryptJSON, DeformatJSON, devID);
    HandleWatchingForStatusChange(DecryptJSON, DeformatJSON, devID);

}