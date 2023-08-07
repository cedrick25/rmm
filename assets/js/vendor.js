var vendorList = function() {
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-create").unbind("click").on("click", function(){
    // console.log("clicked")
    window.location.href = 'http://localhost/ams/vendor_create';
    })
    __executeExternalGet('3000/vendor/list/0/500').done(function (result) {
    if (result.status != "ERROR") {
        console.log(result)
        result.response.content.forEach(function(data){
            // console.log(data)
            let actions = "<button class='btn btn-info btn_update viewVendor' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove removeVendor' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button> <button class='btn btn-info btn_addContact addContactvendor' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-user-plus'></i> Add contact</button>";
                $('.table_head').append("<tr>"+
                    "<td></td>"+
                    "<td>"+data.name+"</td>"+
                    "<td>"+data.phoneNumber+"</td>"+
                    "<td>"+data.email+"</td>"+
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
                var vendorId = $(this).data("id");
                console.log(vendorId)
                window.location.href = 'http://localhost/ams/vendor_update?vendorId='+vendorId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var vendorId   = $(this).data("id");
                // console.log(vendorId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('3000/vendor/remove/'+vendorId).done(function (result) {
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
            $(".btn_addContact").unbind("click").on("click", function(){
                // console.log("clicked")
                var vendorId = $(this).data("id");
                console.log(vendorId)
                window.location.href = 'http://localhost/ams/vendorPointofContact?vendorId='+vendorId;
            })
    }else
    {
        console.log("ERROR")
    }
    })
}

var vendorCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

$(".btn_create").unbind("click").on("click", function(){
    // console.log("clicked")

    var required = ["vendorName", "vendorDescription", "vendorNumber", "vendorEmail"];
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
                "name"          : $(".vendorName").val(),
                "description"   : $(".vendorDescription").val(),
                "phoneNumber"   : $(".vendorNumber").val(),
                "email"         : $(".vendorEmail").val(),
                "id"            : "",
                "createdBy"     : "",
                "createdDate"   : "",
                "updatedBy"     : "",
                "updatedDate"   : "",
                "status"        : true
            }
                console.log(payload)
                __executeExternalPost('3000/vendor/new',JSON.stringify(payload)).done(function (result) {
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

var vendorUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var vendorId = GetURLParameter('vendorId');
// console.log(vendorId);

    var fields = ["vendorNameUpdate", "vendorDescriptionUpdate", "vendorEmailUpdate", "vendorNumberUpdate"];
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

__executeExternalGet('3000/vendor/'+vendorId).done(function (result) {

    if (result.status != "ERROR") {
        var result = result.response;
        console.log(result);

        $(".vendorNameUpdate").val(result.name);
        $(".vendorDescriptionUpdate").val(result.description);
        $(".vendorEmailUpdate").val(result.email);
        $(".vendorNumberUpdate").val(result.phoneNumber);
    }else
    {
        console.log("ERROR")
    }
})

$(".btn-update").unbind("click").on("click", function(){
    // console.log("clicked")
    var required = ["vendorNameUpdate", "vendorDescriptionUpdate", "vendorNumberUpdate", "vendorEmailUpdate"];
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
                "name"          : $(".vendorNameUpdate").val(),
                "description"   : $(".vendorDescriptionUpdate").val(),
                "phoneNumber"   : $(".vendorNumberUpdate").val(),
                "email"         : $(".vendorEmailUpdate").val(),
                "id"            : "",
                "createdBy"     : "",
                "createdDate"   : "",
                "updatedBy"     : "",
                "updatedDate"   : "",
                "status"        : true
            }
            // console.log(payload)
            __executeExternalPost('3000/vendor/edit/'+vendorId,JSON.stringify(payload)).done(function (result) {
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


