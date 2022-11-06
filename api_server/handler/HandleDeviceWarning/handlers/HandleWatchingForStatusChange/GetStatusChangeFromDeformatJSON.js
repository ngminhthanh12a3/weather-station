const { DeviceLatestNormalStatus } = require("../../../../models");

module.exports = async ({wifi_status, dynamo_status, status1, status2}, devID) => {
    const CURRENT_STATE = await DeviceLatestNormalStatus.findOne({devID}).lean().exec() || {};

    const STATUS_CHANGE_JSON = {};
    //
    if(wifi_status !== CURRENT_STATE.wifi_status)
        STATUS_CHANGE_JSON['wifi_status'] = wifi_status;
    if(dynamo_status !== CURRENT_STATE.dynamo_status)
        STATUS_CHANGE_JSON['dynamo_status'] = dynamo_status;
    if(status1 !== CURRENT_STATE.status1)
        STATUS_CHANGE_JSON['status1'] = status1;
    if(status2 !== CURRENT_STATE.status2)
        STATUS_CHANGE_JSON['status2'] = status2;
    
    return STATUS_CHANGE_JSON;
}