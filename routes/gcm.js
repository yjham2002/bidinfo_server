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
