$(function() {
    mt.views.dashboard = Class.create(mt.BaseView,{
        initialize : function() {
            this.container = $("#mtTempMain");
            this.dependency = ['libs/echarts/echarts.js'];
        },
        apiTestCase:function(){
            mt.proxy.get("http://xxx.xxxx.com/heartbeat/stat/looked/count/uv",function(res){
                this.container.append("<p>mt.proxy.get successed.</p>");
            }.bind(this),function(err){
                console.info(err);
            });
            
            mt.proxy.rpc("http://xxx.xxxx.com/rpc/course","AllItems",[0,1000],function(res){
                console.info(res);
                this.container.append("<p>mt.proxy.rpc successed.</p>");
            }.bind(this),function(err){
                console.info(err);
            });
            
            var data = {jsonrpc: "2.0", method: "AllItems",id: 10,params: {api: "http://xxx.xxxx.com/rpc/course", parameters: [0, 1000]}};
            mt.proxy.post("http://xxx.xxxx.com/rpc/course",data,function(res){
                console.info(res);
                this.container.append("<p>mt.proxy.post successed.</p>");
            }.bind(this),function(err){
                console.info(err);
            });
        },
        run : function(moduleId){
        	this.apiTestCase();
        },
        stop : function(){
            if(this.container){
                //$(this.container).html('');
            }
        }
    });
});
