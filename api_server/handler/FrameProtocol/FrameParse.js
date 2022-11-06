module.exports = (FRAME=new Uint8Array([])) => {
    let index = 2;

    // forward
    const COMMAND = FRAME[index++];
    const DATA_LEN_BYTE_1 = FRAME[index++] << 8;
    const DATA_LEN_BYTE_2 = FRAME[index++];
    const DATA_LEN = DATA_LEN_BYTE_1 | DATA_LEN_BYTE_2;
    console.log("DATA_LEN ", DATA_LEN.toString(16));
    const DATA = new Uint8Array(DATA_LEN);
    for (let i = 0; i < DATA_LEN; i++) {
        DATA[i] = FRAME[index + i];
    }

    // backward
    const FRAME_LEN = FRAME.length;
    let CRC = 0x0000;
    // MSB bits
    CRC |= (FRAME[FRAME_LEN - 2] << 8);
    // LSB Bits
    CRC |= FRAME[FRAME_LEN - 1];

    const TRAILER2 = FRAME[FRAME_LEN - 3];
    const TRAILER1 = FRAME[FRAME_LEN - 4];

    return {COMMAND, DATA, TRAILER1, TRAILER2, CRC};

}