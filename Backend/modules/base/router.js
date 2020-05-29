var express = require('express');
var router = express.Router();

var _base = require('./ctl_base.js');

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/testConnection', _base.testConnection);

module.exports = router;