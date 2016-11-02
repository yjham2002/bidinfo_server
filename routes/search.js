var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

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

router.get('/', function(req, res) {
    var query = connection.query('SELECT `Bidinfo_bidlist` . * ,(SELECT COUNT( * ) FROM `Bidinfo_like` WHERE `Bidinfo_bidlist`.id = `Bidinfo_like`.bid) '
    +' AS likecount, (SELECT COUNT( * ) FROM `Bidinfo_comment` WHERE `Bidinfo_bidlist`.id = `Bidinfo_comment`.bid) AS commentcount FROM `Bidinfo_bidlist` '
    +' WHERE Title regexp(\'' + req.query.id + '\') OR hid regexp(\'' + req.query.id + '\') ORDER BY view desc, date DESC', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
