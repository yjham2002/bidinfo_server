var http = require('http');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var app = express();
var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'yjham2016',
    password : 'gpswpf12',
    database:'yjham2016'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

app.get('/users', function(req,res){
    var query = connection.query('select * from univtable_member',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
});

app.listen(8001);
console.log('Server running');
