const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var deviceInfoSchema = new Schema({
  //
  devID: { type: Number, unique: true },
  wifi_status: String,
  dynamo_status: String,
  //
  C02: Number,
  CH20: Number,
  TVOC: Number,
  'PM2.5': Number,
  PM10: Number,
  Temperature: Number,
  Humidity: Number,
  Noise: Number,
  //
  version: {
    type: Object,
    default: {
      ESP32: 0,
      STM32: 0,
    },
  },
  ota_type: { type: String, default: 'Local' },
  devicetype: { type: String, default: 'ESP32' },
  // ESP32:{type: Number, default: -1},
  // STM32:{type: Number, default: -1},
  // ota_upload_time: { type: Number, default: -1 },
  ota_upload_time: {
    type: Object,
    default: {
      ESP32: -1,
      STM32: -1,
    },
  },
});

const DeviceInfo = mongoose.model('DeviceInfo', deviceInfoSchema);

// DeviceInfo.watch().on("change", (data) => console.log(data));
module.exports = DeviceInfo;
