const express = require('express');
const path = require('path');
const session = require('express-session')
var cors = require('cors')

const Base = require('./modules/base/router.js');
const Users = require('./modules/users/router.js');
const Bitcoin = require('./modules/bitcoin/router.js');

// require('./config/passport.js');

var passport = require('passport');
var bodyParser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser');

app.use(cors())

// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: false,
// 	saveUninitialized: false
// }));

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', Users);
app.use('/api/base', Base);
app.use('/api/bitcoin', Bitcoin);
// app.use('/api/competitions', Competitions);

// error handlers`
// Catch unauthorised errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// web server 8080
app.listen(8080, () => console.log('-- [ BLACJACK NODE ] SERVER STARTED LISTENING ON PORT 80 --'));