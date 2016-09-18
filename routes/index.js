var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.write('Index');
  res.end();
});

module.exports = router;
