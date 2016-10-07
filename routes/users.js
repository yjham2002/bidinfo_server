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
    res.write(req.params.id);
    res.end();
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
    var query = connection.query('insert into Bidinfo_user set ?', data, function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

router.get('/', function(req, res) {
    var query = connection.query('select * from Bidinfo_user', [], function(err,rows){
        res.json(rows);
        console.log(rows);
    });
    console.log(query);
});

module.exports = router;
