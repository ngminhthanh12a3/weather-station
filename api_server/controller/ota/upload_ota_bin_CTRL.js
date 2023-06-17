const { storeToDB, publishToBroker } = require("../../handler");
const { emitToClient } = require("../../bin/emitToClient");
var { OTA_Field, OTA_Filelist } = require("../../models");
var fs = require("fs");
const path = require("path");

module.exports = async (req, res, next) => {
  const { filetype, file_name, devicetype = "" } = req.body;
  // storeToDB and update OTA_current_fields
  const {
    OTA_current_fields,
    binOTAPath,
  } = require("../../constants");
  OTA_current_fields.OTA_CURRENT_FIELDS_NAME = file_name;

  const { version: OTA_CURRENT_VERSION, frame_size=8192 } = req.body;
  console.log("frame size ", frame_size, req.body)
  const nowTime = new Date();
  const OTA_LATES_UPDATE = nowTime.getTime();

  const updateDBData = { OTA_CURRENT_VERSION, OTA_LATES_UPDATE };

  //
  const FILE_PATH = path.join(binOTAPath, file_name);
  const { size: FILE_SIZE = 0 } = fs.statSync(FILE_PATH);
  const FILE_SEGMENT_LEN = Math.ceil(FILE_SIZE / frame_size);

  //   update OTA field
  await storeToDB(
    OTA_Field,
    {
      OTA_CURRENT_FIELDS_NAME: file_name,
      ...updateDBData,
      OTA_FILE_FRAME_LENGTH: FILE_SEGMENT_LEN,
      OTA_FRAME_SIZE: frame_size
    },
    { OTA_FILETYPE: filetype, OTA_DEVICE_TYPE: devicetype }
  );
  //   await storeToDB(OTA_Field, { ...updateDBData }, {});
  const { commit_message = "" } = req.body;

  await storeToDB(OTA_Filelist, { ...req.body, commit_message }, { file_name });

  // emit new OTA field to client
  const OTA_FieldDBData = (await OTA_Field.find().lean().exec()) || [];
  emitToClient(
    // {
    //   OTA_CURRENT_VERSION,
    //   OTA_LATES_UPDATE,
    // },
    [...OTA_FieldDBData],
    "OTA_Update"
  );

  var numeral = require("numeral");
  const version_format = numeral(OTA_CURRENT_VERSION).format("0.0");
  res.status(200).json({ status: "done", message: "Form submit success" });
  emitToClient("", "reload_file_list");
  emitToClient(
    {
      type: "success",
      message: "OTA Update",
      description: `New version: ${version_format}`,
    },
    "notification"
  );

  let message = version_format;
  const topicBroker = `firmware_version/${devicetype}_${filetype}`;

  const deviceIsSTM = devicetype.includes("STM");
  if (deviceIsSTM) {
    // const FILE_PATH = path.join(binOTAPath, file_name);
    // const { size: FILE_SIZE = 0 } = fs.statSync(FILE_PATH);
    // // const FILE_FRAME = 1024;

    // const FILE_SEGMENT_LEN = Math.ceil(FILE_SIZE / FILE_FRAME);
    message = FILE_SEGMENT_LEN.toString();
  }

  publishToBroker(topicBroker, message);
};
