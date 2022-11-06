
module.exports = async (Warnings={}, devID, MESSAGE_TAG='WARNING') => {
    // require in function
    const { SendBackgroundNotification } = require("../../../bin/FirebaseSendNotificationSetup");

    const WARNING_KEYS = Object.keys(Warnings);
    let WARNING_STRING = "";
    for await(let WARNING_KEY of WARNING_KEYS)
        WARNING_STRING += WARNING_KEY + ': ' + Warnings[WARNING_KEY] + "\n";
    
    if (WARNING_STRING.length)
    {
        const title = `[${MESSAGE_TAG}] Device ${devID}`;
        const MESSAGE_DATA = {
            title,
            body: WARNING_STRING,
            tag: title
        };

        await SendBackgroundNotification(MESSAGE_DATA);
    }
}