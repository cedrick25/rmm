var list = function(){
    $(".btn-create").unbind("click").on("click", function(){
        window.location.href = 'http://localhost/rmm/location_create';
    })

    // __executeExternalGet('8088/department/?page=0&size=300&name').done(function (result) {
    __executeExternalGet('8088/location/list').done(function (result) {
        if (result.status != "ERROR") {
            console.log(result)    
            // result.content.forEach(function(data){
            result.forEach(function(data){
                // console.log(data)
            let actions = "<button class='btn btn-info btn_update viewLocation' type='submit' data-id='"+data.id+"'><i class='feather feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove removeLocation' type='submit' data-id='"+data.id+"'><i class='feather icon-x-square'></i> Remove</button>";
                    $('.locationListTable').append("<tr>"+
                        "<td></td>"+
                        "<td>"+data.name+"</td>"+
                        "<td>"+data.address+"</td>"+
                        "<td class='actions'> "+actions+"")
                    });
                    $(document).ready(function () {
                    $('.locationListTable tbody tr').each(function (idx) {
                       $(this).children("td:eq(0)").html(idx + 1);
                    });
                        var table = $('.locationListTable').DataTable({
                            scrollX: true,
                            order: [[0, 'desc']],
                            // order: [[0, 'asc']],
                            // "columnDefs": [
                            //     { "width": "30%", "targets": 7 }
                            // ]
                            // drawCallback: function (settings) {
                            //     var data = JSON.parse(localStorage.getItem('permission'));
                            //     // console.log(permission);
                            //     if (data != null) {
                            //         data.forEach(function(data){
                            //             if (data.type == "ACTION") {
                            //                 // console.log(data.value)
                            //                 setTimeout(function() {
                            //                     if (!data.value) {
                            //                         var element = $('.' + data.detail);
                            //                         element.hide();
                            //                     }else{
                            //                         var element = $('.' + data.detail);
                            //                         element.show();
                            //                     }
                            //                 }, 1000);
                            //             }else if (data.type == "VIEW") {
                            //                 if (!data.value) {
                            //                     var element = $('.' + data.detail);
                            //                     element.hide();
                            //                 }else{
                            //                     var element = $('.' + data.detail);
                            //                     element.show();
                            //                 }
                            //             }else{
                            //             }
                            //         });
                            //     }
                            // }
                        });
                        // $('.dataTables_length').addClass('bs-select');
                });
                $(".btn_update").unbind("click").on("click", function(){
                    // console.log("clicked")
                    var locationId   = $(this).data("id");
                    window.location.href = 'http://localhost/rmm/location_update?locationId='+locationId;
                })
                $(".btn_remove").unbind("click").on("click", function(){
                    // console.log("clicked")
                    var locationId   = $(this).data("id");
                    $('#removeModal').modal('show')
                    $(".btn_remove_confirm").unbind("click").on("click", function(){
                        __executeExternalPost('8088/location/remove/'+locationId).done(function (result) {
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

var create = function(){

    $(".btn_create").unbind("click").on("click", function(){
        // console.log("clicked")
        var required = ["locationName", "locationAddress"];
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
                "name"              : $(".locationName").val(),
                "address"           : $(".locationAddress").val(),
                "parentId"          : ""
            }
            // console.log(payload)
            __executeExternalPost('8088/location/create',JSON.stringify(payload)).done(function (result) {
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

var update = function(){

    var locationId = GetURLParameter('locationId');

    __executeExternalGet('8088/location/'+locationId).done(function (result) {
        console.log(result)
        $(".locationName").val(result.name)
        $(".locationAddress").val(result.address)
    });

    $(".btn_update").unbind("click").on("click", function(){
        // console.log("clicked")
        var required = ["locationName", "locationAddress"];
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
        // console.log('Number of required fields: ' + requiredFields);

        if (requiredFields === 0) {
            var payload = {
                "id"                : "",
                "createdBy"         : "",
                "createdDate"       : "",
                "updatedBy"         : "",
                "updatedDate"       : "",
                "name"              : $(".locationName").val(),
                "address"           : $(".locationAddress").val(),
                "parentId"          : ""
            }
            // console.log(payload)
            __executeExternalPost('8088/location/update/'+locationId,JSON.stringify(payload)).done(function (result) {
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