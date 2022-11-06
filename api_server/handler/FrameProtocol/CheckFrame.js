const CheckCRC = require("./CheckCRC");
const FrameParse = require("./FrameParse");

module.exports = (CONSTRUCTOR, FRAME) => {
    try {
        const {COMMAND, DATA, TRAILER1, TRAILER2, CRC} = FrameParse(FRAME);

        // error frame detect
        if (TRAILER1 !== CONSTRUCTOR.TRAILER1 && TRAILER2 !== CONSTRUCTOR.TRAILER2)
            throw new Error("Trailer Detect Fail!");
        if(!CheckCRC(DATA, CRC))
            throw new Error("CRC Detect Fail!");
        // console.log("Check Frame Success", {COMMAND, DATA, TRAILER1, TRAILER2, CRC})

        return CONSTRUCTOR.GetParseJSON(DATA)
        
    } catch (error) {
        console.log(error);
        return {}
    }
}