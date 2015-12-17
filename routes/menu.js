var express = require('express');
var router = express.Router();
var auth = require('../filter/auth');

var menus = require(__dirname + '/../config/menu_config.json');

function menuFilter(level){
    var items = JSON.parse(JSON.stringify(menus));
    for(var i=0;i<items.length;i++){
        if( items[i].level === undefined || items[i].level < level){
            delete items[i];
            continue;
        }
        if(items[i].nodes){
            for(var j=0;j<items[i].nodes.length;j++){
                if( items[i].nodes[j] == undefined || items[i].nodes[j].level < level){
                    console.info('delete :'+items[i].nodes[j].id);
                    delete items[i].nodes[j];
                    continue;
                }
            }
        }
    }
    return items;
}

function menuFilter2(level){
    var items = JSON.parse(JSON.stringify(menus));
    for(var i=0;i<items.length;i++){
        if( items[i].level === undefined || items[i].level < level){
            //delete items[i];
            items.splice(i,1);
            i--;
            continue;
        }
        if(items[i].nodes){
            for(var j=0;j<items[i].nodes.length;j++){
                if( items[i].nodes[j] == undefined || items[i].nodes[j].level < level){
                    console.info('delete :'+items[i].nodes[j].id);
                    //delete items[i].nodes[j];
                    items[i].nodes.splice(j,1);
                    j--;
                    continue;
                }
            }
        }
    }
    return items;
}

/* GET home page. */
router.get('/',auth.authorize, function(req, res, next) {
    var level = req.session.level===undefined?1000:req.session.level;
    console.info("current admin level="+level);
    var items = menuFilter2(level);
    
    res.send(items);
});

module.exports = router;
