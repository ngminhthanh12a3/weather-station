var fs = require("fs");
const { emitToClient } = require("../../bin/emitToClient");
const { binOTAPath } = require("../../constants");
const { OTA_Field, OTA_Filelist } = require("../../models");
module.exports = async (req, res, next) => {
  const files = [...req.body];
  const totalFiles = files.length;

  console.log(req.body);

  let deletedFiles = 0;

  for await (const file of files) {
    const { file_name = "", filetype = "", devicetype = "" } = file;

    const dataDB = await OTA_Field.findOne({
      OTA_FILETYPE: filetype,
      OTA_DEVICE_TYPE: devicetype,
    })
      .lean()
      .exec();
    const { OTA_CURRENT_FIELDS_NAME } = dataDB;

    const filePath = `${binOTAPath}/${file_name}`;

    const checkDirectory = fs.existsSync(filePath);
    if (!checkDirectory) break;

    var fileStat = await fs.statSync(filePath);

    if ((await fileStat.isFile()) && file_name != OTA_CURRENT_FIELDS_NAME) {
      fs.unlink(filePath, (err) => {});
      await OTA_Filelist.findOneAndDelete({ file_name: file_name });
      deletedFiles++;
    }
  }

  res.status(200).json({
    msg: `Delete ${deletedFiles}/${totalFiles} selected files`,
    type: "info",
  });
  emitToClient("", "reload_file_list");
};
