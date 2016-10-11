var express = require('express'),
    connect = require('connect'),
    auth = require('./auth');

var app = express();

app.configure(function() {
  app.use(express.logger());
  app.use(connect.compress());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: "won't tell because it's secret"  }));
  app.use(auth.initialize());
  app.use(auth.session());
});

app.get('/', auth.protected, function (req, res){
	  res.end("Hello " + req.session.passport.user);
});

app.get('/hello', auth.protected, function (req, res){
	  res.end("Hello World!");
});

app.post('/saml/consume', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {
    res.redirect('/');
  }
);

app.get('/samuel', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {
    res.redirect('/');
  }
);

app.listen(process.env.PORT || 3333);
console.log("Server started");
