const CheckFrame = require("./CheckFrame");
const { FRAME_CONSTRUCTORS } = require("./constants");



module.exports = (payload) => {
    // console.log(payload)
    const HEADER1 = payload[0], HEADER2 = payload[1];
    for (const CONSTRUCTOR of FRAME_CONSTRUCTORS) {
        // detected the constructor
        if(HEADER1 === CONSTRUCTOR.HEADER1 && HEADER2 === CONSTRUCTOR.HEADER2)
        {
            // Check frame
            return CheckFrame(CONSTRUCTOR, payload)
            // break;
            // console.log(payload)
        }
    }
    

    return {}

}