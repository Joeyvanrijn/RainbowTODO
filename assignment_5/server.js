// Requirements
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var config = require('./server/config.js');

var router = require('./server/routes.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', router);
app.set('view engine', 'ejs');
PORT = 4200;




server.listen(PORT);
console.log("Server started at port ." + PORT);
