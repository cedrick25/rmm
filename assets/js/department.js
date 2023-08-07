var departmentList = function() {
    // console.log(___ctx)
    // console.log("testList");

$(".btn-addDepartment").unbind("click").on("click", function(){
// console.log("clicked")
window.location.href = 'http://localhost/ams/departments_create';
})

__executeExternalGet('8088/department/?page=0&size=300&name').done(function (result) {
// console.log(result)
    if (result.status != "ERROR") {
            
        result.content.forEach(function(data){
            // console.log(data)
            let actions = "<button class='btn btn-info btn_update viewDepartment' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather feather icon-refresh-ccw'></i> Update</button> <button class='btn btn-danger btn_remove removeDepartment' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button>";
                $('.departmentListTable').append("<tr>"+
                    "<td></td>"+
                    "<td>"+data.name+"</td>"+
                    "<td>"+data.description+"</td>"+
                    "<td>"+data.locationName+"</td>"+
                    "<td class='actions'> "+actions+"")
                });
                $(document).ready(function () {
                $('.departmentListTable tbody tr').each(function (idx) {
                   $(this).children("td:eq(0)").html(idx + 1);
                });
                    var table = $('.departmentListTable').DataTable({
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
                var departmentId   = $(this).data("id");
                window.location.href = 'http://localhost/ams/departments_update?departmentId='+departmentId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var departmentId   = $(this).data("id");
                // console.log(departmentId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('8088/department/remove/'+departmentId).done(function (result) {
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

var departmentCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

var __select = function(){
    $('.locationId').empty();
    __executeExternalGet('8088/location/list').done(function (result) {
        // console.log(result)
        if (result.status != "ERROR") {
            $('.locationId').append("<option selected disabled> - - Select Field Office - - </option>");
            result.forEach(function(data){
                $('.locationId').append(
                    "<option value="+data.id+">"+data.name+"</option>");
            });
            // setTimeout(function () {
                // $(".locationId").val($.cookie("field_office_id")).trigger("change");
            // }, 2000);
            
        } else {
            console.log("failed fetching docket list")
        }
    })
}
__select();

$(".btn_create").unbind("click").on("click", function(){
    // console.log("clicked")
        var required = ["departmentName", "departmentDescription", "locationId"];
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
                "name"              : $(".departmentName").val(),
                "description"       : $(".departmentDescription").val(),
                "parentId"          : "",
                "locationId"        : $(".locationId").val(),
                "locationName"      : "",
                "hasChild"          : true
            }
            // console.log(payload)
            __executeExternalPost('8088/department/create',JSON.stringify(payload)).done(function (result) {
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

var departmentUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var __select = function(){
    $('.locationIdUpdate').empty();
    __executeExternalGet('8088/location/list').done(function (result) {
        // console.log(result)
        if (result.status != "ERROR") {
            $('.locationIdUpdate').append("<option selected disabled> - - Select Field Office - - </option>");
            result.forEach(function(data){
                $('.locationIdUpdate').append(
                    "<option value="+data.id+">"+data.name+"</option>");
            });
            // setTimeout(function () {
                // $(".locationId").val($.cookie("field_office_id")).trigger("change");
            // }, 2000);
            
        } else {
            console.log("failed fetching docket list")
        }
    })
}
__select();

var departmentId = GetURLParameter('departmentId');
// console.log(positionId);

    var fields = ["departmentNameUpdate", "departmentDescriptionUpdate", "locationIdUpdate"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "locationIdUpdate") {
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
                if (fieldName === "locationIdUpdate") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });

        $(".btn-edit").hide();
        $(".btn-update").show();
    })

__executeExternalGet('8088/department/'+departmentId).done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        $(".departmentNameUpdate").val(result.name);
        $(".departmentDescriptionUpdate").val(result.description);

        setTimeout(function () {
            $(".locationIdUpdate").val(result.locationId).trigger("change");
        }, 2000);
    }else
    {
        console.log("ERROR")
    }
})

$(".btn-update").unbind("click").on("click", function(){
    // console.log("clicked")
    var required = ["departmentNameUpdate", "departmentDescriptionUpdate", "locationIdUpdate"];
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
                "name"              : $(".departmentNameUpdate").val(),
                "description"       : $(".departmentDescriptionUpdate").val(),
                "parentId"          : "",
                "locationId"        : $(".locationIdUpdate").val(),
                "locationName"      : "",
                "hasChild"          : true
            }
            // console.log(payload)
            __executeExternalPost('8088/department/update/'+departmentId,JSON.stringify(payload)).done(function (result) {
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

