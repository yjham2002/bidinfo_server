var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.write('Index');
});

module.exports = router;
