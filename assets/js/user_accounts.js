
var user_list = function() {
    console.log("user list checker")

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        __executeExternalGet('8088/user?page=0&size=500').done(function (result){
        // __executeExternalGet('8088/user/list').done(function (result) {
            // console.log("=====user=====")
            // console.log(result)
            // console.log("=====user=====")

            if (result.status != "ERROR") {
                var result = result.content;
                result.forEach(function(data){
                    console.log(data);
                    var status;
                    let actions;
                    
                    switch (data.accountStatus) {
                    case "ACTIVE":
                            switch (data.isLocked) {
                            case true:
                                status = "RESTRICTED"
                                actions = "<button class='btn btn-sm btn-success btn_lift userLift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-unlock'></i> Lift</button>";
                                break;
                            case false:
                                status = "ACTIVE"
                                actions = "<button class='btn btn-sm btn-primary btn_update viewUser' type='submit' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-refresh'></i> View</button> <button class='btn btn-sm btn-success btn_activate userActivate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-sm btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-danger btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-success btn_lift userLift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-unlock'></i> Lift</button>";
                                break;
                            default:
                                status = "ACTIVE"
                                actions = "<button class='btn btn-sm btn-primary btn_update viewUser' type='submit' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-refresh'></i> View</button> <button class='btn btn-sm btn-success btn_activate userActivate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-sm btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-danger btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-success btn_lift userLift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-unlock'></i> Lift</button>";
                                break;
                            };
                        break;
                    case "INACTIVE":
                        status = "INACTIVE"
                        actions = "<button class='btn btn-sm btn-success btn_activate userActivate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-check'></i> Activate</button> <button class='btn btn-sm btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-remove'></i> Remove</button>";
                        break;
                    case "REMOVED":
                        status = "REMOVED"
                        actions = "";
                        break;
                    default:
                        status = "ACTIVE"
                        actions = "<button class='btn btn-sm btn-primary btn_update viewUser' type='submit' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-refresh'></i> View</button> <button class='btn btn-sm btn-success btn_activate userActivate' type='submit' data-toggle='modal' data-target='#activateModal' data-id='"+data.uuid+"'><i class='fa fa-check' style='display:none'></i> Activate</button> <button class='btn btn-sm btn-danger btn_deact userDeactivate' type='submit' data-toggle='modal' data-target='#deactivateModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-ban'></i> Deactivate</button> <button class='btn btn-sm btn-danger btn_remove removeUser' type='submit' data-toggle='modal' data-target='#removeModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-remove'></i> Remove</button> <button class='btn btn-sm btn-danger btn_restrict userRestrict' type='submit' data-toggle='modal' data-target='#restrictModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-lock'></i> Restrict</button> <button class='btn btn-sm btn-success btn_lift userLift' type='submit' data-toggle='modal' data-target='#liftModal' data-id='"+data.uuid+"' style='display:none'><i class='fa fa-unlock'></i> Lift</button>";
                        break;
                    };                                
                    $('.table_body').append("<tr>"+
                        "<td></td>"+
                        "<td>"+data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix+"</td>"+
                        "<td>"+data.username+"</td>"+
                        "<td>"+data.email+"</td>"+
                        "<td value="+data.roleId+">"+data.roleName+"</td>"+
                        "<td>"+data.departmentName+"</td>"+
                        "<td>"+data.managerName+"</td>"+
                        "<td>"+status+"</td>"+
                        "<td align='center' class='actions'> "+actions+"")
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
                    var userId = $(this).data("id");
                    // console.log(data_id)
                    window.location.href = '/ams/user_update?userId='+userId;
                });
                $(".btn_activate").unbind("click").on("click", function(){
                    var data_id     = $(this).data("id");

                    $(".btn_activate_confirm").unbind("click").on("click", function(){

                        __executeExternalPost('8088/user/active/'+data_id).done(function (result) {
                            if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_activated').show();
                                    setTimeout(function () {
                                        $('#activateModal').modal('hide');
                                        $('#success_activated').hide();
                                        // __table();
                                        
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 500);
                                    }, 2000);
                            }else{
                                alert("failed")
                            }
                        })

                    })
                })
                $(".btn_deact").unbind("click").on("click", function(){
                    var data_id     = $(this).data("id");

                    $(".btn_deactivate_confirm").unbind("click").on("click", function(){

                        __executeExternalPost('8088/user/inactive/'+data_id).done(function (result) {
                            if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_deactivate').show();
                                    setTimeout(function () {
                                        $('#deactivateModal').modal('hide');
                                        $('#success_deactivate').hide();
                                        // __table();
                                        
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 500);
                                    }, 2000);
                            }else{
                                alert("failed")
                            }
                        })

                    })
                })
                $(".btn_restrict").unbind("click").on("click", function(){
                    var data_id     = $(this).data("id");

                    $(".btn_restrict_confirm").unbind("click").on("click", function(){

                        __executeExternalPost('8088/user/restrict/'+data_id).done(function (result) {
                            if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_restrict').show();
                                    setTimeout(function () {
                                        $('#restrictModal').modal('hide');
                                        $('#success_restrict').hide();
                                        // __table();

                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 500);
                                    }, 2000);
                                
                                // $(".form-control").val('');
                                // $('#restrictModal').modal('hide');
                                // __table();
                            }else{
                                alert("failed")
                            }
                        })

                    })
                })
                $(".btn_remove").unbind("click").on("click", function(){
                    var data_id     = $(this).data("id");

                    $(".btn_remove_confirm").unbind("click").on("click", function(){

                        __executeExternalPost('8088/user/remove/'+data_id).done(function (result) {
                            if (result.status != "ERROR") {
                                $(".form-control").val('');
                                $('#success_remove').show();
                                    setTimeout(function () {
                                        $('#removeModal').modal('hide');
                                        $('#success_remove').hide();
                                        // __table();
                                        
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 500);
                                    }, 2000);
                                
                                // $(".form-control").val('');
                                // $('#removeModal').modal('hide');
                                // __table();
                            }else{
                                alert("failed")
                            }
                        })
                    })
                })
                $(".btn_lift").unbind("click").on("click", function(){
                        var data_id     = $(this).data("id");
                        console.log(data_id)
                        $(".btn_lift_confirm").unbind("click").on("click", function(){

                            __executeExternalPost('8088/user/lift/'+data_id).done(function (result) {
                                if (result.status != "ERROR") {
                                    $(".form-control").val('');
                                    $('#success_lift').show();
                                        setTimeout(function () {
                                            $('#liftModal').modal('hide');
                                            $('#success_lift').hide();
                                            // __table();
                                            
                                            setTimeout(function () {
                                                window.location.reload(true);
                                            }, 500);
                                        }, 2000);
                                        
                                    // $(".form-control").val('');
                                    // $('#liftModal').modal('hide');
                                    // __table();
                                }else{
                                    alert("failed")
                                }
                            })

                        })
                    })
            }
        })
    }
    __table();
}

var user_create = function() {
    console.log("user create checker")

    var checkbox = document.getElementsByClassName("middleNameCheck")[0];
        checkbox.addEventListener("change", toggleCheckbox);
        var inputBoxMiddleName = document.getElementsByClassName("middleName")[0];

        function toggleCheckbox() {
            if (checkbox.checked) {
                // console.log("The checkbox is checked.");
                inputBoxMiddleName.disabled = true;
                inputBoxMiddleName.placeholder = "N/A";
                inputBoxMiddleName.value = "";
            } else {
                // console.log("The checkbox is not checked.");
                inputBoxMiddleName.disabled = false;
                inputBoxMiddleName.placeholder = "Cruz";
            }
        }
    checkbox.checked = false;

    var checkbox2 = document.getElementsByClassName("suffixCheck")[0];
        checkbox2.addEventListener("change", toggleCheckbox2);
        var inputBoxSuffix = document.getElementsByClassName("suffix")[0];

        function toggleCheckbox2() {
            if (checkbox2.checked) {
                // console.log("The checkbox is checked.");
                inputBoxSuffix.disabled = true;
                inputBoxSuffix.placeholder = "N/A";
                inputBoxSuffix.value = "";
            } else {
                // console.log("The checkbox is not checked.");
                inputBoxSuffix.disabled = false;
                inputBoxSuffix.placeholder = "Doe";
            }
        }
    checkbox2.checked = false;

    var __select = function(){
        $('.department').empty();

        $('.department').append("<option selected disabled> - - Select Department - - </option>");
        __executeExternalGet('8088/department/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    $('.department').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching department list")
            }
        })
    }
    __select();

    var __select_user_roles = function(){
        $('.user_roles').empty();

        $('.user_roles').append("<option selected disabled> - - Select User Roles - - </option>");
        __executeExternalGet('8088/role/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    $('.user_roles').append(
                        "<option value="+data.id+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching User Roles list")
            }
        })
    }
    __select_user_roles();

    $(".btn-confirm").unbind("click").on("click", function(){
            console.log('clicked')
            var required = ["firstName", "lastName", "username", "password", "department", "user_roles", "email", "birthday"];
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
                console.log("test")
                var payload = {
                        "updatedBy"     : "",
                        "updatedDate"   : "",
                        "firstName"     : $(".firstName").val(),
                        "middleName"    : $(".middleName").val(),
                        "lastName"      : $(".lastName").val(),
                        "suffix"        : $(".suffix").val(),
                        "corpKey"       : "",
                        "username"      : $(".username").val(),
                        "email"         : $(".email").val(),
                        "phoneNumber"   : $(".contactNo").val(),
                        "birthday"      : $(".birthday").val(),
                        "password"      : $(".password").val(),
                        "departmentId"  : $(".department").val(),
                        "roleId"        : $(".user_roles").val(),
                    }
                console.log(payload);
                __executeExternalPost('8088/user/create',JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        $(".form-control").val('');
                        $('#success').show();
                        setTimeout(function () {
                            $('#success').hide();
                                                    
                                setTimeout(function () {
                                    window.location.reload(true);
                                }, 500);
                        }, 2000);
                    }else{
                        console.log(result.status);
                        // alert(result.message)
                    }
                })
            }
        })
}

var user_update = function() {

    var userId = GetURLParameter('userId');
    // console.log(userId)

    var __select = function(){
        $('.departmentUpdate').empty();

        $('.departmentUpdate').append("<option selected disabled> - - Select Department - - </option>");
        __executeExternalGet('8088/department/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    $('.departmentUpdate').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching department list")
            }
        })
    }
    __select();

    var __select_user_roles = function(){
        $('.user_rolesUpdate').empty();

        $('.user_rolesUpdate').append("<option selected disabled> - - Select User Roles - - </option>");
        __executeExternalGet('8088/role/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    $('.user_rolesUpdate').append(
                        "<option value="+data.id+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching User list")
            }
        })
    }
    __select_user_roles();

    var __manager = function(){
        $('.assignManager').empty();

        $('.assignManager').append("<option selected disabled> - - Select Manager - - </option>");
        __executeExternalGet('8088/user/list').done(function (result) {
            console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    var name = data.firstName+" "+data.middleName+" "+data.lastName+" "+data.suffix;
                    $('.assignManager').append(
                        "<option value="+data.uuid+">"+name+"</option>");
                });
            } else {
                console.log("failed fetching department list")
            }
        })
    }
    __manager();

    var fields = ["firstNameUpdate", "middleNameUpdate", "lastNameUpdate", "suffixNameUpdate","usernameUpdate", "emailUpdate", "contactNoUpdate", "birthdayUpdate", "passwordUpdate", "departmentUpdate", "user_rolesUpdate", "assignManager"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "departmentUpdate" || fieldName === "user_rolesUpdate" || fieldName === "assignManager") {
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
                if (fieldName === "departmentUpdate" || fieldName === "user_rolesUpdate" || fieldName === "assignManager") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });

        $(".btn-edit").hide();
        $(".btn_update").show();
    })

    __executeExternalGet('8088/user/'+userId).done(function (result) {
        // console.log(result);
        if (result.status != "ERROR") {
            $(".firstNameUpdate").val(result.firstName);
            $(".middleNameUpdate").val(result.middleName);
            $(".lastNameUpdate").val(result.lastName);
            $(".suffixNameUpdate").val(result.suffix);
            $(".usernameUpdate").val(result.username);
            $(".emailUpdate").val(result.email);
            $(".contactNoUpdate").val(result.phoneNumber);
            $(".birthdayUpdate").val(result.birthday);
            $(".passwordUpdate").val(result.password);
            setTimeout(function() {
                $(".departmentUpdate").val(result.departmentId).trigger('change');
                $(".user_rolesUpdate").val(result.roleId).trigger('change');
            },1500);
            // console.log(result.departmentId);

            var checkboxUpdate = document.getElementsByClassName("middleNameCheckUpdate")[0];
            checkboxUpdate.addEventListener("change", toggleCheckboxUpdate);
            var inputBoxMiddleNameUpdate = document.getElementsByClassName("middleNameUpdate")[0];

            function toggleCheckboxUpdate() {
                if (checkboxUpdate.checked) {
                    // console.log("The checkbox is checked.");
                    inputBoxMiddleNameUpdate.disabled = true;
                    inputBoxMiddleNameUpdate.placeholder = "N/A";
                    inputBoxMiddleNameUpdate.value = "";
                } else {
                    // console.log("The checkbox is not checked.");
                    inputBoxMiddleNameUpdate.disabled = false;
                    inputBoxMiddleNameUpdate.value = result.middleName;
                }
            }
            checkboxUpdate.checked = false;

            $(".btn_update").unbind("click").on("click", function(){
                // console.log('clicked')
                var payload = {
                    "firstName"     : $(".firstNameUpdate").val(),
                    "middleName"    : $(".middleNameUpdate").val(),
                    "lastName"      : $(".lastNameUpdate").val(),
                    "suffix"        : $(".suffixNameUpdate").val(),
                    "corpKey"       : "",
                    "username"      : $(".usernameUpdate").val(),
                    "email"         : $(".emailUpdate").val(),
                    "phoneNumber"   : $(".contactNoUpdate").val(),
                    "birthday"      : $(".birthdayUpdate").val(),
                    "password"      : $(".passwordUpdate").val(),
                    "departmentId"  : $(".departmentUpdate").val(),
                    "roleId"        : $(".user_rolesUpdate").val(),
                    "managerId"     : $(".assignManager").val(),
                }
                // console.log(payload)
                // console.log(userId)
                __executeExternalPost('8088/user/update/'+userId,JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                    // $(".form-control").val('');
                    $('#success').show();
                        setTimeout(function () {
                            // $('#updateUserModal').modal('hide');
                            $('#success').hide();
                            // __table();

                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                        }, 1000);
                    }else{
                        alert("failed")
                    }
                })
            })
        }else{
            alert("failed")
        }
    })
}

