var express = require("express");
const { post_FMCToken_CTRL, delete_FMCToken_CTRL } = require("../../controller");
var router = express.Router();

router.post("/", post_FMCToken_CTRL);
router.delete("/", delete_FMCToken_CTRL)

module.exports = router;