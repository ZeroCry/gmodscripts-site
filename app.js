//MAKE SURE YOU SET AN API KEY IN PASSPORT.USE


var config = require('./config');

var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(expressSession);
var redis = require("redis").createClient();
var passport = require('passport');
var SteamStrategy = require('./node_modules/passport-steam').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    db: config.redis.db,
    pass: config.redis.pass
  }),
  secret: config.redis.secret
}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
        returnURL: "http://localhost:3000/account/auth/steam/return",
        realm: 'http://localhost:3000/',
        apiKey: 'APIKEYPLS'
    },
    function(ident, profile, done) {
        process.nextTick(function() {
            console.log("STUFF:");
            console.log(profile);

            var idPts = ident.split("/");
            var id = idPts[idPts.length - 1];
            profile.identifier = id;

            return done(null, profile);
        });
    }
));

function IsAuthed(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.reddirect('/account/login');
}

// routing
require("./routes.js")(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
