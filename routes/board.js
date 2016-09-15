var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'yjham2016',
    database: 'yjham2016',
    password: 'gpswpf12'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/board/list/1');
});

router.get('/list/:page', function(req,res,next){

    pool.getConnection(function (err, connection)
    {
        // Use the connection
        var sqlForSelectList = "SELECT * FROM univtable_list";
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
