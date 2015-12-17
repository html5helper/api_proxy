//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(window).bind("load resize", function() {
    topOffset = 50;
    width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
    if (width < 768) {
        $('div.navbar-collapse').addClass('collapse');
        topOffset = 100; // 2-row-menu
    } else {
        $('div.navbar-collapse').removeClass('collapse');
    }

    height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        $("#page-wrapper").css("min-height", (height) + "px");
    }
});
function renderMenu() {
    $('#side-menu').metisMenu();

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
}

$(function() {
    $.get('/menu',function(response){
        console.info(response);
        var items = response;
        var container = $("#side-menu");
        container.html('');
        for(var i=0;i<items.length;i++){
            //'<li><a data-module="dashboard" data-view="views/dashboard" href="#"><i class="fa fa-dashboard fa-fw"></i> 控制台</a></li>';
            //<a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 微信统计<span class="fa arrow"></span></a>
            var item_container =  $('<li>');
            if(items[i].view &&items[i].view != ''){
            var line = '<a data-module="'+items[i].id+'" data-view="'+items[i].view+'" href="#"><i class="fa '+items[i].icon+' fa-fw"></i> '+items[i].text+'</a>';
            }else{
                var line = '<a href="#"><i class="fa '+items[i].icon+' fa-fw"></i> '+items[i].text+'<span class="fa arrow"></span></a>';
            }
            item_container.append(line);
            if(items[i].nodes && items[i].nodes.length > 0){
                var sub_container = $('<ul class="nav nav-second-level">');
                for(var j=0;j<items[i].nodes.length;j++){
                    var sub_item = items[i].nodes[j];
                    sub_container.append('<li><a data-module="'+sub_item.id+'" data-view="'+sub_item.view+'" href="#"> '+sub_item.text+'</a></li>');
                }
                item_container.append(sub_container);
            }
            container.append(item_container);
        }
        
        renderMenu();
        
        var options = {
            menuItems : $("#side-menu li a"),
            container : $("#mtTempMain")
        };
        var admin = new mt.AdminFramework(options);
    });


});
