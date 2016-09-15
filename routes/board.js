var express = require('express');
var router = express.Router();

//   MySQL 로드
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'guestmember',
    database: 'test',
    password: '1234'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    // 그냥 board/ 로 접속할 경우 전체 목록 표시로 리다이렉팅
    res.redirect('/board/list/1');
});

// 리스트 전체 보기 GET
router.get('/list/:page', function(req,res,next){

    pool.getConnection(function (err, connection)
    {
        // Use the connection
        var sqlForSelectList = "SELECT idx, creator_id, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate,hit FROM board";
        connection.query(sqlForSelectList, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.render('list', {title: ' 게시판 전체 글 조회', rows: rows});
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

// 글쓰기 화면 표시 GET
router.get('/write', function(req,res,next){
    res.render('write',{title : "게시판 글 쓰기"});
});



// 글쓰기 로직 처리 POST
router.post('/write', function(req,res,next){

    var creator_id = req.body.creator_id;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [creator_id,title,content,passwd];

    pool.getConnection(function (err, connection)
    {
        // Use the connection
        var sqlForInsertBoard = "insert into board(creator_id, title, content, passwd) values(?,?,?,?)";
        connection.query(sqlForInsertBoard,datas, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.redirect('/board');
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });

});

module.exports = router;
