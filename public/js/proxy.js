$(function() {
    var proxy = Class.create({
        initialize : function() {
            //this.container = $("#page-wrapper");
        },
        get : function(url,successedHandler,errorHandler){
            $.ajax({
				url:'/proxy',
				type:'get',
				dataType:'json',
                data:{url : url},
                headers:{"stattoken":"stat.mtedu.com"},
				success:successedHandler,
				error:errorHandler
			});
        },
        post : function(url,data,successedHandler,errorHandler){
            $.ajax({
				url:'/proxy',
				type:'post', 
                contentType: 'application/json',
                dataType: 'text',
                headers:{"stattoken":"stat.mtedu.com"},
                processData: false,
                data:JSON.stringify(data),
				success:successedHandler,
				error:errorHandler
			});
        },
        rpc:function(api,method,parameters,successedHandler,errorHandler){
            $.jsonrpc({
                method: method,
                url:'/proxy/rpc',
                headerParams:{"stattoken":"stat.mtedu.com"},
                params: {api:api,parameters:parameters}
            })
            .done(successedHandler)
            .fail(errorHandler);
        }
    });
    
    if(!window.mt){
        window.mt = {};
    }
    mt.proxy = new proxy();
});