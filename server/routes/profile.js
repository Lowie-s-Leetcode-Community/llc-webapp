const express = require("express");
const router = express.Router();

const awards_controller = require("../controllers/awardsController");
const recentAC_controller = require("../controllers/recentACController");

router.get('/awards', awards_controller.get_awards);
router.get('/recentAC', recentAC_controller.get_recentAC);

module.exports = router;