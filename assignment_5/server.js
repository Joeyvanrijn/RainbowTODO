// Requirements
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var config = require('./server/config.js');
var router = require('./server/routes.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('./server/user.js');
var session = require('express-session');


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(session({
  secret: 'jkdshfdjshlfjklsafhljsakfhkjasdhflasdhfdjklsfhasjkl',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/', router);
app.set('view engine', 'ejs');
PORT = 4200;

passport.use(new GoogleStrategy({
    clientID: config.google.key,
    clientSecret: config.google.secret,
    callbackURL: "http://127.0.0.1:4200/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate(profile.id, profile.displayName, function (err, user) {
        return done(null, user);
      });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));


app.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


server.listen(PORT);
console.log("Server started at port ." + PORT);
