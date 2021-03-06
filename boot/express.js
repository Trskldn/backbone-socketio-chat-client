var express = require('express'),
  config = require('nconf'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  sessionFileStore = require('session-file-store')(session),
  sessionOptions = config.get('session'),
  path = require('path'),
  log4js = require('log4js'),
  log = log4js.getLogger(),
  passport = require('passport'),
  sessionMiddleware;

module.exports = function(app) {
  app.set('port', process.env.PORT || config.get('port') || 3000);
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');

  sessionOptions.store = new sessionFileStore();
  sessionMiddleware = session(sessionOptions);

  app.use(log4js.connectLogger(log4js.getLogger("http"), {
    level: 'auto'
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(express.static(path.join(__dirname, './../public')));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    console.log('requ.user: ', JSON.stringify(req.user));
    next();
  });

  app.get('io').use(function(socket, next) {
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
  });


  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      log.error("Something went wrong:", err);
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
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

};
