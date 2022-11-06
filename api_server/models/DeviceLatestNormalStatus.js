const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DeviceLatestNormalStatusSchema = new Schema({
  devID: { type: Number, unique: true },
  // voltage1: Number,
  // voltage2: Number,
  // current1: Number,
  // current2: Number,
  // temperature: Number,
//   temperature_warning: Number,
//   status: Number,
  dynamo_status: String,
  relay_warning1: String,
  relay_warning2: String,
  status1: String,
  status2: String,
  temperature_warning: String,
  wifi_status: String,
});

const DeviceLatestNormalStatus = mongoose.model("DeviceLatestNormalStatus", DeviceLatestNormalStatusSchema);

// DeviceInfo.watch().on("change", (data) => console.log(data));
module.exports = DeviceLatestNormalStatus;
