/**
 * 
 * @param {import("express").Request} req req
 * @param {import("express").Response} res res
 * @param {import("express").NextFunction} next next
 */
module.exports = async (req, res, next) => {
  const { FILE_PATH } = req.query;
  res.download(FILE_PATH)
};
