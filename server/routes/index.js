var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /api/message */
router.get("/message", function (req, res, next) {
  res.json({ message: "Welcome to the LLC Website" });
});

module.exports = router;
