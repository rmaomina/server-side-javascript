var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var app = express();

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: _storage });

app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', express.static('uploads'));

app.get('/upload', function(req, res){
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res){
    console.log(req.file);
    res.send('Uploaded! File : ' + req.file.filename);
})

app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('서버 오류가 있습니다.');
        }
        res.render('new', {topics: files});
    });
});

app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('서버 오류가 있습니다.');
        }

        var id = req.params.id;
        if(id) {
            //id값이 있을 때 
            fs.readFile('data/'+id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('서버 오류가 있습니다.');
                }
                res.render('view', {topics: files, title: id, desc: data});
            });
        } else {
            //id값이 있을 때 
            res.render('view', {topics: files, title: 'Welcome', desc: 'Hello, JavaScript for server!'});
        }
    });
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var desc = req.body.description;

    fs.writeFile('data/'+title, desc, function(err){
        if(err){
            console.log(err);
            res.status(500).send('서버 오류가 있습니다.');
        }
        res.redirect('/topic/' + title);
    });

});

const host = '127.0.0.1';
const port = 3000;

app.listen(port, host, function(){
    console.log(`http://${host}:${port}/`);
    console.log(`Connected ${port} Port!`);
});