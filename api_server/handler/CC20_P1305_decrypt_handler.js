'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const src_1 = __importDefault(require('../CC20-P1305/src'));
const key = new Uint8Array([
  0x54, 0x50, 0x4e, 0x56, 0x61, 0x68, 0x50, 0x20, 0x33, 0x20, 0x65, 0x73, 0x63,
  0x65, 0x53, 0x20, 0x20, 0x74, 0x65, 0x72, 0x20, 0x79, 0x65, 0x6b, 0x54, 0x20,
  0x79, 0x62, 0x68, 0x6e, 0x61, 0x68,
]); // 32 bytes key
const AAD = new Uint8Array([
  0x50, 0x51, 0x52, 0x53, 0xc0, 0xc1, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7,
]);
const IV = new Uint8Array([0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47]);
// const msg = new Uint8Array([
//     0x66, 0x7a, 0x74, 0x19, 0x79, 0x9a, 0xdf, 0xfa, 0x42, 0xae, 0xe4, 0x22, 0xb4,
//     0x68, 0x1c, 0x8d, 0xdd, 0x4c, 0x8e, 0x3f, 0xff, 0x54, 0xcd, 0x96, 0xaf, 0x8a,
//     0xe3, 0x3f, 0x8d, 0x7, 0x30, 0x50, 0x8b, 0x03,
// ]);
// const tag = new Uint8Array([
//     // 0xb6, 0x1, 0x5b, 0xf9, 0xc4, 0xc1, 0x22, 0x69, 0xac, 0x73, 0x9e, 0x17, 0x22,
//     // 0x8f, 0x80, 0x94,
//     0xd1,
//     0xfb, 0x9d, 0xd2, 0xdd, 0xf1, 0x8c, 0x2e, 0x13, 0x9, 0x4, 0xe2, 0x36, 0x9b,
//     0xc4, 0x7a,
// ]);
// const ChaChaPoly1305_Constructor = new src_1.default(msg, key, AAD, IV);
// const [plaintext, auth_tag] = ChaChaPoly1305_Constructor.chacha20_aead_decrypt(key, msg, tag);
// if (auth_tag)
//     console.log('Tag matched, plaintext: "' + plaintext + '"');

/**
 *
 * @param {Uint8Array} buffer_output
 * @param {Boolean} isJSON
 * @returns {Object}
 */
module.exports = (buffer_output, isJSON = 0) => {
  // console.log('buffer_output length', buffer_output[buffer_output.length - 1])
  const msg = buffer_output.slice(16);
  // console.log('msg length', msg.length)
  // console.log("\nciphertext("+ msg.length + " bytes) = ")
  // for(let i = 0;i < msg.length; i++)
  //     process.stdout.write("0x" + msg[i].toString(16) + ',')

  const tag = buffer_output.slice(0, 16);
  // console.log('\nTAG INPUT = ')
  // for (let i = 0; i < tag.length; i++)
  //   process.stdout.write('0x' + tag[i].toString(16) + ',');

  const ChaChaPoly1305_Constructor = new src_1.default(msg, key, AAD, IV);
  // console.log("\n-----------------CHACHA20-POLY1305 DECRYPT SIDE-----------------")
  // console.log(`Cipher text (${msg.length} bytes): `);
  // for (let i = 0; i < msg.length; i++)
  //   process.stdout.write('0x' + msg[i].toString(16) + ', ');

  const START_DECRYPT_TIME = performance.now();
  const [plaintext = '', auth_tag] =
    ChaChaPoly1305_Constructor.chacha20_aead_decrypt(key, msg, tag) || [
      '',
      new Uint8Array([]),
    ];
  const DECRYPT_TIME = performance.now() - START_DECRYPT_TIME;

  // console.log("\n     - Decrypt time: ", DECRYPT_TIME, " ms");
  // let retArr = [];

  if (auth_tag) {
    // console.log('     - [TAG MATCHED]');
    // console.log(`     - Plaintext (${plaintext?.length} bytes): `);
    // for (let i = 0; i < plaintext?.length - 1; i++)
    //   process.stdout.write('0x' + plaintext.charCodeAt(i).toString(16) + ', ');
    // console.log("\nJSON Plaintext: ", JSON.parse(plaintext));
  } else {
    // console.log('\n     - [TAG NOT MATCHED], \nplaintext: "' + plaintext + '"');
  }

  try {
    return [JSON.parse(plaintext), auth_tag];
  } catch {
    return [{}, false];
  }
};
