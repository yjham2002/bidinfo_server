var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(express.bodyParser());
app.use('/', routes);
app.use('/users', users);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8001);

module.exports = app;
