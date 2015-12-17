"use strict";
var logger = require('../utils/log').api;
exports.authorize = function(req, res, next) {
    if (!req.session.username) {
        logger.info('unlogin_user ' +req.baseUrl+req.path);
        res.redirect('/users/login');
    } else {
        logger.info(req.session.username + ' ' +req.baseUrl+req.path);
        next();
    }
}
