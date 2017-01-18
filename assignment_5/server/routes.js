var express = require('express');
var router = express.Router();
var Todos = require('./todos.js');
var Admin = require('./admin.js');
var User = require('./user.js');

// Request the homepage

router.get('/error', function(req, res,next) {
    res.render('pages/error');
});
router.get('/', function(req, res,next) {
    if(req.user) {
        User.getName(req.user, function(name) {
            res.render('pages/index', {name: name});
        });
    }
    else {
        res.render('pages/index');
    }
});

// Request the homepage with personal message!
router.get('/welcome/:name', function(req, res,next) {
    res.render('pages/index', {name: "Erne"});
});


router.get('/list', function(req, res,next) {
    if(req.user) {
        User.getName(req.user, function(name) {
            res.render('pages/list', {name: name});
        });
    }
    else {
        res.render('pages/error');
    }
});
router.get('/docs', function(req, res,next) {
    res.render('pages/docs');
});
router.get(/^\/(admin|admn|admun)/, function(req, res,next) {
    res.render('pages/admin');
});

router.get('/adminData', function(req,res,next){
    Admin.getData(function(data) {
        res.write(JSON.stringify(data));
        res.end();
    });
});


router.get('/getTodos', function(req, res, next) {
    if (req.user) {
        Todos.findByUserId(req.user, function(todos) {
            res.write(JSON.stringify(todos));
            res.end();
        });
    }
    else {
        res.render('pages/error');
    }

});

router.post("/addTodo", function(req, res, next) {
    if(req.user) {
        Todos.create(req.body, req.user ,function() {
            res.end("ok");
        });
    }
    else {
        {
            res.render('pages/error');
        }
    }

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
