var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host    :'localhost',
  port : 3306,
  user : 'root',
  password : 'lelab2016',
  database:'bidinfo'
});
var router = express.Router();

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

router.post('/', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var str = req.body.search;
    var query = connection.query('SELECT `Bidinfo_bidlist` . * ,(SELECT COUNT( * ) FROM `Bidinfo_like` WHERE `Bidinfo_bidlist`.id = `Bidinfo_like`.bid) '
    +' AS likecount, (SELECT COUNT( * ) FROM `Bidinfo_comment` WHERE `Bidinfo_bidlist`.id = `Bidinfo_comment`.bid) AS commentcount FROM `Bidinfo_bidlist` '
    +' WHERE Title regexp(\'' + str + '\') OR hid regexp(\'' + str + '\') ORDER BY view desc, date DESC', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
