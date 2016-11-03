var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.write('Bid Info Server is ongoing');
  res.end();
});

module.exports = router;
