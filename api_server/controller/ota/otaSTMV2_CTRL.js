/**
 * 
 * @param {import("express").Request} req req
 * @param {import("express").Response} res res
 * @param {import("express").NextFunction} next next
 */
module.exports = async (req, res, next) => {
  const { FILE_PATH } = req.query;
//   const FILE_BUFFER = await fs.readFileSync(FILE_PATH, { encoding: "binary" });
  res.download(FILE_PATH)
};
