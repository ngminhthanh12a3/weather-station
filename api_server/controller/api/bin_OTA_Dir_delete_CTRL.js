const fs = require("fs");
const path = require("path");
const { binOTAPath } = require("../../constants");

module.exports = async (req, res, next) => {
  //   console.log(req.body);

  for await (let dir_name_obj of req.body) {
    if (dir_name_obj.name === "/..") continue;
    // const DELETE_NORMALIZE_PATH =
    // console.log(dir_name_obj.path, path.(dir_name_obj.path));
    const DELETE_DIR_NAME_PATH = path.join(binOTAPath, dir_name_obj.path);
    const DELETE_DIR_NAME_PATH_SYNC = fs.statSync(DELETE_DIR_NAME_PATH);
    console.log(
      DELETE_DIR_NAME_PATH_SYNC.isDirectory() ||
        DELETE_DIR_NAME_PATH_SYNC.isFile()
    );
  }
  res.json({ type: "ok" });
};
