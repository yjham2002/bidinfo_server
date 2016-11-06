var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
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

router.get('/', function(req, res, next){
  res.redirect('/web/main');
});


router.get('/main', function(req, res, next){
    res.render('login', {session: req.session});
});

router.post('/main', bodyParser.urlencoded({
    extended: true
}), function(req, res, next){
  var query = connection.query('select * FROM `Bidinfo_user` where `Uid`=\'' + req.body.id 
  + '\' AND `Pwd`=\'' + req.body.pw + '\' ', [], function(err,rows){
    var userId = rows[0].id;
    if(rows.length == 1){
      req.session.regenerate(function(){
        if(rows[0].Uid == 'admin@lelab.com'){
          var retrieve = connection.query('select id, Title, Date, Url from `Bidinfo_bidlist` where id in (select bid from `Bidinfo_like` where mid= ? ) order by Date asc', userId, function(err,rows){
          req.session.logined = true;
          req.session.user_id = req.body.id;
          req.session.idnum = userId;
          res.render('admin', {session: req.session, article: rows});
          console.log(rows);
          });
        }
        else{
          var retrieve = connection.query('select id, Title, Date, Url from `Bidinfo_bidlist` where id in (select bid from `Bidinfo_like` where mid= ? ) order by Date asc', userId, function(err,rows){
          req.session.logined = true;
          req.session.user_id = req.body.id;
          req.session.idnum = userId;
          res.render('logout', {session: req.session, article: rows});
          console.log(rows);
          });
        }
      })
    }else{
      req.session.destroy();
      res.redirect('/web/main');
    }
    console.log(rows);
    });
    console.log(query);
});
 
router.post('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/web/main');
});

module.exports = router;