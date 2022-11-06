const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var deviceInfoSchema = new Schema({
  // devID: String,
  // current1: String,
  // current2: String,
  // dynamo_status: String,
  // relay_warning1: String,
  // relay_warning2: String,
  // status1: String,
  // status2: String,
  // temperature: String,
  // temperature_warning: String,
  // voltage1: String,
  // voltage2: String,
  // wifi_status: String,
  devID: { type: Number, unique: true },
  voltage1: Number,
  voltage2: Number,
  current1: Number,
  current2: Number,
  temperature: Number,
  temperature_warning: Number,
  status: Number,
  // version: { type: Number, default: 1.0 },
  version: {
    type: Object,
    default: {
      ESP32: 0,
      STM32: 0,
    },
  },
  ota_type: { type: String, default: "Local" },
  devicetype: { type: String, default: "ESP32" },
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

const DeviceInfo = mongoose.model("DeviceInfo", deviceInfoSchema);

// DeviceInfo.watch().on("change", (data) => console.log(data));
module.exports = DeviceInfo;
