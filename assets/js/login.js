var login = function(){

    $(".btn-confirm").unbind("click").on("click", function(){
        $(".btn-confirm").prop("disabled", true);
        $('.prompt').html('');
        var email_username = $(".email_username").val();
        var password       = $(".password").val();

        var payload = {
            encoded     : false,
            username    : email_username,
            password    : password
        }
        // console.log(payload);
        __executeExternalPost(uam+'/authenticate',JSON.stringify(payload)).done(function (result) {
            console.log(result);
            $(".btn-confirm").prop("disabled", false);
            if (result.status != "ERROR") {
                if (result.authenticated == true) {
                    console.log('authenticated = true')
                    if (result.isLocked != true) {
                        console.log("not lock")
                        $('.prompt').html('<div class="alert alert-dark-success alert-dismissible" role="alert"> <i class="fa fa-check-circle"></i> Login Successfully </div>');
                        var uuid = result.uuid
                        $.cookie("uuid", uuid);
                        
                        setTimeout(function () {
                            window.location.href="dashboard"
                        },1000);
                    } else {
                        $('#prompt').html('<div class="alert alert-dark-danger alert-dismissible" role="alert"> <i class="fa exclamation-circle"></i> This account is locked!</div>')
                        // console.log("this account is locked")
                    }
                } else {
                    // console.log('no data found,inactive or removed')
                        $('#prompt').html('<div class="alert alert-dark-danger alert-dismissible" role="alert"> <i class="fa fa-exclamation-circle"></i> No record found,inactive or removed! </div>')
                    if (result.failedAttemptsCount == 4) {
                        $('#prompt').html('<div class="alert alert-dark-danger alert-dismissible" role="alert"> <i class="fa fa-exclamation-circle""></i> Attempt 4, last failed attempt your account will be locked! </div>')
                        // console.log("attempt 4, last failed attempt your account will be locked")
                    }else if(result.failedAttemptsCount >= 5){
                        $('#prompt').html('<div class="alert alert-dark-danger alert-dismissible" role="alert"> <i class="fa fa-exclamation-circle""></i> Your account is locked now! </div>')
                        // console.log("your account is locked now")
                    }else if(result.failedAttemptsCount != null){
                        $('#prompt').html('<div class="alert alert-dark-danger alert-dismissible" role="alert"> <i class="fa fa-exclamation-circle"></i>'+' Your failed attempt is ' + result.failedAttemptsCount + '</div>')
                        // console.log("Your failed attempt is " +result.failedAttemptsCount)
                    }
                }
            }
        })
    })

    $(".email_username,.password").keyup(function(event){
        if(event.keyCode == 13){
            $(".btn-confirm").click();
        }
    });
}