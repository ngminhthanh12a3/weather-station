const { CC20_P1305_JSON_Parse_Handler } = require("./handlers");

module.exports = {
    FRAME_CONSTRUCTORS: [
        // CC20-POLY1305
        {
            HEADER1: 0xCC,
            HEADER2: 0x20,
            TRAILER1: 0x13,
            TRAILER2: 0x05,
            GetParseJSON: CC20_P1305_JSON_Parse_Handler
        }
    ]
}