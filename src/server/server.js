// 설치한 라이브러리
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

// express를 사용하기 위한 app 생성
const app = express();

// express 포트 설정
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// db 접속 정보
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'user_icia',
    password: '1111',
    port: "3306",
    database: 'db_icia'
});

// express 접속
app.listen(PORT, ()=>{
    console.log(`Server On : http://localhost:${PORT}`)
});

// db 접속
db.connect((err) => {
    if(!err){
        console.log('db 접속 성공')
    }
    else {
        console.log('db 접속 실패')
    }
})

app.get('/list', (req, res) => {
    console.log(`app.get('/list')`)
    const sql = "select * from board order by id desc";
    db.query(sql, (err, data) => {
        if(!err){
            res.send(data);
        }
        else{
            console.log(err)
        }
    })
})

// 게시글 상세보기
app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    console.log(`app.get('/view/${id}')`);

    const sql = "select * from board where id=?"
    db.query(sql, [id], (err, data) => {
        if(!err){
            res.send(data);
        }
        else{
            console.log(err);
        }
    })
})

// 게시글 등록
app.post('/insert', function(req, res) {
    const title = req.body.title;
    const contents = req.body.contents;
    const writer = req.body.writer;
    
    console.log(title, contents, writer);

    const sql = 'insert into board(title, contents, writer) values(?,?,?)'

    db.query(sql, [title, contents, writer], function(err, data){
        if(!err){
            console.log(data);
            res.sendStatus(200);
        }
        else{
            console.log(err);
        }
    })
})

// 게시글 수정
app.post('/modify/:id', function(req, res) {
    console.log('수정 확인!');

    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;
    const writer = req.body.writer;
    
    console.log(id, title, contents, writer);

    const sql = 'update board set title=?, contents=?, writer=? where id=?';
    db.query(sql, [title, contents, writer, id], function(err, data) {
        if(!err) {
            console.log(data);
            res.sendStatus(200)
        }
        else {
            console.log(err);
        }
    })
})

// 게시글 삭제
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'delete from board where id = ?';
    
    db.query(sql, [id], function(err, data) {
        if(!err) {
            console.log(data);
            res.sendStatus(200)
        }
        else{
            console.log(err);
        }
    })
})