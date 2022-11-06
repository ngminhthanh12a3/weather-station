const chacha20DecryptHandler = require("./api_server/handler/chacha20DecryptHandler");
const payload = new Uint8Array([
  106, 34, 41, 121, 109, 78, -97, -67, 1, 44, 111, -78, -70, -117, 11, 37, 63,
  99, -9, -60, -26, 55, 83, -62, -88, 57, 34, -104, 5, -94, 53, -57, -11, 38,
  72, -48, -54, 80, -22, 15, -36, 107, -60, 9, -64, -36, 24, 2, -79, -5, 5, 58,
  -93, -76, -110, 27, -13, -117, -44, -115, 70, 110, -68, 121,
]);
const decryptValue = chacha20DecryptHandler(payload);

console.log(decryptValue);
