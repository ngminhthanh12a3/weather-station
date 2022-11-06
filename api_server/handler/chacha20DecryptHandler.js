// const JSChaCha20 = require("js-chacha20");
const JSChaCha20 = require("../js-chacha20");

const key = new Uint8Array([
  0x54, 0x50, 0x4e, 0x56, 0x61, 0x68, 0x50, 0x20, 0x33, 0x20, 0x65, 0x73, 0x63,
  0x65, 0x53, 0x20, 0x20, 0x74, 0x65, 0x72, 0x20, 0x79, 0x65, 0x6b, 0x54, 0x20,
  0x79, 0x62, 0x68, 0x6e, 0x61, 0x68,
]); // 32 bytes key
const nonce = new Uint8Array([0x4f, 0x2b, 0x6d, 0xc2, 0x40, 0xcc, 0xf1, 0x8a]); // 8 bytes nonce
const blockNumber = new Uint8Array([
  0xed, 0x48, 0x7e, 0x24, 0x1e, 0xe9, 0x37, 0x5,
]); // 8 bytes blockNumber

const JSChaCha20Constructor = new JSChaCha20(key, nonce, blockNumber);

// module export: decrypt chaCha20 function.
module.exports = (payload, json, message_res=false) => {
  // console.log("Payload: ", payload);
  // console.log("Buffer length: ", payload.length);
  // process.stdout.write("Buffer: [");
  // for (let index = 0; index < payload.length; index++) {
  //   // process.stdout.write(item + " ");
  //   process.stdout.write(payload[index].toString(16) + " ");
  // }
  // console.log("]");

  // reset byte counter
  JSChaCha20Constructor._byteCounter = 0;

  const START_DECRYPT_TIME = performance.now();
  const message = JSChaCha20Constructor.decrypt(payload);
  const DECRYPT_TIME = performance.now() - START_DECRYPT_TIME;
  // console.log("\n     - Decrypt time: ", DECRYPT_TIME, " ms");
  if(message_res)
    return message;

  var string = new TextDecoder().decode(message);
  try {
    if (json) return JSON.parse(string);
    
  } catch (error) {
    // console.log(string)
    return {}
  }
  // return chaCha20 decrypt message string.
  // console.log('Return JSON String');
  return string;
};
