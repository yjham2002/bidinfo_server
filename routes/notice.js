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

router.get('/recent', function(req, res) {
    var query = connection.query('SELECT * FROM `Bidinfo_notice` WHERE (select MAX(id) FROM `Bidinfo_notice`)=id', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/:id', function(req, res) {
    var query = connection.query('select * from `Bidinfo_notice where` `id`=' + req.params.id, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/new', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var data = {
        'Title':req.body.Title,
        'Content':req.body.Content
    };
    var query = connection.query('insert into `Bidinfo_notice` set ?', data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/', function(req, res) {
    var query = connection.query('select * from `Bidinfo_notice` ORDER BY date DESC', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
