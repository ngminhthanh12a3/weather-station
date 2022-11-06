const { DeviceInfo, OTA_Field } = require("../../models");

module.exports = async (req, res, next) => {
  const datas = await DeviceInfo.find({}).lean().exec();

  const res_data = [];

  for await (const data of datas) {
    const { devID, version, ota_upload_time, ota_type } = data;

    // push ESP32
    if (
      await OTA_Field.findOne({
        OTA_FILETYPE: ota_type,
        OTA_DEVICE_TYPE: "ESP32",
      })
    )
      res_data.push({
        devID,
        key: `ESP32_${devID}`,
        version: version["ESP32"],
        ota_upload_time: ota_upload_time["ESP32"],
        devicetype: "ESP32",
        ota_type,
      });

    // PUSH STM32
    if (
      await OTA_Field.findOne({
        OTA_FILETYPE: ota_type,
        OTA_DEVICE_TYPE: "STM32",
      })
    )
      res_data.push({
        devID,
        key: `STM32_${devID}`,
        version: version["STM32"],
        ota_upload_time: ota_upload_time["STM32"],
        devicetype: "STM32",
        ota_type,
      });
  }
  res.status(200).json({
    data: [...res_data],

    page: 1,
    success: true,
    total: datas.length,
  });
};
