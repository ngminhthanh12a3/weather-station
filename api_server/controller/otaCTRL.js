var path = require("path");
const { storeToDB } = require("../handler");

module.exports = async (req, res, next) => {
  const { OTA_Field, DeviceInfo } = require("../models");
  // enable test ota
  // const { OTA_current_fields } = require("../constants");
  const { filetype = "", devicetype = "", devID = 0 } = req.query || {};

  const {
    OTA_CURRENT_FIELDS_NAME = "",
    OTA_ENABLE = true,
    OTA_CURRENT_VERSION = 1.0,
    OTA_FRAME_SIZE
  } = (await OTA_Field.findOne({
    OTA_FILETYPE: filetype,
    OTA_DEVICE_TYPE: devicetype,
  })
    .lean()
    .exec()) || {};

  var binPATH = path.join(process.cwd(), `binOTA/${OTA_CURRENT_FIELDS_NAME}`);

  const differenceFOTAVersion = req.query["v"] != OTA_CURRENT_VERSION;

  if (OTA_ENABLE && differenceFOTAVersion && OTA_CURRENT_FIELDS_NAME) {
    const update_data = {
      ota_type: filetype,
      devicetype: "ESP32",
      // ota_upload_time: Date.now(),
      ota_upload_time: {},
      version: {},
    };

    update_data.ota_upload_time[`${devicetype}`] = Date.now();
    update_data.version[`${devicetype}`] = OTA_CURRENT_VERSION;
    await DeviceInfo.findOneAndUpdate({ devID }, { ...update_data });
    const { frame = undefined } = req.query;
    // goto
    if (frame !== undefined) {
      req.query["FILE_PATH"] = binPATH;
      req.query["FILE_FRAME"] = OTA_FRAME_SIZE;
      return next();
    }

    res.download(binPATH);
  } else {
    res.writeHead(400);
    res.end("Fail");
  }
};
