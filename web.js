var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');
var bodyParser = require('body-parser');
var app = express();

app.use('/', routes);
app.use('/users', users);
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
