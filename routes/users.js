var express = require('express');
var router = express.Router();
var models = require('../models');
var codec = require('../utils/codec.js');
var logger = require('../utils/log').api;

function get_ip(req){
	var ip = '未知';
	try{
		var headers = req.headers;
		var remote_addr = req.connection.remoteAddress;
		var x_real_ip = headers['x-real-ip'];
		var x_forwarded_for = headers['x-forwarded-for'];
		
		ip = (x_real_ip || x_forwarded_for || remote_addr);
	}catch(err){
		ip = '未知';
	}
	return ip;
}

router.get('/login', function (req, res, next) {
    logger.info(req.baseUrl+req.path + ' '+get_ip(req));
    if (req.session.username) {
        logger.info("logined user '"+req.session.username +"' redirect");
        res.redirect('/');
    }else{
        res.render('login');
    }
});

router.post('/login', function (req, res, next) {
    logger.info(req.baseUrl+req.path + ' '+get_ip(req));
    models.admin.findOne({where: {username: req.body.username}}).then(function (user) {
        if (user) {
            if (user.password === codec(user.crypt,req.body.password)) {
                req.session.username = user.username;
                req.session.realname = user.realname;
                req.session.level = user.level;
                logger.info("'"+req.session.username+"' login successed");
                res.redirect('/');
            } else {
                res.redirect('/users/login');
            }
        } else {
            res.redirect('/users/login');
        }
    });
});

router.get('/logout', function (req, res, next) {
    logger.info(req.baseUrl+req.path);
    req.session.destroy(function(err){
        console.log(err);
        res.redirect('/users/login');
    })
});


module.exports = router;
