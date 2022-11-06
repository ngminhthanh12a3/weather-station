var express = require("express");
var router = express.Router();

var {
  bin_OTA_Dir_load_CTRL,
  bin_OTA_Dir_open_CTRL,
  bin_OTA_Dir_delete_CTRL,
} = require("../../controller");

router.get("/load", bin_OTA_Dir_load_CTRL);
router.get("/open", bin_OTA_Dir_open_CTRL);
router.post("/delete", bin_OTA_Dir_delete_CTRL);

module.exports = router;
