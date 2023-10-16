// localStorage.removeItem('anyhost');

// const hostname    = window.location.hostname;
// const anyhost     = 'http://'+hostname+'';
const anyhost     = 'http://192.168.1.37';
// const anyhost     = 'http://localhost';
// const rmm_server  = '8090';
// const uam         = '8088';
// const docrepo     = '8080';

var ___ctx = anyhost;
console.log(___ctx)

var __setContext = function(newctx) {
    ___ctx = newctx;
};

var __getContext = function() {
    return ___ctx;
};

var __executeExternalPost = function(path, jsonObj, customLoader) {
    path = __getContext() + path;
    var d = $.Deferred();
    if(customLoader != ""){
        $("#"+customLoader).show();
        $("#"+customLoader).removeClass("hide");
    }
    $.ajax({
        method: "POST",
        url: path,
        dataType: "json",
        headers: {
            // 'Content-Type': 'multipart/form-data;'
            'Content-Type':'application/json'
        },
        data: jsonObj
    }).done(function (data, textStatus, jqXHR) {
        if(customLoader != ""){
            $("#"+customLoader).hide();
            $("#"+customLoader).addClass("hide");
        }
        d.resolve(data)
    }).fail(function (jqXHR, textStatus, errorThrown,request) {
        console.log('---FAILED---');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log('---FAILED---');
        
        d.resolve({
            status : 'ERROR',
            message : request
        });
        
        if(customLoader != ""){
            $("#"+customLoader).hide();
            $("#"+customLoader).addClass("hide");
        }
    });
    
    return d.promise();
};
var __executeExternalGet = function(path, customLoader) {
    path = __getContext() + path;
    var d = $.Deferred();
    if(customLoader != ""){
        $("#"+customLoader).show();
        $("#"+customLoader).removeClass("hide");
    }
    $.ajax({
        method: "GET",
        url: path,
        dataType: "json",
    }).done(function (data, textStatus, jqXHR) {
        if(customLoader != ""){
            $("#"+customLoader).hide();
            $("#"+customLoader).addClass("hide");
        }
        d.resolve(data)
    }).fail(function (jqXHR, textStatus, errorThrown,request) {
        console.log('---FAILED---');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log('---FAILED---');
        
        d.resolve({
            status : 'ERROR',
            message : request
        });
        
        if(customLoader != ""){
            $("#"+customLoader).hide();
            $("#"+customLoader).addClass("hide");
        }
    });
    
    return d.promise();
};


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
