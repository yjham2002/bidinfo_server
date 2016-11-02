var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');
var board = require('./routes/board');
var gcm = require('./routes/gcm');
var notice = require('./routes/notice');
var company = require('./routes/company');
var bodyParser = require('body-parser');

// UnivTable
var uniboard = require('./uniroute/board');
// UnivTable

var app = express();

app.use('/', routes);
app.use('/company', company);
app.use('/users', users);
app.use('/board', board);
app.use('/gcm', gcm);
app.use('/notice', notice);

// UnivTable
app.use('/uniboard', uniboard);
// UnivTable

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8001);

module.exports = app;
