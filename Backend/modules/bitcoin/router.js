var express = require('express');
var router = express.Router();

var _bitcoin = require('./ctl_bitcoin.js');

router.use(function timeLog(req, res, next) {
    next();
});

// router.get('/createAddress', _bitcoin.createAddress);
router.post('/deposit', _bitcoin.deposit);
router.post('/gameStart', _bitcoin.gameStart);
router.post('/clickCell', _bitcoin.clickCell);
router.post('/cashOut', _bitcoin.cashOut);
router.post('/withDraw', _bitcoin.withDraw);

module.exports = router;