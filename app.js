const express = require('express');
const app = express();

// express의 jade 템플릿 엔진을 연결하기
app.set('view engine', 'jade');
app.set('views','./views');
app.locals.pretty = true;


// 기본적으로 정적인 파일을 지정하는 public으로 지정 (html 등)
// node가 변화가 있을 때마다 업데이트를 해줌 (새로 연결할 필요가 없으므)
app.use(express.static('public'));


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
        <a href="/topic?id=0"> Javascript </a> <br/>
        <a href="/topic?id=1"> NodeJS </a> <br/>
        <a href="/topic?id=2"> Express </a> <br/>
        <br/>
        ${topics[req.query.id]}
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

    res.send('title: '+title+', description: '+desc);
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

app.listen(3000, function(){
    console.log('Connected 3000 Port!');
});
