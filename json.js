const a = 
{
  devID: { type: Number, unique: true },
  wifi_status: String,
  dynamo_status: String,
  CO2: Number,
  CH20: Number,
  TVOC: Number,
  'PM2.5': Number,
  PM10: Number,
  Temperature: Number,
  Humidity: Number,
  Noise: Number,
  version: {
    type: Object,
    default: {
      ESP32: 0,
      STM32: 0,
    },
  },
  ota_type: { type: String, default: 'Local' },
  devicetype: { type: String, default: 'ESP32' },
  ota_upload_time: {
    type: Object,
    default: {
      ESP32: -1,
      STM32: -1,
    },
  },
}
;
