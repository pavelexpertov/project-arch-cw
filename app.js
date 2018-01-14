var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var user_auth = require('./routes/user_auth');
var projects = require('./routes/projects');
var users = require('./routes/users');
var players = require('./routes/players');
var to_do_list = require('./routes/to_do_list');
var users_list = require('./routes/users_list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Add path for serving Vue application
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);
//app.use('/users', users);
app.use('/', test);
app.use('/', user_auth);
app.use('/', projects);
app.use('/', users);
app.use('/', players);
app.use('/', to_do_list);
app.use('/', users_list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
