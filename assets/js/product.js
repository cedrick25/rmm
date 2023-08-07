var productList = function() {
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-create").unbind("click").on("click", function(){
    // console.log("clicked")
    window.location.href = 'http://localhost/ams/product_management_create';
    })
    __executeExternalGet('3000/product/list/0/300').done(function (result) {
    if (result.status != "ERROR") {
        // console.log(result);
        var result = result.response.content;
        // console.log(result);
        result.forEach(function(data){
            // console.log(data)
            var dataProduct = data.product;
            var dataCategory = data.category;
            var categoryNames = dataCategory.map(function(category) {
                return category.name;
            }).join(", ");
            // console.log(categoryNames)        
            // console.log(dataCategory)
            let actions = "<button class='btn btn-info btn_update viewProduct' type='button' data-id='"+dataProduct.id+"' style='display:none;'><i class='feather feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove productRemove' type='button' data-id='"+dataProduct.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button> <button class='btn btn-success btn_link productLink' type='button' data-id='"+dataProduct.id+"' style='display:none;'><i class='feather icon-link'></i> Link Category</button> <button class='btn btn-danger btn_removeLink productCategoryremove' type='button' data-id='"+dataProduct.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove Category</button>";
                $('.table_head').append("<tr>"+
                    "<td></td>"+
                    "<td>"+dataProduct.name+"</td>"+
                    "<td>"+dataProduct.description+"</td>"+
                    "<td>"+categoryNames+"</td>"+
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
                        //     { "width": "40%", "targets": 4 }
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
            })
            $(".btn_update").unbind("click").on("click", function(){
                // console.log("clicked")
                var productId = $(this).data("id");
                // console.log(categoryId)
                window.location.href = 'http://localhost/ams/product_management_update?productId='+productId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var productId   = $(this).data("id");
                console.log(productId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('3000/product/remove/'+productId).done(function (result) {
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
            $(".btn_link").unbind("click").on("click", function(){
                // console.log("clicked")
                var productId   = $(this).data("id");
                // console.log(productId)
                window.location.href = 'http://localhost/ams/product_category?productId='+productId;
            })
            $(".btn_removeLink").unbind("click").on("click", function(){
                // console.log("clicked")
                var productId   = $(this).data("id");
                // console.log(productId)
                $('#removeCategoryModal').modal('show')
                __executeExternalGet('3000/product/'+productId).done(function (result) {
                    var result = result.response;
                    // console.log(result);
                    var categoriesId = result.category;
                    // console.log(categoriesId)
                    $(".btn_remove_category").unbind("click").on("click", function(){
                        for (var i = 0; i < categoriesId.length; i++){
                            // console.log(categoriesId[i].id)
                            __executeExternalPost('3000/product/remove/category/'+productId+'/'+categoriesId[i].id).done(function (result) {
                                if (result.status != "ERROR") {
                                        $('#success_removeCategory').show();
                                            setTimeout(function () {
                                                $('#removeCategoryModal').modal('hide');
                                                $('#success_removeCategory').hide();
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

var productCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

    $(".btn-add").unbind("click").on("click", function(){
        // console.log("clicked");

        $(".addProduct").append(`
        <div class="form-row">
            <div class="form-group col-md-6">
                <label class="form-label">Product Name</label>
                <input type="text" class="form-control productName" placeholder="">
                <div class="clearfix"></div>
            </div>
            <div class="form-group col-md-6">
                <label class="form-label">Description</label>
                <input type="text" class="form-control description" placeholder="">
                <div class="clearfix"></div>
            </div>
            <button type="button" class="btn btn-danger btn-remove" style="margin-left: 1050px; height: 35.1094px; margin-top: 10px">Remove</button>
        </div>
            `
        )
    });

    // style="margin-left: 1450px; height: 35.1094px; margin-top: 10px"

    $('.addProduct').on('click', '.btn-remove', function(e) {
        e.preventDefault();

        $(this).parent().remove();
    });

    $(".btn_create").unbind("click").on("click", function(){

        var required = ["productName", "description"];
            $(".errorRequired").remove()

            required.forEach(function(data){
                if($("."+data).val() == "" || $("."+data).val() == null){
                    $("."+data).addClass("error_field");
                    $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter(("."+data))

                }else{
                    $("."+data).removeClass("error_field");
                }
            });

            const productList = [];
            const productName = $(".productName");
            const description = $(".description");
            for (var i = 0; i < productName.length; i++) {
                const productParticulars = {};
                productParticulars.productName = $(productName[i]).val();
                productParticulars.description = $(description[i]).val();
                productList.push(productParticulars);
            }
            // console.log(categoryList);

            var requiredFields = $('.errorRequired:visible').length;
            // console.log('Number of required fields: ' + requiredFields);

                for (var h = 0; h < productList.length; h++){
                    if (requiredFields === 0) {
                        const payload = {
                            "name"          : productList[h].productName,
                            "description"   : productList[h].description,
                            "id"            : "",
                            "createdBy"     : $.cookie("uuid"),
                            "createdDate"   : "",
                            "updatedBy"     : "",
                            "updatedDate"   : "",
                            "status"        : true
                        }     
                        console.log(payload)
                        __executeExternalPost('3000/product/new',JSON.stringify(payload)).done(function (result) {
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

var productUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var productId = GetURLParameter('productId');
// console.log(categoryId);

    var fields = ["productNameUpdate", "descriptionUpdate"];
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
                // if (fieldName === "departmentUpdate" || fieldName === "user_rolesUpdate") {
                //     elements[i].disabled = false;
                // } else {
                    elements[i].readOnly = false; 
                // }
            }
        });

        $(".btn-edit").hide();
        $(".btn-update").show();
    })

__executeExternalGet('3000/product/'+productId).done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        var result = result.response;
        console.log(result)
        $(".productNameUpdate").val(result.product.name);
        $(".descriptionUpdate").val(result.product.description);
    }else
    {
        console.log("ERROR")
    }


    $(".btn-update").unbind("click").on("click", function(){

        var required = ["productNameUpdate", "descriptionUpdate"];
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
                    "name"          : $(".productNameUpdate").val(),
                    "description"   : $(".descriptionUpdate").val(),
                    "id"            : "",
                    "createdBy"     : $.cookie("uuid"),
                    "createdDate"   : "",
                    "updatedBy"     : "",
                    "updatedDate"   : "",
                    "status"        : true
                }
                // console.log(payload)
                __executeExternalPost('3000/product/edit/'+productId,JSON.stringify(payload)).done(function (result) {
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
})

    
}

var productCategory = function() {

var productId = GetURLParameter('productId');
// console.log(categoryId);

    var __category = function(){
        $('.category').empty();
        __executeExternalGet('3000/category/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                // $('.category').append("<option selected disabled> - - Select - - </option>");
                result.response.forEach(function(data){
                    $('.category').append(
                        "<option value="+data.id+" data-id="+data.id+" data-name="+data.name+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    __category();

    __executeExternalGet('3000/product/'+productId).done(function (result) {

        if (result.status != "ERROR") {
            // console.log(result)
            var result = result.response;
            $(".productNameCategory").val(result.product.name);
            $(".descriptionCategory").val(result.product.description);
        }else
        {
            console.log("ERROR")
        }


        $(".btn-category").unbind("click").on("click", function(){

            
            var categoryId = $('.category option:selected').data('id');

            var categories = document.getElementsByClassName("category");
            // console.log(categories)
            var selectedCategories = [];

            for (var i = 0; i < categories.length; i++) {
                var options = categories[i].options;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].selected) {
                        selectedCategories.push(options[j].value);
                    }
                }
            }
            // console.log(selectedCategories);

            for (var h = 0; h < selectedCategories.length; h++) {
                var name = $('.category option:selected').data('name');
                var payload = {
                    "productId"         : result.product.id,
                    "categoryId"        : selectedCategories[h],
                    "categoryName"      : "",
                    "id"                : "",
                    "createdBy"         : "",
                    "createdDate"       : "",
                    "updatedBy"         : "",
                    "updatedDate"       : "",
                    "status"            : true
                }
                // console.log(payload)
                __executeExternalPost('3000/product/new/category/'+productId+'/'+selectedCategories[h],JSON.stringify(payload)).done(function (result) {
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
    })

}
