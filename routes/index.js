var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.write('UnivTable');
  res.end();
});

module.exports = router;
