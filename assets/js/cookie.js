var cookie = function(){
    if ($.cookie("uuid") != undefined) {
        __executeExternalGet(uam+'/user/'+$.cookie("uuid")).done(function (result) {
            if (result.status != "ERROR") {
                console.log("====this is user logged in=====");
                console.log(result);
                console.log("====this is user logged in=====");
                $(".user_name").text(result.username);
                $.cookie("roleId", result.roleId);
                $.cookie("departmentId", result.departmentId);
                $.cookie("departmentName", result.departmentName);
                $.cookie("name", result.firstName+" "+result.middleName+" "+result.lastName+" "+result.suffix);

            }
        })
    } else {
        console.log("no user logged in");
        alert("You are not currently logged in. Please log in to access this page.");
        window.location.href = 'http://localhost/ams';
    }
}