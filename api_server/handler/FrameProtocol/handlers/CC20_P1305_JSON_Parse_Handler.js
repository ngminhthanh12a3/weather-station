
module.exports = (payload) => {
    // require error
    const {CC20_P1305_decrypt_handler} = require("../../../handler");
    const [decryptJSON = {}, authTag = false] = CC20_P1305_decrypt_handler(payload, "1");
    if(!authTag)
    {
        // console.error("CC20-P1305 Tag error!");
        // console.log("decr", decryptJSON)
    }

    // console.log(decryptJSON)
    return decryptJSON
}