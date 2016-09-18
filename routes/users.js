var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host    :'10.0.0.1',
  port : 3306,
  user : 'yjham2016',
  password : 'gpswpf12',
  database:'yjham2016'
});
var router = express.Router();

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

router.get('/:id', function(req, res) {
    res.write(req.params.id);
    console.log(req.params.id);
});

router.get('/', function(req, res) {
    var query = connection.query('select * from univtable_member', [], function(err,rows){
        res.json(rows);
        res.write(req.params.id);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
