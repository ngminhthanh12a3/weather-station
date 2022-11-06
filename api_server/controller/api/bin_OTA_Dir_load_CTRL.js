const fs = require("fs");
const path = require("path");
const { binOTAPath } = require("../../constants");
const { OTA_Filelist } = require("../../models");

module.exports = async (req, res, next) => {
  //   const data = [];

  const { subDir } = req.query;
  const NORMALIZE_PATH = path.normalize(subDir);
  const CURRENT_DIR = path.join(binOTAPath, NORMALIZE_PATH);
  //   console.log(CURRENT_DIR);
  const READ_DIR_SYNC_NAMES = await fs.readdirSync(CURRENT_DIR);

  const data = await Promise.all(
    READ_DIR_SYNC_NAMES.map(async (name) => {
      const filePropertiesDB =
        (await OTA_Filelist.findOne({ file_name: name }).lean().exec()) || {};

      const {
        commit_message = "",
        filetype = "",
        version = "",
        devicetype = "",
      } = filePropertiesDB;

      const CURRENT_NAME_DIR = path.join(CURRENT_DIR, name);

      const CURRENT_NAME_DIR_STAT_SYNC = await fs.statSync(CURRENT_NAME_DIR);
      const { ctimeMs } = CURRENT_NAME_DIR_STAT_SYNC;
      return {
        key: `${name}-${CURRENT_NAME_DIR_STAT_SYNC.isDirectory()}`,
        isDirectory: CURRENT_NAME_DIR_STAT_SYNC.isDirectory(),
        name,
        version,
        ctimeMs,
        filetype,
        commit_message,
        devicetype,
        path: path.join(NORMALIZE_PATH, name),
      };
    })
  );

  res.json({
    NORMALIZE_PATH,
    data: [...data],

    page: 1,
    success: true,
    total: 5,
  });
};
