var express = require('express');
var path = require('path');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var flash = require('connect-flash');
var passport = require('./setup/passport_init');
var expressSession = require('express-session');
var Config = require('../config');
var isAuthenticated = require('./helper/auth_check');

var app = express();

app.use(compression());
app.use(expressSession({secret: Config.secret}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser(Config.secret))
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Setup DB
require('./db/setup');

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../public')));

// Auth routes
var auth_route = require('./routes/auth');
app.use('/auth', auth_route);

app.use('/api', isAuthenticated);

// Other routes
var record_route = require('./routes/record_route');
app.use('/api/record', record_route);
var account_route = require('./routes/account_route');
app.use('/api/account', account_route);
var tag_route = require('./routes/tag_route');
app.use('/api/tag', tag_route);

var api_route = require('./routes/api');
app.use('/api', api_route);

// send all requests to index.html so browserHistory works
app.get('*', function(req, res) {
	if (!req.isAuthenticated()&&req.path!="/login"){
		res.redirect("/login");
		return;
	}else if (req.isAuthenticated()&&req.path=="/login"){
		res.redirect("/");
		return;
	}
    res.sendFile(path.join(__dirname, '../public', 'app.html'));
});

var PORT = process.env.PORT || 3400;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
