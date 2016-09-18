var http = require('http');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var app = express();
var connection = mysql.createConnection({
    host    :'10.0.0.1',
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

/*
app.post('/users',function(req,res){
    var user = {'userid':req.body.userid,
                'name':req.body.name,
                'address':req.body.address};
    var query = connection.query('insert into users set ?',user,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
        res.send(200,'success');
    });
});
*/

// app.get('/sample/:id', routes.sample)

function remove(res){

}

function update(res){

}

//  + mysql.escape(req.param('sid'))

function read(res) {
    console.log('request handler called - read');
    var query = connection.query('select * from univtable_member', function(err,rows){
        res.send(rows);
        console.log(rows);
    });
    console.log(query);
}
 
function create(res) {
    console.log('request handler called - create');
}

function noResponse(res){

} 

var handle = {};
handle['/'] = noResponse;
handle['/remove'] = remove;
handle['/update'] = update;
handle['/read'] = read;
handle['/create'] = create;

exports.handle = handle;
