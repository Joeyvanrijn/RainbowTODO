// Requirements
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var Todos = require('./server/todos.js');


app.use(express.static('public'))
app.use(bodyParser.json());

const PORT = 4200;

var todos = [];

// Add some sample data to the todos array
todos.push({
        id: 2,
        text: "TestA",
        date: new Date("2-1-2016"),
        imp: 3,
        done: true,
        tag: 1
    });
todos.push({
        id: 4,
        text: "TestB",
        date: new Date("1-1-2016"),
        imp: 30,
        done: false,
        tag: 2
    });
todos.push({
        id: 3,
        text: "TestC",
        date: new Date("5-2-2016"),
        imp: 7,
        done: true,
        tag: 3
    });

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

app.get('/getTodos', function(req, res, next) {
    Todos.findByUserId(1, function(todos) {
        res.write(JSON.stringify(todos));
        res.end();
    })

})

app.post("/addTodo", function(req, res, next) {
    Todos.create(req.body, function() {
        res.end("ok");
    });
})

app.post("/updateTodo", function(req, res, next) {
    console.log("id: " + req.body.id);
    Todos.update(req.body, function() {
        console.log("Updated todo: " + req.body.id);
        res.end("ok");
    })
})
app.post("/deleteTodo", function(req, res, next) {
    for(i in todos)
    {
        if(todos[i].id == req.body.id){
            todos.splice(i, 1);
        }
    }
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
