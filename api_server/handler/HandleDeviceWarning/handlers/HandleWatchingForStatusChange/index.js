const { DeviceAllStatusChange, DeviceLatestNormalStatus } = require("../../../../models");
const SendTypeNotifications = require("../SendTypeNotifications");
const GetStatusChangeFromDeformatJSON = require("./GetStatusChangeFromDeformatJSON");

module.exports = async (DecryptJSON, DeformatJSON, devID) => {
    const {storeToDB, AddHistoryLogToDB} = require("../../../db");

    //
    const STATUS_CHANGE = await GetStatusChangeFromDeformatJSON(DeformatJSON, devID);
    // console.log('STATUS_CHANGE: ', STATUS_CHANGE)
    const STATUS_CHANGE_LENGTH = Object.keys(STATUS_CHANGE).length;
    if(STATUS_CHANGE_LENGTH)
    {
        SendTypeNotifications(STATUS_CHANGE, devID, 'STATE CHANGE');

        //
        storeToDB(DeviceLatestNormalStatus, {...STATUS_CHANGE}, {devID});
        // storeToDB(DeviceAllStatusChange, {devID, updateTime: Date.now(), ...STATUS_CHANGE}, {});
        AddHistoryLogToDB(DeviceAllStatusChange, {devID, updateTime: Date.now(), ...STATUS_CHANGE})
    }
}