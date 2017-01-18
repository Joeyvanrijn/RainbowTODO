var express = require('express');
var router = express.Router();
var Todos = require('./todos.js');
var Admin = require('./admin.js');

// Request the homepage
router.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/templates/index.html');
});

// Request the homepage with personal message!
router.get('/welcome/:name', function(req, res,next) {
    res.sendFile(__dirname + '/templates/index.html');
});


router.get('/list', function(req, res,next) {
    res.sendFile(__dirname + '/templates/list.html');
});
router.get('/docs', function(req, res,next) {
    res.sendFile(__dirname + '/templates/docs.html');
});
router.get(/^\/(admin|admn|admun)/, function(req, res,next) {
    res.sendFile(__dirname + '/templates/admin.html');
});

router.get('/adminData', function(req,res,next){
    Admin.getData(function(data) {
        res.write(JSON.stringify(data));
        res.end();
    });
});


router.get('/getTodos', function(req, res, next) {
    Todos.findByUserId(1, function(todos) {
        res.write(JSON.stringify(todos));
        res.end();
    });

});

router.post("/addTodo", function(req, res, next) {
    Todos.create(req.body, function() {
        res.end("ok");
    });
});

router.post("/updateTodo", function(req, res, next) {
    console.log("id: " + req.body.id);
    if(req.body.id == "null"){res.end("ok");}
    Todos.update(req.body, function() {
        console.log("Updated todo: " + req.body.id);
        res.end("ok");
    });
});
router.post("/deleteTodo", function(req, res, next) {
    Todos.remove(req.body.id, function() {
        console.log("Deleted todo: " + req.body.id);
        res.end("ok");
    });
});

router.post("/checkTodo", function(req, res, next) {
    console.log("Checking todo ID: " + req.body.id);
    Todos.checkTodo(req.body.id, function() {
        res.end("ok");
    });
});


router.post("/updateTodoTag", function(req, res, next) {
    console.log("Updateing todo tag todo ID: " + req.body.id);
    Todos.switchTag(req.body.id, function() {
        res.end("ok");
    });
});


module.exports = router;
