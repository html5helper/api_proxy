"use strict";
var logger = require('../utils/log').api;
var apiconfig = require(__dirname + '/../config/api_config.json');
var apilist = JSON.parse(JSON.stringify(apiconfig));

function exist(url,method){
    return (apilist[url] && apilist[url].method.indexOf(method)>=0);
}
exports.getFilter = function(req, res, next) {
	if(typeof(req.headers.stattoken) == "undefined"){
		res.send({error:'access token error.'});
	}else if (!exist(req.query.url,'get')) {
        logger.info('unknown_api_get ' +req.query.url);
        res.send({error:'unknown_api_get'});
    } else {
        logger.info('api_get: ' +req.query.url);
        next();
    }
}

exports.postFilter = function(req, res, next) {
	if(typeof(req.headers.stattoken) == "undefined"){
		res.send({error:'access token error.'});
	}else if (!exist(req.body.params.api,'post')) {
        logger.info('unknown_api_post ' +req.body.params.api);
        res.send({error:'unknown_api_post'});
    } else {
        logger.info('api_post: ' +req.body.params.api);
        next();
    }
}

exports.rpcFilter = function(req, res, next) {
	var token = req.headers.stattoken;
	
	logger.info("req.headers.stattoken= "+token);
	if(typeof(req.headers.stattoken) == "undefined"){
		logger.info("req.headers.stattokensss="+req.headers.stattoken);
		res.send({error:'access token error.'});
	}else if (!exist(req.body.params.api,'rpc')) {
        logger.info('unknown_api_rpc ' +req.body.params.api);
        res.send({error:'unknown_api_rpc'});
    } else {
        logger.info('api_rpc: ' +req.body.params.api);
        next();
    }
}
