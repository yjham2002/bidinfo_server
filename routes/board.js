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

router.post('/check', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select count(*) as `check` from `Bidinfo_like` where `bid`=' + req.body.bid + ' and mid=' + req.body.mid, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/like', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var data = {
        'bid':req.body.bid,
        'mid':req.body.mid
    };
    var query = connection.query('insert into Bidinfo_like set ?', data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/unlike', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('delete from Bidinfo_like where bid=' + req.body.bid + ' and mid=' + req.body.mid, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/:id', function(req, res) {
    var query = connection.query('select * from Bidinfo_bidlist where `id`=' + req.params.id, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/comment/:id', function(req, res) {
    var query = connection.query('SELECT `Bidinfo_comment`.*, (SELECT Name FROM `Bidinfo_user` WHERE `Bidinfo_comment`.mid = `Bidinfo_user`.id) '
    +'AS userName FROM `Bidinfo_comment` WHERE `bid`=' + req.params.id +' ORDER BY date DESC', [], function(err,rows){
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
        'ExpDate':req.body.ExpDate,
        'Bdate':req.body.Bdate,
        'Status':req.body.Status,
        'Phone':req.body.Phone
    };
    var query = connection.query('insert into Bidinfo_bidlist set ?', data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/count/:id', function(req, res) {
    var query = connection.query('UPDATE Bidinfo_bidlist set `view`=`view`+1 where id='+req.params.id, [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/search', function(req, res) {
    var query = connection.query('SELECT `Bidinfo_bidlist` . * ,'
    +' (SELECT COUNT( * ) FROM `Bidinfo_like` ' + 'WHERE `Bidinfo_bidlist`.id = `Bidinfo_like`.bid) AS likecount, '
    +'(SELECT COUNT( * ) FROM `Bidinfo_comment` ' + 'WHERE `Bidinfo_bidlist`.id = `Bidinfo_comment`.bid) AS commentcount'
    +' FROM `Bidinfo_bidlist` WHERE title regexp(' + req.query.id + ')' + ' OR hid regexp(' + req.query.id + ') ORDER BY view desc, date DESC ', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});


router.get('/', function(req, res) {
    var query = connection.query('SELECT `Bidinfo_bidlist` . * ,'
    +' (SELECT COUNT( * ) FROM `Bidinfo_like` '
    +'WHERE `Bidinfo_bidlist`.id = `Bidinfo_like`.bid) AS likecount, '
    +'(SELECT COUNT( * ) FROM `Bidinfo_comment` '
    +'WHERE `Bidinfo_bidlist`.id = `Bidinfo_comment`.bid) AS commentcount'
    +' FROM `Bidinfo_bidlist` WHERE title regexp(select hid from Bidinfo_user where id=' + req.query.id + ')'
    +' OR hid regexp(select hid from Bidinfo_user where id=' + req.query.id + ') ORDER BY view desc, date DESC ', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
