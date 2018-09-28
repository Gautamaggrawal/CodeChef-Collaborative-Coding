var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var config  = require('./config.json');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// allow cross origin request for a particular url
app.use((request,response,next) => {
  var allowedOrigins = config.angularUrl;
  var origin = request.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    response.header('Access-Control-Allow-Origin', origin);
  }
  response.setHeader('Content-Type', 'application/json');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.header('Access-Control-Allow-Credentials', true);
  next();    
});

app.use('/oauth', require('./routes/oauth/codechef'));

//redirect other users accessing the server
app.use('',function(req,res){res.redirect(config.angularUrl[0])});

module.exports = app;
