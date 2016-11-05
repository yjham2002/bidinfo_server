var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/login', function(req, res, next){
  if(req.session.logined) {
    res.render('logout', {session: req.session});
  }
  else {
    res.render('login', {session: req.session});
  }
});
 
router.post('/login', bodyParser.urlencoded({
    extended: true
}), function(req, res, next){
  if(req.body.id == 'admin' && req.body.pw == '1234'){
  req.session.regenerate(function(){
    req.session.logined = true;
    req.session.user_id = req.body.id;
    res.render('logout', {session: req.session});
  })
  }
});
 
router.post('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;