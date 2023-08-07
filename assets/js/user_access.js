var userAccessList = function() {
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-createAccess").unbind("click").on("click", function(){
    // console.log("clicked")
    window.location.href = 'http://localhost/ams/userAccessCreate';
    })
    __executeExternalGet('8088/permission?page=0&size=300&name').done(function (result) {
    if (result.status != "ERROR") {
        result.content.forEach(function (data){
            // console.log(data)
            var actions;
                actions = "<button class='btn btn-info btn_update userAccessupdate' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove userAccessremove' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button>";
                $('.userAccessListTable').append("<tr>"+
                    "<td></td>"+
                    "<td>"+data.name+"</td>"+
                    "<td>"+data.type+"</td>"+
                    "<td>"+data.detail+"</td>"+
                    "<td class='actions'> "+actions+"</td>"+
                    "</tr>")
                });
            $(document).ready(function () {

                $('.userAccessListTable tbody tr').each(function (idx) {
                   $(this).children("td:eq(0)").html(idx + 1);
                });

                    var table = $('.userAccessListTable').DataTable({
                        scrollX: true,
                        // ... other DataTable options ...
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
            });

            $(".btn_update").unbind("click").on("click", function(){
                // console.log("clicked")
                var permissionId   = $(this).data("id");
                // console.log(permissionId)
                window.location.href = 'http://localhost/ams/userAccessUpdate?permissionId='+permissionId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var permissionId   = $(this).data("id");
                // console.log(permissionId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('8088/permission/remove/'+permissionId).done(function (result) {
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

var userAccessCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

$(".btn_create").unbind("click").on("click", function(){
    // console.log("clicked")
    var required = ["moduleName", "moduleType", "moduleDetails"];
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
              "id"              : "",
              "createdBy"       : "",
              "createdDate"     : "",
              "updatedBy"       : "",
              "updatedDate"     : "",
              "name"            : $(".moduleName").val(),
              "type"            : $(".moduleType").val(),
              "detail"          : $(".moduleDetails").val(),
              "parentId"        : "",
              "value"           : true
            }
            console.log(payload)
            __executeExternalPost('8088/permission/create',JSON.stringify(payload)).done(function (result) {
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

var userAccessUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var permissionId = GetURLParameter('permissionId');
// console.log(permissionId);

    var fields = ["moduleNameUpdate", "moduleDetailsUpdate", "moduleTypeUpdate"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                // if (fieldName === "departmentUpdate" || fieldName === "user_rolesUpdate") {
                //     elements[i].disabled = true;
                // } else {
                    elements[i].setAttribute("readonly", true); 
                // }
            }
    });

    $(".btn-edit").unbind("click").on("click", function(){
        fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "departmentUpdate" || fieldName === "user_rolesUpdate") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });

        $(".btn-edit").hide();
        $(".btn-update").show();
    })

__executeExternalGet('8088/permission/'+permissionId).done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        $(".moduleNameUpdate").val(result.name);
        $(".moduleDetailsUpdate").val(result.detail);
        $(".moduleTypeUpdate").val(result.type);
    }else
    {
        console.log("ERROR")
    }
})

$(".btn-update").unbind("click").on("click", function(){
    // console.log("clicked")

    var required = ["moduleNameUpdate", "moduleTypeUpdate", "moduleDetailsUpdate"];
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
              "id"              : "",
              "createdBy"       : "",
              "createdDate"     : "",
              "updatedBy"       : "",
              "updatedDate"     : "",
              "name"            : $(".moduleNameUpdate").val(),
              "type"            : $(".moduleTypeUpdate").val(),
              "detail"          : $(".moduleDetailsUpdate").val(),
              "parentId"        : "",
              "value"           : true
            }
            // console.log(payload)
            __executeExternalPost('8088/permission/update/'+permissionId,JSON.stringify(payload)).done(function (result) {
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


