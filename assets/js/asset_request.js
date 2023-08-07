var asset_request_list = function() {
    console.log("asset list checker")

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        __executeExternalGet('3000/asset-request/list/0/300').done(function (result) {
            // console.log("==========")
            // console.log(result)
            // console.log("==========")
            
            if (result.status != "ERROR") {
                    
                result.response.content.forEach(function(data){
                    console.log(data)
                    // var status;
                    let actions;
                        actions = " <button class='btn btn-info btn_update' type='submit' data-id='"+data.id+"'> View</button> <button class='btn btn-danger btn_remove' type='submit' data-id='"+data.id+"'> Remove</button>";
                    // var stockGenerated = data.stockGenerated === true ? "Yes" : "No";
                    $('.table_body').append("<tr>"+
                        "<td></td>"+
                        "<td>"+data.categoryName+"</td>"+
                        "<td>"+data.subject+"</td>"+
                        "<td>"+data.allotmentType+"</td>"+
                        "<td>"+data.description+"</td>"+
                        "<td>"+data.requestStatus+"</td>"+
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
                        var requestId = $(this).data("id");
                        // console.log(data_id)
                        window.location.href = '/ams/asset_request_update?requestId='+requestId;
                    });
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
            }

        })
    }
    __table();
}
var asset_request_create = function(){

    var __category = function(){
        $('.category').empty();

        $('.category').append("<option selected disabled> --Select Category-- </option>");
        __executeExternalGet('3000/category/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.response.forEach(function(data){
                    $('.category').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching vendor list");
            }
        })
    }
    __category();

    $(".btn-create").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["category", "allotment", "reqStatus", "subject", "description"];
        $(".errorRequired").remove();

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
            var payload = 
                {
                    "requestorId"   : $.cookie("uuid"),
                    "requestorName" : "",
                    "approverId"    : "",
                    "approverName"  : "",
                    "categoryId"    : $(".category").val(),
                    "description"   : $(".description").val(),
                    "subject"       : $(".subject").val(),
                    "remarks"       : "",
                    "allotmentType" : $(".allotment").val(),
                    "requestStatus" : "Draft",
                    "id"            : "",
                    "createdBy"     : $.cookie("uuid"),
                    "createdDate"   : "",
                    "updatedBy"     : "",
                    "updatedDate"   : "",
                    "status"        : true
                }
            console.log(payload);
            __executeExternalPost('3000/asset-request/new',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    // $(".form-control").val('');
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
var asset_request_update = function() {

    var requestId = GetURLParameter('requestId');
    var managerId = $.cookie("managerId");
    // console.log(managerId);

    var __category = function(){
        $('.category').empty();

        $('.category').append("<option selected disabled> --Select Category-- </option>");
        __executeExternalGet('3000/category/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.response.forEach(function(data){
                    $('.category').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching vendor list");
            }
        })
    }
    __category();

    var fields = ["category", "allotment", "reqStatus", "subject", "description"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "category" || fieldName === "allotment" || fieldName === "reqStatus") {
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
                if (fieldName === "category" || fieldName === "allotment" || fieldName === "reqStatus") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });

        $(".btn-edit").hide();
        $(".btn-update").show();
    })

    __executeExternalGet('3000/asset-request/'+requestId).done(function (result) {
        console.log(result);
        if (result.status != "ERROR") {
            var result = result.response;
            
            var requestStatus = result.requestStatus;
            var approverId = result.approverId;
            // console.log(requestStatus + " " + approverId)

            if ( managerId === "null" && requestStatus === "New") {
                $(".remarksInput").show();
                $(".btn-approve").show();
                $(".btn-reject").show();
                var payload = 
                    {
                        "requestorId"   : result.requestorId,
                        "requestorName" : "",
                        "approverId"    : result.approverId,
                        "approverName"  : "",
                        "categoryId"    : result.categoryId,
                        "description"   : result.description,
                        "subject"       : result.subject,
                        "remarks"       : "",
                        "allotmentType" : result.allotmentType,
                        "requestStatus" : "Pending",
                        "id"            : requestId,
                        "createdBy"     : result.requestorId,
                        "createdDate"   : "",
                        "updatedBy"     : "",
                        "updatedDate"   : "",
                        "status"        : true
                    }
                console.log(payload);
                __executeExternalPost('3000/asset-request/edit/'+requestId,JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        // $(".form-control").val('');
                        // $('#success').show();
                        // setTimeout(function () {
                        //     $('#success').hide();
                                                    
                        //         setTimeout(function () {
                        //             window.location.reload(true);
                        //         }, 500);
                        // }, 2000);
                    }else{
                        console.log(result.status);
                    }
                })
            }
            else if ( managerId === "null" && requestStatus === "Pending"){
                $(".remarksInput").show();
                $(".btn-approve").show();
                $(".btn-reject").show();
            }
            else if ( managerId === "null" && requestStatus === "Approved"){
                console.log("Already Approved");
                $(".remarksInput").show();
                $(".remarks").val(result.remarks);
                $(".btn-approve").hide();
                $(".btn-reject").hide();
            }
            else if ( managerId === "null" && requestStatus === "Rejected"){
                console.log("Already Rejected");
                $(".remarksInput").show();
                $(".remarks").val(result.remarks);
                $(".btn-approve").hide();
                $(".btn-reject").hide();
            }
            else {
                console.log("Approved or Reject")
            }

            if (requestStatus === "Draft" && approverId === "") {
                $(".btn-edit").show();
                $(".btn-forApproved").show();
                $(".btn-approve").hide();
            } else {
                // console.log("manager")
            }

        setTimeout(function () {
            $(".category").val(result.categoryId).trigger("change");
            $(".allotment").val(result.allotmentType).trigger("change");
        }, 500 );
        $(".subject").val(result.subject);
        $(".description").val(result.description);

        $(".btn-update").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["category", "allotment", "reqStatus", "subject", "description"];
        $(".errorRequired").remove();

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
            var payload = 
                {
                    "requestorId"   : $.cookie("uuid"),
                    "requestorName" : "",
                    "approverId"    : "",
                    "approverName"  : "",
                    "categoryId"    : $(".category").val(),
                    "description"   : $(".description").val(),
                    "subject"       : $(".subject").val(),
                    "remarks"       : "",
                    "allotmentType" : $(".allotment").val(),
                    "requestStatus" : "Draft",
                    "id"            : requestId,
                    "createdBy"     : $.cookie("uuid"),
                    "createdDate"   : "",
                    "updatedBy"     : "",
                    "updatedDate"   : "",
                    "status"        : true
                }
            console.log(payload);
            __executeExternalPost('3000/asset-request/edit/'+requestId,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    // $(".form-control").val('');
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
        $(".btn-forApproved").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["category", "allotment", "reqStatus", "subject", "description"];
        $(".errorRequired").remove();

        required.forEach(function(data){
            if($("."+data).val() == "" || $("."+data).val() == null){
                $("."+data).addClass("error_field");
                $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter(("."+data))

            }else{
                $("."+data).removeClass("error_field");
            }
        });

        var requiredFields = $('.errorRequired:visible').length;
        // console.log('Number of required fields: ' + requiredFields);

        if (requiredFields === 0) {
            // console.log("test")
            var payload = 
                {
                    "requestorId"   : $.cookie("uuid"),
                    "requestorName" : "",
                    "approverId"    : $.cookie("managerId"),
                    "approverName"  : "",
                    "categoryId"    : $(".category").val(),
                    "description"   : $(".description").val(),
                    "subject"       : $(".subject").val(),
                    "remarks"       : "",
                    "allotmentType" : $(".allotment").val(),
                    "requestStatus" : "New",
                    "id"            : requestId,
                    "createdBy"     : $.cookie("uuid"),
                    "createdDate"   : "",
                    "updatedBy"     : "",
                    "updatedDate"   : "",
                    "status"        : true
                }
            // console.log(payload);
            __executeExternalPost('3000/asset-request/edit/'+requestId,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    // $(".form-control").val('');
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
        $(".btn-approve").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["category", "allotment", "reqStatus", "subject", "description"];
        $(".errorRequired").remove();

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
            var payload = 
                {
                    "requestorId"   : result.requestorId,
                    "requestorName" : "",
                    "approverId"    : $.cookie("uuid"),
                    "approverName"  : "",
                    "categoryId"    : $(".category").val(),
                    "description"   : $(".description").val(),
                    "subject"       : $(".subject").val(),
                    "remarks"       : $(".remarks").val(),
                    "allotmentType" : $(".allotment").val(),
                    "requestStatus" : "Approved",
                    "id"            : requestId,
                    "createdBy"     : result.requestorId,
                    "createdDate"   : "",
                    "updatedBy"     : $.cookie("uuid"),
                    "updatedDate"   : "",
                    "status"        : true
                }
            console.log(payload);
            __executeExternalPost('3000/asset-request/edit/'+requestId,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    // $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                                                
                            setTimeout(function () {
                                 window.location.href = "/ams/my_approval"
                            }, 500);
                    }, 2000);
                }else{
                    console.log(result.status);
                    // alert(result.message)
                }
            })
        }
    })
        $(".btn-reject").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["category", "allotment", "reqStatus", "subject", "description"];
        $(".errorRequired").remove();

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
            var payload = 
                {
                    "requestorId"   : result.requestorId,
                    "requestorName" : "",
                    "approverId"    : $.cookie("uuid"),
                    "approverName"  : "",
                    "categoryId"    : $(".category").val(),
                    "description"   : $(".description").val(),
                    "subject"       : $(".subject").val(),
                    "remarks"       : $(".remarks").val(),
                    "allotmentType" : $(".allotment").val(),
                    "requestStatus" : "Rejected",
                    "id"            : requestId,
                    "createdBy"     : result.requestorId,
                    "createdDate"   : "",
                    "updatedBy"     : $.cookie("uuid"),
                    "updatedDate"   : "",
                    "status"        : true
                }
            console.log(payload);
            __executeExternalPost('3000/asset-request/edit/'+requestId,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    // $(".form-control").val('');
                    $('#success').show();
                    setTimeout(function () {
                        $('#success').hide();
                                                
                            setTimeout(function () {
                                 window.location.href = "/ams/my_approval"
                            }, 500);
                    }, 2000);
                }else{
                    console.log(result.status);
                    // alert(result.message)
                }
            })
        }
    })
        }else{
            alert("failed")
        }
    })
}
var my_request_list = function() {
    // console.log("asset list checker")
    $(".filterStatus").on("change", function () {
        var selectedStatus = $(this).val();

        if ($.fn.DataTable.isDataTable(".table_head")) {
            $(".table_head").DataTable().destroy();
        }
            $(".table_body").empty();
        // console.log("Selected selectedStatus: " + selectedStatus);

        __executeExternalGet("3000/asset-request/requestor/list/0/300/"+$.cookie("uuid")+"/"+selectedStatus).done(function (result) {
            // console.log(result);
            result.response.content.forEach(function(data){
                // console.log(data)
                let actions;
                    actions = "<button class='btn btn-info btn_update' style='display:none;' type='submit' data-id='" + data.id + "'> View</button>";
                $(".table_body").append(
                    "<tr>" +
                    "<td></td>" +
                    "<td>"+data.categoryName+"</td>"+
                    "<td>"+data.subject+"</td>"+
                    "<td>"+data.description+"</td>"+
                    "<td>"+data.allotmentType+"</td>"+
                    "<td>"+data.requestStatus+"</td>" +
                    "<td class='actions'>"+actions+"</td>"
                );
            });
                $(document).ready(function () {
                    $(".table_head tbody tr").each(function (idx) {
                        $(this).children("td:eq(0)").html(idx + 1);
                    });

                    var table = $(".table_head").DataTable({
                        scrollX: true,
                    });

                    $(".btn_update").unbind("click").on("click", function () {
                        var requestId = $(this).data("id");
                        window.location.href = "/ams/asset_request_update?requestId=" + requestId;
                    });
                });
        });
    });
var __table = function () {

    if ($.fn.DataTable.isDataTable(".table_head")) {
        $(".table_head").DataTable().destroy();
    }
    $(".table_body").empty();

    __executeExternalGet("3000/asset-request/requestor/list/0/300/" + $.cookie("uuid") + "/Draft").done(function (result1) {
        // console.log(result1);
            if (result1.status != "ERROR") {
                __executeExternalGet("3000/asset-request/requestor/list/0/300/" + $.cookie("uuid") + "/New").done(function (result2) {
                // console.log(result2);
                    if (result2.status != "ERROR") {
                        __executeExternalGet("3000/asset-request/requestor/list/0/300/" + $.cookie("uuid") + "/Pending").done(function (result3) {
                            if (result3.status != "ERROR") {
                                __executeExternalGet("3000/asset-request/requestor/list/0/300/" + $.cookie("uuid") + "/Approved").done(function (result4) {
                                    if (result4.status != "ERROR") {
                                        __executeExternalGet("3000/asset-request/requestor/list/0/300/" + $.cookie("uuid") + "/Rejected").done(function (result5) {
                                            if (result5.status != "ERROR") {
                                                var mergedData = result1.response.content.concat(
                                                    result2.response.content,
                                                    result3.response.content,
                                                    result4.response.content,
                                                    result5.response.content
                                                );
                                                    mergedData.forEach(function (data) {
                                                    // console.log(data)
                                                    var category = data.categoryName;
                                                    // console.log(category);
                                                    var categoryName = category.name;
                                                    // console.log(categoryName);
                                                    let actions; 
                                                        actions = "<button class='btn btn-info btn_update assetRequestmyRequestview' type='submit' data-id='"+data.id+"' style='display:none;'> View</button>";
                                                        $(".table_body").append(
                                                          "<tr>" +
                                                            "<td></td>" +
                                                            "<td>"+categoryName+"</td>"+
                                                            "<td>"+data.subject+"</td>"+
                                                            "<td>"+data.allotmentType+"</td>"+
                                                            "<td>"+data.description+"</td>"+
                                                            "<td>"+data.requestStatus+"</td>" +
                                                            "<td class='actions'>"+actions+"</td>"
                                                        );
                                                    });

                                                    $(document).ready(function () {
                                                        $(".table_head tbody tr").each(function (idx) {
                                                            $(this).children("td:eq(0)").html(idx + 1);
                                                        });

                                                        var table = $(".table_head").DataTable({
                                                            scrollX: true,
                                                        });

                                                        $(".btn_update").unbind("click").on("click", function () {
                                                            var requestId = $(this).data("id");
                                                            window.location.href = "/ams/asset_request_update?requestId=" + requestId;
                                                        });
                                                    });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }
    });
};
__table();
}
var my_approval_list = function() {
    // console.log("asset list checker")
    $(".filterStatus").on("change", function () {
        var selectedStatus = $(this).val();
        // var permission = localStorage.getItem("permission")
        // console.log(permission)

        if ($.fn.DataTable.isDataTable(".table_head")) {
            $(".table_head").DataTable().destroy();
        }
        // console.log("Selected selectedStatus: " + selectedOption);

        __executeExternalGet("3000/asset-request/approver/list/0/300/"+$.cookie("uuid")+"/"+selectedStatus).done(function (result) {
            // console.log(result);
            result.response.content.forEach(function(data){
                // console.log(data)
                var category = data.categoryName;
                // console.log(category);
                var categoryName = category.name;
                
                let actions;
                    actions = " <button class='btn btn-info btn_update assetRequestmyApprovalview' type='submit' data-id='"+data.id+"'> View</button>";
                    
                $(".table_body").append(
                    "<tr>" +
                    "<td></td>" +
                    "<td>"+categoryName+"</td>"+
                    "<td>"+data.subject+"</td>"+
                    "<td>"+data.description+"</td>"+
                    "<td>"+data.allotmentType+"</td>"+
                    "<td>"+data.requestStatus+"</td>" +
                    "<td class='actions'>"+actions+"</td>"
                );
            });
                $(document).ready(function () {
                    $(".table_head tbody tr").each(function (idx) {
                        $(this).children("td:eq(0)").html(idx + 1);
                    });

                    var table = $(".table_head").DataTable({
                        scrollX: true,
                    });

                    $(".btn_update").unbind("click").on("click", function () {
                        var requestId = $(this).data("id");
                        window.location.href = "/ams/asset_request_update?requestId=" + requestId;
                    });
                });
        });
        $(".table_body").empty();
    });

    var __table = function () {

    if ($.fn.DataTable.isDataTable(".table_head")) {
        $(".table_head").DataTable().destroy();
    }
    $(".table_body").empty();

    __executeExternalGet("3000/asset-request/approver/list/0/300/" + $.cookie("uuid") + "/Draft").done(function (result1) {
        // console.log(result1);
            if (result1.status != "ERROR") {
                __executeExternalGet("3000/asset-request/approver/list/0/300/" + $.cookie("uuid") + "/New").done(function (result2) {
                // console.log(result2);
                    if (result2.status != "ERROR") {
                        __executeExternalGet("3000/asset-request/approver/list/0/300/" + $.cookie("uuid") + "/Pending").done(function (result3) {
                            if (result3.status != "ERROR") {
                                __executeExternalGet("3000/asset-request/approver/list/0/300/" + $.cookie("uuid") + "/Approved").done(function (result4) {
                                    if (result4.status != "ERROR") {
                                        __executeExternalGet("3000/asset-request/approver/list/0/300/" + $.cookie("uuid") + "/Rejected").done(function (result5) {
                                            if (result5.status != "ERROR") {
                                                var mergedData = result1.response.content.concat(
                                                    result2.response.content,
                                                    result3.response.content,
                                                    result4.response.content,
                                                    result5.response.content
                                                );
                                                    mergedData.forEach(function (data) {
                                                    // console.log(data)
                                                    var category = data.categoryName;
                                                    // console.log(category);
                                                    var categoryName = category.name;
                                                    // console.log(categoryName);
                                                    let actions; 
                                                        actions = "<button class='btn btn-info btn_update assetRequestmyApprovalview' type='submit' data-id='"+data.id+"' style='display:none;'> View</button>";
                                                        $(".table_body").append(
                                                          "<tr>" +
                                                            "<td></td>" +
                                                            "<td>"+categoryName+"</td>"+
                                                            "<td>"+data.subject+"</td>"+
                                                            "<td>"+data.requestorName+"</td>"+
                                                            "<td>"+data.allotmentType+"</td>"+
                                                            "<td>"+data.requestStatus+"</td>" +
                                                            "<td class='actions'>"+actions+"</td>"
                                                        );
                                                    });

                                                    $(document).ready(function () {
                                                        $(".table_head tbody tr").each(function (idx) {
                                                            $(this).children("td:eq(0)").html(idx + 1);
                                                        });

                                                        var table = $(".table_head").DataTable({
                                                            scrollX: true,
                                                        });

                                                        $(".btn_update").unbind("click").on("click", function () {
                                                            var requestId = $(this).data("id");
                                                            window.location.href = "/ams/asset_request_update?requestId=" + requestId;
                                                        });
                                                    });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }
    });
};
__table();
}
                
                  
                                        
                                