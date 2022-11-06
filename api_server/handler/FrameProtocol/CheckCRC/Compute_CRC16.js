const { CRC_TABLE_16 } = require("./constants");

module.exports = (BYTES=new Uint8Array([])) => {
    let CRC = 0;
    
    for (const b of BYTES) {
        const POS = (CRC >> 8) ^ b;
        // &0xFFFF to get 2 bytes number
        CRC = ((CRC << 8) ^ CRC_TABLE_16[POS]) & 0xFFFF
    }

    return CRC;
}