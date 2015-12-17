var express = require('express');
var router = express.Router();
var auth = require('../filter/auth');

router.get('/',auth.authorize, function(req, res, next) {
    res.render('index');
});

module.exports = router;
