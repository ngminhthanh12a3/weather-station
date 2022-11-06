const { DevicelatestWarningStatus, DeviceAllWarningStatus } = require("../../../models");
const CompareWithLastWarningStatus = require("./CompareWithLastWarningStatus");
const GetWarningFromDeformatJSON = require("./GetWarningFromDeformatJSON");
const SendWarningNotifications = require("./SendTypeNotifications");

module.exports = async (DecryptJSON, DeformatJSON, devID) => {
    // predefine
    const { storeToDB, AddHistoryLogToDB } = require("../../db");

    //
    const WARNING_JSON = GetWarningFromDeformatJSON(DeformatJSON) || {};
    const WARNING_JSON_LENGTH = Object.keys(WARNING_JSON).length;
    // case: the warning exist
    if(WARNING_JSON_LENGTH)
    {
        // console.log('devID: ', devID);
        // console.log('WARNING_JSON: ', WARNING_JSON);
        const UPDATE_WARNINGS = await CompareWithLastWarningStatus(WARNING_JSON, devID);
        // console.log('UPDATE_WARNINGS: ', UPDATE_WARNINGS);
        // if(Object.keys(UPDATE_WARNINGS).length)
        SendWarningNotifications(UPDATE_WARNINGS, devID, 'WARNING');

        storeToDB(DevicelatestWarningStatus, {...DecryptJSON, ...WARNING_JSON}, {devID});
    }
    // clear warning
    else
    {
        // storeToDB(DeviceLatestNormalStatus, {...DecryptJSON, ...WARNING_JSON}, {devID});

        // clear the latest warning status
        const DELETED_WARNING_STATUS = await DevicelatestWarningStatus.findOneAndRemove({devID}).lean().exec();
        // store to
        if (DELETED_WARNING_STATUS)
        {
            console.log(DELETED_WARNING_STATUS);
            // storeToDB(DeviceAllWarningStatus, {...DELETED_WARNING_STATUS}, {});
            AddHistoryLogToDB(DeviceAllWarningStatus, {...DELETED_WARNING_STATUS})
        }
    }
}