/*
    supervisor test
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //미들웨어??

// express의 jade 템플릿 엔진을 연결하기
app.set('view engine', 'jade');
app.set('views','./views');
app.locals.pretty = true;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Get - Router Routing
app.get('/', function(req, res){
    res.send('Welcome Home');
});
app.get('/login', function(req, res){
    res.send('User Login Please');
});
app.get('/route', function(req, res){
    res.send('Hello Route! <br/> <img src="/juice.png"/>');
});
app.get('/template', function(req, res){
    res.render('temp', {time: 'TIME: ' + Date(), _title: 'Jade'});
});
app.get('/topic/:id', function(req, res){
    let topics = [
        'Javascript is... ',
        'NodeJS is ... ',
        'Express is ... '
    ];
    const output = `
        <a href="/topic/0"> Javascript </a> <br/>
        <a href="/topic/1"> NodeJS </a> <br/>
        <a href="/topic/2"> Express </a> <br/>
        <br/>
        ${topics[req.params.id]}
    `;
    res.send(output);
});
app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+', '+req.params.mode);
});
app.get('/form', function(req, res){
    res.render('form');
});
app.get('/form_receiver', function(req, res){
    let title = req.query.title;
    let desc = req.query.desc;
    
    res.send('Hello, GET! <br> title: '+title+', description: '+desc);
});
app.post('/form_receiver', function(req, res){
    let title = req.body.title;
    let desc = req.body.desc;

    res.send('Hello, POST! <br> title: '+title+', description: '+desc);
});

// 동적으로 생성, 업데이트가 있을 때 node를 reload해줘야 함
app.get('/dynamic', function(req, res){
    let list = '';
    for(let i=1; i<6; i++){
        list = list + '<li>coding' + i + '</li>'
    }
    let time = Date();
    let output = `
    <!DOCTYPE html>
    <html lang="kr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hello Dynamic!</title>
    </head>
    <body>
        Hello Dynamic!
        <ul>
            ${list}
        </ul>
        <h2>${time}</h2>
    </body>
    </html>
    `;
    res.send(output);
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, function(){
    console.log(`http://${hostname}:${port}/`);
    console.log(`Connected ${port} Port!`);
});
