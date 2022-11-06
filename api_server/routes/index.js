// exports.homeRouter = require("./home");
// exports.usersRouter = require("./users");
// exports.signupRouter = require("./signup");
// exports.signinRouter = require("./signin");
// exports.signoutRouter = require("./signout");
// exports.checkSigninRouter = require("./checkSignin");
// exports.otaRouter = require("./ota");
// exports.apiRouter = require("./api");
// exports.bin_ota_dir_Router = require("./bin_ota_dir");
module.exports = {
  homeRouter: require("./home"),
  usersRouter: require("./users"),
  signupRouter: require("./signup"),
  signinRouter: require("./signin"),
  signoutRouter: require("./signout"),
  checkSigninRouter: require("./checkSignin"),
  otaRouter: require("./ota"),
  apiRouter: require("./api"),
  bin_ota_dir_Router: require("./api/bin_ota_dir"),
};
