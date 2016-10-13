var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var FCM = require('fcm').FCM;
var apiKey = 'AIzaSyBm7Wp-8w9oAGKQdGQZuaOuAzg5zdiMSdI';

var fcm = new FCM(apiKey);

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

router.post('/send/all', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select `Token` from `Bidinfo_GCM` where `Status` <> 1', [], function(err,rows){
        var tokens = [];
        for(var i = 0; i < rows.length; i++){
            tokens.push(rows[i].Token);
        }
        var message = {
        registration_id: tokens, // required
        collapse_key: 'Collapse key', 
        'data.title': req.body.title,
        'data.message': req.body.message
        };
        fcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Sent with message ID: ", messageId);
        }
        });
        res.json(tokens);
        console.log(rows);
    });
    console.log(query);
});

router.post('/send/:id', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select `Token` from `Bidinfo_GCM` where `mid`=' + req.params.id + ' and `Status` <> 1', [], function(err,rows){
        var tokens = [];
        for(var i = 0; i < rows.length; i++){
            tokens.push(rows[i].Token);
        }
        var message = {
        registration_id: tokens, // required
        collapse_key: 'Collapse key', 
        'data.title': req.body.title,
        'data.message': req.body.message
        };
        fcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Sent with message ID: ", messageId);
        }
        });
        res.json(tokens);
        console.log(rows);
    });
    console.log(query);
});

router.get('/:id', function(req, res) {
    var query = connection.query('select `Token` from `Bidinfo_GCM` where `mid`=' + req.params.id + ' and `Status` <> 1', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.post('/new', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('INSERT INTO Bidinfo_GCM(Token, mid, Status) SELECT \''+ req.body.Token 
    + '\', '+ req.body.mid +', 0 FROM DUAL WHERE NOT EXISTS (SELECT * FROM Bidinfo_GCM WHERE Token=\''+ req.body.Token +'\')', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/', function(req, res) {
    var query = connection.query('select * from Bidinfo_GCM', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
