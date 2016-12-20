// Requirements
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var Todos = require('./server/todos.js');
var Admin = require('./server/admin.js')


app.use(express.static('public'))
app.use(bodyParser.json());

const PORT = 4200;

// Request the homepage
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/templates/index.html');
});
app.get('/list', function(req, res,next) {
    res.sendFile(__dirname + '/templates/list.html');
});
app.get('/docs', function(req, res,next) {
    res.sendFile(__dirname + '/templates/docs.html');
});
app.get('/admin', function(req, res,next) {
    res.sendFile(__dirname + '/templates/admin.html');
});

app.get('/adminData', function(req,res,next){
    Admin.getData(function(data) {
        res.write(JSON.stringify(data));
        res.end();
    })
});


app.get('/getTodos', function(req, res, next) {
    Todos.findByUserId(1, function(todos) {
        res.write(JSON.stringify(todos));
        res.end();
    });

});

app.post("/addTodo", function(req, res, next) {
    Todos.create(req.body, function() {
        res.end("ok");
    });
});

app.post("/updateTodo", function(req, res, next) {
    console.log("id: " + req.body.id);
    Todos.update(req.body, function() {
        console.log("Updated todo: " + req.body.id);
        res.end("ok");
    });
});
app.post("/deleteTodo", function(req, res, next) {
    Todos.remove(req.body.id, function() {
        console.log("Deleted todo: " + req.body.id);
        res.end("ok");
    })
});

app.post("/checkTodo", function(req, res, next) {
    console.log("Checking todo ID: " + req.body.id);
    Todos.checkTodo(req.body.id, function() {
        res.end("ok");
    });
});


app.post("/updateTodoTag", function(req, res, next) {
    console.log("Updateing todo tag todo ID: " + req.body.id);
    Todos.switchTag(req.body.id, function() {
        res.end("ok");
    })
});


server.listen(PORT);
console.log("Server started at port ." + PORT)
