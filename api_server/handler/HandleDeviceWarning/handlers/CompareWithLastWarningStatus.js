const { DevicelatestWarningStatus } = require("../../../models");

module.exports = async (LATEST_WARNING_STATUSES = {}, devID=-1) => {
    const LATEST_WARNING_STATUS_KEYS = Object.keys(LATEST_WARNING_STATUSES);
    
    const CURRENT_WARNING_STATUSES = await DevicelatestWarningStatus.findOne({devID}).lean().exec() || {};
    const RETURN_WARNING_STATUSES = {};

    if(Object.keys(CURRENT_WARNING_STATUSES).length)
        for await (let WARNING_STATUS of LATEST_WARNING_STATUS_KEYS)
            if (LATEST_WARNING_STATUSES[WARNING_STATUS] !== CURRENT_WARNING_STATUSES[WARNING_STATUS])
                RETURN_WARNING_STATUSES[WARNING_STATUS] = LATEST_WARNING_STATUSES[WARNING_STATUS];
    // else
    //     RETURN_WARNING_STATUSES = {...LATEST_WARNING_STATUSES, wifi_status: 'ACTIVE'}
    
    // fix errors
    // if (Object.keys(RETURN_WARNING_STATUSES).length)
    return RETURN_WARNING_STATUSES;
    // else
    //     return {...LATEST_WARNING_STATUSES, wifi_status: 'ACTIVE'};
}