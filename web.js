var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');
var board = require('./routes/board');
var gcm = require('./routes/gcm');
var notice = require('./routes/notice');
var search = require('./routes/search');
var company = require('./routes/company');
var bodyParser = require('body-parser');
var index = require('./controller/index');
var session = require('express-session');
var app = express();


// Web Section

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static(__dirname + '/public'));

// Web Session Section
app.use(session({
  secret:'bidinfo session',
  resave:false,
  saveUninitialized:true
}));

// Web Section
app.use('/web', index);

app.use('/', routes);
app.use('/search', search);
app.use('/company', company);
app.use('/users', users);
app.use('/board', board);
app.use('/gcm', gcm);
app.use('/notice', notice);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(80);
app.listen(8080);
app.listen(443);

console.log('Server running');

module.exports = app;
