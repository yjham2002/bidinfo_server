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
    var query = connection.query('select * from Bidinfo_company where `id`=' + req.params.id, [], function(err,rows){
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
        'Divs':req.body.Divs,
        'Divl':req.body.Divl,
        'Expl':req.body.Expl,
        'hid':req.body.hid,
        'Pnum':req.body.Pnum
    };
    var query = connection.query('insert into Bidinfo_company set ?', data, function(err,rows){
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
