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

router.get('/:id', function(req, res) {
    var query = connection.query('select * from Bidinfo_user where `id`=' + req.params.id, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/login', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select * FROM `Bidinfo_user` where `Uid`=\'' + req.body.Uid + '\' AND `Pwd`=\'' + req.body.Pwd + '\' ', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/red', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select * FROM `Bidinfo_user` where `Uid`=\'' + req.body.Uid + '\'', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/tag', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('UPDATE `Bidinfo_user` SET `hid`=\'' + req.body.hid + '\' where id = ' + req.body.id, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/like/:id', function(req, res) {
    var query = connection.query('SELECT `Bidinfo_bidlist` . * ,'
    +' (SELECT COUNT( * ) FROM `Bidinfo_like` '
    +'WHERE `Bidinfo_bidlist`.id = `Bidinfo_like`.bid) AS likecount, '
    +'(SELECT COUNT( * ) FROM `Bidinfo_comment` '
    +'WHERE `Bidinfo_bidlist`.id = `Bidinfo_comment`.bid) AS commentcount'
    +' FROM `Bidinfo_bidlist` where `Bidinfo_bidlist`.id in (select bid from `Bidinfo_like` where mid= ? ) order by Date asc', req.params.id, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/attend/:id', function(req, res) {
    var query = connection.query('SELECT `Bidinfo_bidlist` . * ,'
    +' (SELECT COUNT( * ) FROM `Bidinfo_like` '
    +'WHERE `Bidinfo_bidlist`.id = `Bidinfo_like`.bid) AS likecount, '
    +'(SELECT COUNT( * ) FROM `Bidinfo_comment` '
    +'WHERE `Bidinfo_bidlist`.id = `Bidinfo_comment`.bid) AS commentcount'
    +' FROM `Bidinfo_bidlist` where `Bidinfo_bidlist`.id in (select bid from `Bidinfo_comment` where mid= ? ) order by Date asc', req.params.id, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/new', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var data = {
        'Uid':req.body.Uid,
        'Pwd':req.body.Pwd,
        'Name':req.body.Name,
        'Phone':req.body.Phone,
        'symbol':req.body.Symbol,
        'Bdate':req.body.Bdate,
        'hid':req.body.hid
    };
    var query = connection.query('insert into `Bidinfo_user` set ?', data, function(err,rows){
                res.json(rows);
                console.log(rows);
            });
});


module.exports = router;
