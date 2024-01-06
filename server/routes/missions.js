const express = require("express");
const router = express.Router();

const mission_controller = require("../controllers/missionsController");

router.get('/', mission_controller.get_missions);
router.get('/1')

module.exports = router;