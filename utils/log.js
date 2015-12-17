"use strict";

var log4js = require('log4js');
log4js.configure({
    "appenders":[
        {"type":"console"},
        {"type":"file","filename":"./logs/api.log","pattern": "_yyyy-MM-dd","absolute": true, "category":"api","maxLogSize":20480,"backups":5},
        //{"type":"file","filename":"./logs/login.log","pattern": "_yyyy-MM-dd","absolute": true, "category":"login","maxLogSize":20480,"backups":5}
    ]
});

var api = log4js.getLogger('api');
var console = log4js.getLogger('console');
exports.api = api;
exports.console = console;

/*
exports.use = function(app) {
    //app.use(log4js.connectLogger(console, {level:'INFO', format:':method :url'}));
    app.use(log4js.connectLogger(api, {level:log4js.levels.INFO, format:':method :url'}));
}
*/