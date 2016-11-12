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

router.post('/send/all', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select `Token` from `Bidinfo_GCM` where `Status` <> 1', [], 
    function(err,rows){
            for(var i = 0; i < rows.length; i++){
                var message = {
                    registration_id: rows[i].Token, // required
                    collapse_key: 'Collapse key', 
                    'data.title': req.body.title,
                    'data.message': req.body.message
                };
                fcm.send(message, function(errState, messageId){});
            }
        res.json(message);
        console.log(rows);
    });
    console.log(query + "/FLAGLOG");
});

router.post('/sends/:id', bodyParser.urlencoded({
    extended: true
}), function(req, res) {
    var query = connection.query('select `Token` from `Bidinfo_GCM` where `mid`=' + req.params.id + ' and `Status` <> 1', [], 
    function(err,rows){
        for(var i = 0; i < rows.length; i++){
            var message = {
                registration_id: rows[i].Token, // required
                collapse_key: 'Collapse key', 
                'data.title': req.body.title,
                'data.message': req.body.message
            };
            fcm.send(message, function(err, messageId){});
        }
        res.json(message);
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
    + '\', '+ req.body.mid +', 0 FROM DUAL WHERE NOT EXISTS (SELECT * FROM Bidinfo_GCM WHERE Token=\''+ req.body.Token +'\'); ', [], function(err,rows){
        var query2 = connection.query('UPDATE Bidinfo_GCM set mid=' + req.body.mid + ' where Token=\'' + req.body.Token + '\'', function(err, rows){
            res.json(rows);
            console.log(rows); 
        });
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
