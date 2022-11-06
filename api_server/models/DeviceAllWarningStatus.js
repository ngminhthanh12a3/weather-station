const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DeviceAllWarningStatusSchema = new Schema({
  //
  LOG_ID: {
    type: Number,
    unique: true
  },
  devID: { type: Number, unique: false },
  // voltage1: Number,
  // voltage2: Number,
  // current1: Number,
  // current2: Number,
  // temperature: Number,
//   temperature_warning: Number,
//   status: Number,
  // dynamo_status: String,
  relay_warning1: String,
  relay_warning2: String,
  voltage_warning1: String,
  voltage_warning2: String,
  // status1: String,
  // status2: String,
  temperature_warning: String,
  // wifi_status: String,
  
});

const DeviceAllWarningStatus = mongoose.model("DeviceAllWarningStatus", DeviceAllWarningStatusSchema);

// DeviceInfo.watch().on("change", (data) => console.log(data));
module.exports = DeviceAllWarningStatus;
