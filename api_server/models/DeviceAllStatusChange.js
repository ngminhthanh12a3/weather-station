const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DeviceAllStatusChangeSchema = new Schema({
  //
  LOG_ID: {
    type: Number,
    unique: true
  },
  devID: { type: Number, unique: false },
  dynamo_status: String,
  status1: String,
  status2: String,
  wifi_status: String,
  updateTime: Number
});

const DeviceAllStatusChange = mongoose.model("DeviceAllStatusChange", DeviceAllStatusChangeSchema);

// DeviceInfo.watch().on("change", (data) => console.log(data));
module.exports = DeviceAllStatusChange;
