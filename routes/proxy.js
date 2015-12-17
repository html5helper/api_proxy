"use strict";
var express = require('express');
var router = express.Router();
var logger = require('../utils/log').api;

var api = require('../filter/api');
var superagent = require('superagent');

router.get('/',api.getFilter, function(req, res, next) {
    var reqUrl = req.query.url;
    logger.info('stat_token='+req.headers.access_token);
    superagent.get(reqUrl).end(function(error,response) {
        res.send(response.text);
	});
});

router.post('/',api.postFilter, function(req, res, next) {
	var reqUrl = req.body.params.api;
    var body = req.body;
    body.params = body.params.parameters;
    
   superagent.post(reqUrl).send(body).end(function(error,response) {
        if(error){
            res.send(error);
        }else{
            res.send(response.body);
        }
	});
});

router.post('/rpc',api.rpcFilter, function(req, res, next) {
	var reqUrl = req.body.params.api;
    var body = req.body;
    body.params = body.params.parameters;
    
   superagent.post(reqUrl).send(body).end(function(error,response) {
        if(error){
            res.send(error);
        }else{
            res.send(response.body);
        }
	});
});

module.exports = router;
