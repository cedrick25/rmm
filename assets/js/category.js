function initializeSelect2() {
  $('.assetType').select2({
    width: '100%'
  });
}

var categoryList = function() {
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-create").unbind("click").on("click", function(){
    // console.log("clicked")
    window.location.href = 'http://localhost/ams/category_create';
    })
    __executeExternalGet('3000/category/list/0/300').done(function (result) {
    if (result.status != "ERROR") {
        console.log(result)
        result.response.content.forEach(function(data){
            // console.log(data)
            let consumable;
            switch (data.consumable) {
                case true:
                    consumable = "Yes";
                    break;
                case false:
                    consumable = "No";
                    break;
                default:
                    value = "Undefined";
                    break;
            }
            let actions = "<button class='btn btn-info btn_update viewCategory' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove removeCategory' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button>";
                $('.table_head').append("<tr>"+
                    "<td></td>"+
                    "<td>"+data.name+"</td>"+
                    "<td>"+data.assetType+"</td>"+
                    "<td>"+consumable+"</td>"+
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
                var categoryId = $(this).data("id");
                // console.log(categoryId)
                window.location.href = 'http://localhost/ams/category_update?categoryId='+categoryId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var categoryId   = $(this).data("id");
                console.log(categoryId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('3000/category/remove/'+categoryId).done(function (result) {
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

var categoryCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

    $(".btn-add").unbind("click").on("click", function(){
        // console.log("clicked");

        $(".addCategory").append(`
        <div class="form-row">
            <div class="form-group col-md-6">
                <label class="form-label">Category Name</label>
                <input type="text" class="form-control categoryName" placeholder="">
                <div class="clearfix"></div>
            </div>
            <div class="form-group col-md-6">
                <label class="form-label">Asset Type</label>
                <select class="custom-select assetType select2">
                    <option selected disabled>-- Select --</option>
                    <option value="Stock Type – Fixed">Stock Type – Fixed</option>
                    <option value="Consumables">Consumables</option>
                    <option value="Intangible Assets">Intangible Assets</option>
                </select>
                <div class="clearfix"></div>
            </div>
            <div class="form-group col-md-6">
                <label class="form-label">Consumable</label><br><br>
                <div class="d-flex align-items-center">
                    <label class="form-label">No</label>
                    <label class="switch mx-2">
                        <input type="checkbox" class="form-check-input primary" id="" value="" name="consumable"checked>
                        <span class="slider round"></span>
                    </label>
                    <label class="form-label">Yes</label>
                </div>
            </div>
            <button type="button" class="btn btn-danger float-right btn-remove" style="margin-left: 680px; height: 35.1094px; margin-top: 50px">Remove</button>
        </div>
            `
        )
    initializeSelect2();
    });

    $('.addCategory').on('click', '.btn-remove', function(e) {
        e.preventDefault();

        $(this).parent().remove();
    });

    $(".btn_create").unbind("click").on("click", function(){

            var required = ["categoryName", "assetType"];
            $(".errorRequired").remove()

            required.forEach(function(data){
                if($("."+data).val() == "" || $("."+data).val() == null){
                    $("."+data).addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter(("."+data))

                }else{
                    $("."+data).removeClass("error_field");
                }
            });

            const categoryList = [];
            const categoryName = $(".categoryName");
            const assetType = $(".assetType");
            const consumable = $("input:checkbox[name=consumable]");
            for (var i = 0; i < categoryName.length; i++) {
                const categoryParticulars = {};
                categoryParticulars.categoryName = $(categoryName[i]).val();
                categoryParticulars.assetType = $(assetType[i]).val();
                categoryParticulars.consumable = $(consumable[i]).is(":checked");
                categoryList.push(categoryParticulars);
            }
            // console.log(categoryList);

            var requiredFields = $('.errorRequired:visible').length;
            // console.log('Number of required fields: ' + requiredFields);

            
                for (var h = 0; h < categoryList.length; h++){
                    if (requiredFields === 0) {
                        const payload = {
                            "name"          : categoryList[h].categoryName,
                            "assetType"     : categoryList[h].assetType,
                            "id"            : "",
                            "createdBy"     : "",
                            "createdDate"   : "",
                            "updatedBy"     : "",
                            "updatedDate"   : "",
                            "status"        : true,
                            "consumable"    : categoryList[h].consumable
                        }     
                        // console.log(payload)
                        __executeExternalPost('3000/category/new',JSON.stringify(payload)).done(function (result) {
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
                }

    })
    
}

var categoryUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var categoryId = GetURLParameter('categoryId');
// console.log(categoryId);

    var fields = ["categoryNameUpdate", "assetTypeUpdate", "isConsumable"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "assetTypeUpdate" || fieldName === "isConsumable") {
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
                if (fieldName === "assetTypeUpdate" || fieldName === "isConsumable") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });

        $(".btn-edit").hide();
        $(".btn-update").show();
    })

__executeExternalGet('3000/category/'+categoryId).done(function (result) {

    if (result.status != "ERROR") {
        console.log(result);
        var result = result.response;
        $(".categoryNameUpdate").val(result.name);
        setTimeout (function () { 
            $(".assetTypeUpdate").val(result.assetType).trigger("change");
        }, 500);
        $("input:checkbox[name=consumableUpdate]").prop("checked", result.consumable);
    }else
    {
        console.log("ERROR")
    }


    $(".btn-update").unbind("click").on("click", function(){
        var consumableUpdate = $("input:checkbox[name=consumableUpdate]").prop("checked");
        var payload = {
            "name"          : $(".categoryNameUpdate").val(),
            "assetType"     : $(".assetTypeUpdate").val(),
            "id"            : "",
            "createdBy"     : "",
            "createdDate"   : "",
            "updatedBy"     : "",
            "updatedDate"   : "",
            "status"        : true,
            "consumable"    : consumableUpdate
        }
        console.log(payload)
        __executeExternalPost('3000/category/edit/'+categoryId,JSON.stringify(payload)).done(function (result) {
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
    })
})

    
}


