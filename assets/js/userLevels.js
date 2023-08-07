var userLevelsList = function() {
    // console.log(___ctx)
    // console.log("testList");

$(".btn-addPosition").unbind("click").on("click", function(){
// console.log("clicked")
window.location.href = 'http://localhost/ams/userLevelsCreate';
})

__executeExternalGet('8088/role?page=0&size=300&name').done(function (result) {

    if (result.status != "ERROR") {
            
        result.content.forEach(function(data){
            // console.log(data)
            let actions = "<button class='btn btn-info btn_update userLevelview' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather feather icon-eye'></i> View</button> <button class='btn btn-success btn_grant userLevelgrant' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-user-plus'></i> Grant</button> <button class='btn btn-info btn_updateGrant userLevelupdateGrant' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-user-plus'></i> Update Grant</button> <button class='btn btn-danger btn_remove userLevelremove' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button>";
                $('.userLevelsListTable').append("<tr>"+
                    "<td></td>"+
                    "<td>"+data.name+"</td>"+
                    "<td>"+data.description+"</td>"+
                    "<td class='actions'> "+actions+"")
                });
            $(document).ready(function () {
                $('.userLevelsListTable tbody tr').each(function (idx) {
                   $(this).children("td:eq(0)").html(idx + 1);
                });
                    var table = $('.userLevelsListTable').DataTable({
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
                var positionId   = $(this).data("id");
                // console.log(positionId)
                window.location.href = 'http://localhost/ams/userLevelsUpdate?positionId='+positionId;
            })
            $(".btn_grant").unbind("click").on("click", function(){
                // console.log("clicked")
                var positionId   = $(this).data("id");
                // console.log(permissionId)
                window.location.href = 'http://localhost/ams/userGrant?positionId='+positionId;
            })
            $(".btn_updateGrant").unbind("click").on("click", function(){
                // console.log("clicked")
                var positionId   = $(this).data("id");
                // console.log(permissionId)
                window.location.href = 'http://localhost/ams/userGrantUpdate?positionId='+positionId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var positionId   = $(this).data("id");
                // console.log(permissionId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('8088/role/remove/'+positionId).done(function (result) {
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

var userLevelsCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

$(".btn_create").unbind("click").on("click", function(){
    // console.log("clicked")
    var required = ["positionName", "positionDescription"];
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
            "id"                    : "",
            "createdBy"             : "",
            "createdDate"           : "",
            "updatedBy"             : "",
            "updatedDate"           : "",
            "name"                  : $(".positionName").val(),
            "description"           : $(".positionDescription").val(),
            "parentId"              : "",
            "departmentId"          : ""
            }
            // console.log(payload)
            __executeExternalPost('8088/role/create',JSON.stringify(payload)).done(function (result) {
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

var userLevelsUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var positionId = GetURLParameter('positionId');
// console.log(positionId);

    var fields = ["positionNameUpdate", "positionDescriptionUpdate"];
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
__executeExternalGet('8088/role/'+positionId).done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        $(".positionNameUpdate").val(result.name);
        $(".positionDescriptionUpdate").val(result.description);
    }else
    {
        console.log("ERROR")
    }
})

$(".btn-update").unbind("click").on("click", function(){
    // console.log("clicked")
    var required = ["positionNameUpdate", "positionDescriptionUpdate"];
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
                "id"                : "",
                "createdBy"         : "",
                "createdDate"       : "",
                "updatedBy"         : "",
                "updatedDate"       : "",
                "name"              : $(".positionNameUpdate").val(),
                "description"       : $(".positionDescriptionUpdate").val(),
                "parentId"          : "",
                "departmentId"      : ""
            }
            // console.log(payload)
            __executeExternalPost('8088/role/update/'+positionId,JSON.stringify(payload)).done(function (result) {
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

var userGrant = function() {
    // console.log(___ctx)
    // console.log("testUpdate");


// console.log(permissionId);

__executeExternalGet('8088/permission/list').done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        result.forEach(function(data) {
        console.log(data)
        let actions = `<div class="form-check form-check-inline">
                        <label class="switch">
                            <input type="checkbox" name="type" class="form-check-input primary" checked data-name="${data.name}" value="${data.id}">
                            <span class="slider round"></span>
                        </label>
                        </div>`
        $('.permissionListTable').append("<tr>"+
            "<td></td>"+
            "<td>"+data.name+"</td>"+
            "<td class='actions'> "+actions+"")
        })
        // $(document).ready(function () {
        //     $('.permissionListTable tbody tr').each(function (idx) {
        //        $(this).children("td:eq(0)").html(idx + 1);
        //     });
        //         var table = $('.permissionListTable').DataTable({
        //             scrollX: true,
        //             // order: [[0, 'asc']],
        //             // "columnDefs": [
        //             //     { "width": "30%", "targets": 7 }
        //             // ]
        //         });
        //         // $('.dataTables_length').addClass('bs-select');
        // });
    }else
    {
        console.log("ERROR")
    }
})

$(".btn_grant").unbind("click").on("click", function(){
    // console.log("clicked")
    var positionId = GetURLParameter('positionId');
    // console.log(positionId)
    const grantPermissions = [];
    $("input:checkbox[name=type]:checked").each(function(){
        var list = {
            "id": $(this).val(),
            "value": true
        }
        grantPermissions.push(list);
    });
    $("input:checkbox[name=type]:not(:checked)").each(function(){
        var list = {
          "id": $(this).val(),
          "value": false,
        }
        grantPermissions.push(list);
    });

    var payload = {
        "roleId": positionId,
        "permissionList": grantPermissions
    }
    console.log(payload)
    __executeExternalPost('8088/role-permission/update',JSON.stringify(payload)).done(function (result) {
        console.log(result);
        if (result.status != "ERROR") {
            $('#success_grant').show();
            setTimeout(function () {
                $('#success_grant').hide();
                window.location.reload(true);
            }, 2000);
        }else{
            $('#error').show();
                setTimeout(function () {
                    $('#error').hide();
                    setTimeout(function () {
                        window.location.reload(true);
                    }, 500);
                }, 2000);
        }
    })   
})
    
}

var userGrantUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");
    var positionId = GetURLParameter('positionId');


__executeExternalGet('8088/role-permission/'+positionId).done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        result.permissionList.forEach(function(data) {
        // console.log(data)
        
        let value;
        switch (data.value) {
        case true:
            value = "checked";
            break;
        default:
            value = "";
            break;
        }

        let actions = `<div class="form-check form-check-inline">
                        <label class="switch">
                            <input type="checkbox" name="type" class="form-check-input primary" ${value} data-name="${data.name}" value="${data.id}">
                            <span class="slider round"></span>
                        </label>
                        </div>`
        $('.permissionListTable').append("<tr>"+
            "<td></td>"+
            "<td>"+data.name+"</td>"+
            "<td class='actions'> "+actions+"")
        })
        // $(document).ready(function () {
        //     $('.permissionListTable tbody tr').each(function (idx) {
        //        $(this).children("td:eq(0)").html(idx + 1);
        //     });
        //         var table = $('.permissionListTable').DataTable({
        //             scrollX: true,
        //             // order: [[0, 'asc']],
        //             // "columnDefs": [
        //             //     { "width": "30%", "targets": 7 }
        //             // ]
        //         });
        //         // $('.dataTables_length').addClass('bs-select');
        // });
    }else
    {
        console.log("ERROR")
    }
})

$(".btn_grantUpdate").unbind("click").on("click", function(){
    // console.log("clicked")
    var positionId = GetURLParameter('positionId');
    // console.log(positionId)
    const grantPermissions = [];
    $("input:checkbox[name=type]:checked").each(function(){
        var list = {
            "id": $(this).val(),
            "value": true
        }
        grantPermissions.push(list);
    });
    $("input:checkbox[name=type]:not(:checked)").each(function(){
        var list = {
          "id": $(this).val(),
          "value": false,
        }
        grantPermissions.push(list);
    });

    var payload = {
        "roleId": positionId,
        "permissionList": grantPermissions
    }
    console.log(payload)
    __executeExternalPost('8088/role-permission/update',JSON.stringify(payload)).done(function (result) {
        console.log(result);
        if (result.status != "ERROR") {
            $('#success_grant').show();
            setTimeout(function () {
                $('#success_grant').hide();
                window.location.reload(true);
            }, 2000);
        }else{
            $('#error').show();
                setTimeout(function () {
                    $('#error').hide();
                    setTimeout(function () {
                        window.location.reload(true);
                    }, 500);
                }, 2000);
        }
    })   
})
    
}