const fs = require("fs");
// const { FILE_FRAME } = require("../../constants");

module.exports = async (req, res, next) => {
  const { frame, FILE_PATH, FILE_FRAME } = req.query;
  const BYTE_START = frame * FILE_FRAME;
  const BYTE_END = BYTE_START + FILE_FRAME;
  const FILE_BUFFER = await fs.readFileSync(FILE_PATH, { encoding: "binary" });
  console.log("Buffer length: ", FILE_BUFFER.length);
  // for (const byte of FILE_BUFFER) {
  //   process.stdout.write("0x" + byte.toString(16) + "\t");
  // }
  //   const FRAME_BUFFER = Buffer.from(FILE_FUFFER, BYTE_OFFSET, FILE_FRAME);
  let FRAME_BUFFER = await await FILE_BUFFER.slice(BYTE_START, BYTE_END);
  // console.log("FRAM BUFFER: ", FRAME_BUFFER);
  // for (const byte of FRAME_BUFFER) {
  //   process.stdout.write("0x" + byte.toString(16) + "\t");
  // }
  // for (let  i = 0;i < FRAME_BUFFER.length;i++) {
  //   process.stdout.write("0x" + FRAME_BUFFER.charCodeAt(i).toString(16) + "\t");
  // }
  console.log("BYTE START", BYTE_START);
  console.log("BYTE END", BYTE_END);

  //
  // if (FRAME_BUFFER[FRAME_BUFFER.length - 1]) FRAME_BUFFER += 0;
  // if (BYTE_END <=  Math.floor(FILE_BUFFER.length / 1024) * 1024)
  FRAME_BUFFER += 0;
  // else FRAME_BUFFER +=1;

  console.log("FRAME BUFFER LENGTH", FRAME_BUFFER.length);
  // FRAME_BUFFER += 0;
  const FRAME_BUFFER_RES = await await Buffer.from(FRAME_BUFFER, "binary");

  // fix error
  FRAME_BUFFER_RES.length = FRAME_BUFFER.length;
  console.log("FRAME_BUFFER_RES.leng ", FRAME_BUFFER_RES.length);
  console.log(
    "Last FRAME_BUFFER_RES ",
    FRAME_BUFFER_RES[FRAME_BUFFER_RES.length - 1]
  );

  // for (let  i = 0;i < FRAME_BUFFER_RES.length;i++) {
  //   process.stdout.write("0x" + FRAME_BUFFER_RES.charCodeAt(i).toString(16) + "\t");
  // }
  res.send(FRAME_BUFFER_RES);
};
