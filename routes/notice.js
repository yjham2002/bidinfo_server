var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var FCM = require('fcm').FCM;
var apiKey = 'AIzaSyDW9EBF7iPBaRAQHLvlYljQ1OyiFI-6RGs';

var fcm = new FCM(apiKey);

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

router.get('/recent', function(req, res) {
    var query = connection.query('SELECT * FROM `Bidinfo_notice` WHERE (select MAX(date) FROM `Bidinfo_notice` where Title<>\'#popup\')=date', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/removes/:id', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('DELETE FROM Bidinfo_notice where id=?', req.params.id, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/:id', function(req, res) {
    var query = connection.query('select * from `Bidinfo_notice` where `id`=' + req.params.id, [], function(err,rows){
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
        var request = require('request');
        var headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded'
        }
        var options = {
            url: 'http://lelab.cafe24.com/gcm/send/all',
            method:'POST',
            headers: headers,
            form: {'title': req.body.Title, 'message': req.body.Content}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        })

        res.redirect('/web/main');
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
