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

router.get('/one/:id', function(req, res) {
    var query = connection.query('select * from Bidinfo_company where `id`=' + req.params.id, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/search', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var str = req.body.search;
    var query = connection.query('SELECT * from Bidinfo_company where Name regexp(\'' + str + '\') OR ' + 'Rprt regexp(\'' + str + '\') OR ' + 'hid regexp(\'' + str + '\')', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/updates', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var data = {
        'Name':req.body.Name,
        'Rnum':req.body.Rnum,
        'Rprt':req.body.Rprt,
        'Charge':req.body.Charge,
        'Addr':req.body.Addr,
        'Phone':req.body.Phone,
        'Email':req.body.Email,
        'Expl':req.body.Expl,
        'hid':req.body.hid
    };
    var query = connection.query('update Bidinfo_company set ? where id=' + req.body.id, data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/crawler', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var data = {
        'Name':req.body.Name,
        'Url':req.body.Url,
        'Status':req.body.Status,
        'LastGet':req.body.LastGet
    };
    var query = connection.query('insert into Bidinfo_crawler set ?', data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/new', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var data = {
        'Name':req.body.Name,
        'Rnum':req.body.Rnum,
        'Rprt':req.body.Rprt,
        'Charge':req.body.Charge,
        'Addr':req.body.Addr,
        'Phone':req.body.Phone,
        'Email':req.body.Email,
        'Expl':req.body.Expl,
        'hid':req.body.hid
    };
    var query = connection.query('insert into Bidinfo_company set ?', data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/select', function(req, res) {
    var query = connection.query('select * from `Bidinfo_company` '
    +'where `Bidinfo_company`.`hid` regexp(select `Bidinfo_bidlist`.`hid` from `Bidinfo_bidlist` where `Bidinfo_bidlist`.`id` = '+ req.query.id +') order by RAND() LIMIT 5', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/', function(req, res) {
    var query = connection.query('select * from Bidinfo_company order by `Name` asc', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
