var list = function() {
    var vendorId = GetURLParameter('vendorId');
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-create").unbind("click").on("click", function(){
    // console.log("clicked")
    sessionStorage.setItem('vendorId', vendorId);
    window.location.href = 'http://localhost/ams/add_contact';
    })

    __executeExternalGet('3000/vendor/contact/list/'+vendorId).done(function (result) {
    if (result.status != "ERROR") {
        console.log(result)
        result.response.forEach(function(data){
            // console.log(data)
            let actions = "<button class='btn btn-info btn_update' type='submit' data-id='"+data.id+"'><i class='feather feather feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove' type='submit' data-id='"+data.id+"'><i class='feather icon-x-square'></i> Remove</button>";
                var name = data.firstName + " " + data.middleName + " " + data.lastName + " " + data.suffix;
                $('.table_head').append("<tr>"+
                    "<td></td>"+
                    "<td>"+name+"</td>"+
                    "<td>"+data.phoneNumber+"</td>"+
                    "<td>"+data.email+"</td>"+
                    "<td>"+data.position+"</td>"+
                    "<td class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                $('.table_head tbody tr').each(function (idx) {
                   $(this).children("td:eq(0)").html(idx + 1);
                });
                    var table = $('.table_head').DataTable({
                        scrollX: true,
                        // order: [[0, 'asc']],
                        // "columnDefs": [
                        //     { "width": "30%", "targets": 7 }
                        // ]
                        drawCallback: function (settings) {
                            var data = JSON.parse(localStorage.getItem('permission'));
                            // console.log(permission);
                            if (data != null) {
                                data.forEach(function(data){
                                    if (data.type == "ACTION") {
                                        // console.log(data.value)
                                        setTimeout(function() {
                                            if (!data.value) {
                                                var element = $('.' + data.detail);
                                                element.hide();
                                            }else{
                                                var element = $('.' + data.detail);
                                                element.show();
                                            }
                                        }, 1000);
                                    }else if (data.type == "VIEW") {
                                        if (!data.value) {
                                            var element = $('.' + data.detail);
                                            element.hide();
                                        }else{
                                            var element = $('.' + data.detail);
                                            element.show();
                                        }
                                    }else{
                                    }
                                });
                            }
                        }
                    });
                    // $('.dataTables_length').addClass('bs-select');
            });
            $(".btn_update").unbind("click").on("click", function(){
                // console.log("clicked")
                var contactId = $(this).data("id");
                console.log(contactId)
                window.location.href = 'http://localhost/ams/update_contact?contactId='+contactId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var vendorId   = $(this).data("id");
                // console.log(vendorId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('3000/vendor/contact/remove/'+vendorId).done(function (result) {
                        if (result.status != "ERROR") {
                                $('#success_remove').show();
                                    setTimeout(function () {
                                        $('#removeModal').modal('hide');
                                        $('#success_remove').hide();
                                        // __table();
                                        
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 500);
                                    }, 1000);
                                
                            // $(".form-control").val('');
                            // $('#removeModal').modal('hide');
                            // __table();
                        }else{
                            alert("failed")
                        }
                    })
                })
            })
    }else
    {
        console.log("ERROR")
    }
    })
}

var create = function() {

    var vendorId = sessionStorage.getItem('vendorId');

    var __vendor = function(){
        $('.vendorId').empty();
        __executeExternalGet('3000/vendor/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.vendorId').append("<option selected disabled> - - Select - - </option>");
                result.response.forEach(function(data){
                    // var data = data.product;
                    $('.vendorId').append(
                        "<option value="+data.id+" data-id="+data.id+" data-name="+data.name+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    __vendor();

    setTimeout(function(){
        $(".vendorId").val(vendorId).trigger("change");
    }, 500);



$(".btn_create").unbind("click").on("click", function(){
    // console.log("clicked")

    var required = ["firstName", "middleName", "lastName", "vendorId", "position", "email", "phoneNumber"];
        $(".errorRequired").remove()

        required.forEach(function(data){
            if($("."+data).val() == "" || $("."+data).val() == null){
                $("."+data).addClass("error_field");
                $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter(("."+data))

            }else{
                $("."+data).removeClass("error_field");
            }
        });

        var requiredFields = $('.errorRequired:visible').length;
        console.log('Number of required fields: ' + requiredFields);

        if (requiredFields === 0) {
            var payload = {
                "vendorId"      : $(".vendorId").val(),
                "firstName"     : $(".firstName").val(),
                "middleName"    : $(".middleName").val(),
                "lastName"      : $(".lastName").val(),
                "suffix"        : $(".suffix").val(),
                "position"      : $(".position").val(),
                "phoneNumber"   : $(".phoneNumber").val(),
                "email"         : $(".email").val(),
                "id"            : "",
                "createdBy"     : "",
                "createdDate"   : "",
                "updatedBy"     : "",
                "updatedDate"   : "",
                "status"        : true
            }
                console.log(payload)
                __executeExternalPost('3000/vendor/contact/new',JSON.stringify(payload)).done(function (result) {
                    // console.log(result);
                    if (result.status != "ERROR") {
                        // $(".createForm").val('');
                        $('#success').show();
                        setTimeout(function () {
                            $('#success').hide();
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                        }, 2000);
                    }else{
                        alert("failed")
                        $('#error').show();
                        setTimeout(function () {
                            $('#error').hide();
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                        }, 2000);
                    }
                })
            }
    })
    
}

var update = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

    var contactId = GetURLParameter('contactId');
    // console.log(contactId);

    var fields = ["firstName", "middleName", "lastName", "suffix", "vendorId", "position", "email", "phoneNumber"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "vendorId") {
                    elements[i].disabled = true;
                } else {
                    elements[i].setAttribute("readonly", true); 
                }
            }
    });

    $(".btn-edit").unbind("click").on("click", function(){
        fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "vendorId") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });

        $(".btn-edit").hide();
        $(".btn-update").show();
    })

    var __vendor = function(){
        $('.vendorId').empty();
        __executeExternalGet('3000/vendor/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.vendorId').append("<option selected disabled> - - Select - - </option>");
                result.response.forEach(function(data){
                    // var data = data.product;
                    $('.vendorId').append(
                        "<option value="+data.id+" data-id="+data.id+" data-name="+data.name+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    __vendor();

__executeExternalGet('3000/vendor/contact/'+contactId).done(function (result) {

    if (result.status != "ERROR") {
        var result = result.response;
        console.log(result);

        $(".firstName").val(result.firstName);
        $(".lastName").val(result.lastName);
        $(".middleName").val(result.middleName);
        $(".suffix").val(result.suffix);
        setTimeout(function(){
            $(".vendorId").val(result.vendorId).trigger("change");
        }, 500);
        $(".position").val(result.position);
        $(".phoneNumber").val(result.phoneNumber);
        $(".email").val(result.email);
    }else
    {
        console.log("ERROR")
    }
})

$(".btn-update").unbind("click").on("click", function(){
    // console.log("clicked")
    var required = ["firstName", "middleName", "lastName", "vendorId", "position", "email", "phoneNumber"];
        $(".errorRequired").remove()

        required.forEach(function(data){
            if($("."+data).val() == "" || $("."+data).val() == null){
                $("."+data).addClass("error_field");
                $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter(("."+data))

            }else{
                $("."+data).removeClass("error_field");
            }
        });

        var requiredFields = $('.errorRequired:visible').length;
        console.log('Number of required fields: ' + requiredFields);

        if (requiredFields === 0) {
            var payload = {
                "vendorId"      : $(".vendorId").val(),
                "firstName"     : $(".firstName").val(),
                "middleName"    : $(".middleName").val(),
                "lastName"      : $(".lastName").val(),
                "suffix"        : $(".suffix").val(),
                "position"      : $(".position").val(),
                "phoneNumber"   : $(".phoneNumber").val(),
                "email"         : $(".email").val(),
                "id"            : "",
                "createdBy"     : "",
                "createdDate"   : "",
                "updatedBy"     : "",
                "updatedDate"   : "",
                "status"        : true
            }
            console.log(payload)
            __executeExternalPost('3000/vendor/contact/edit/'+contactId,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    // $(".createForm").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 500);
                    }, 2000);
                }else{
                    alert("failed")
                    $('#error').show();
                        setTimeout(function () {
                            $('#error').hide();
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                        }, 2000);
                }
            })
        }
})
    
}


