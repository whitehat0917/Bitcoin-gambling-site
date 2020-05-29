var express = require('express');
var router = express.Router();

var _user = require('./ctl_user.js');

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/login', _user.login);
router.post('/saveBalance', _user.saveBalance);

module.exports = router;