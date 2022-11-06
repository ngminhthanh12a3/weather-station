const path = require("path");
const fs = require("fs");
const url = require("url");
const { binOTAPath } = require("../../constants");
const { info } = require("console");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports = async (req, res, next) => {
  const NORMALIZE_PATH = await path.normalize(req.query.subDir || "");
  const RES_FILE_PATH = await path.join(binOTAPath, NORMALIZE_PATH);

  const { isDirectory } = req.query;

  if (isDirectory === "false") {
    const FILE_BUFFER = fs.readFileSync(RES_FILE_PATH).buffer;
    res.json({ data: Buffer.from(FILE_BUFFER) });
  } else if (isDirectory === "true") {
    const REDIRECT_URL = url.format({
      pathname: "/api/bin_ota_dir/load",
      query: req.query,
    });

    res.redirect(REDIRECT_URL);
  }
};
