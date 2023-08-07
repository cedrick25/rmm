var system_dashboard = function(){
	console.log("attached events for system dashboard");

    // Function to get the number suffix (e.g., 1st, 2nd, 3rd, etc.)
    for (var i = 1; i <= 10; i++) {
        var productField = `
          <div class="form-row">
            <div class="form-group col-md-12">
              <label class="form-label">Product ${i}</label>
              <select class="form-control products select2"></select>
              <div class="clearfix"></div>
            </div>
          </div>
        `;
        $('.productFields').append(productField);
    }
    var buttonProd = `
    <div class="form-row">
        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-info float-right btn_save_product">Save</button>
        </div>
    </div>
    `;
    $('.productFields').append(buttonProd);

    var __select_product = function() {
        $(".products").empty();
        $(".products").append("<option value='' selected disabled> - - Select Product - - </option>");

        __executeExternalGet('3000/product/list').done(function(result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.response.forEach(function(data) {
                    $(".products").append(
                        "<option value=" + data.product.id + ">" + data.product.name + "</option>"
                    );
                });
            } else {
                console.log("failed fetching product list");
            }
        });
    };
    __select_product();

    __executeExternalGet('3000/system-settings/product-display/dashboard').done(function (result) {
        console.log(result);
        if (result.status != "ERROR") {

        }else{
            console.log(result.status);
            // alert(result.message)
        }
    })

    $('.btn_save_product').on('click', function() {
        var selectedProducts = [];

        // Loop through each product dropdown and get its selected value
        $('.products').each(function() {
            var selectedValue = $(this).val();
            if (selectedValue !== null) {
                selectedProducts.push(selectedValue);
            }
        });

        console.log(selectedProducts);
        // Perform any other actions with the selected products here...
        if (selectedProducts.length > 0) {
            var payload = {
                "component": "dashboard",
                "type": "product-display",
                "data": JSON.stringify(selectedProducts)
            }
            console.log(payload);
            __executeExternalPost('3000/system-settings/new',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {

                    $("#success_prod").show();
                    $("#failed_prod").hide();

                }else{
                    console.log(result.status);
                }
            })
        } else {
            $("#failed_prod").show();
            $("#success_prod").hide();

        }
    });




    // THIS IS FOR CATEGORY // 
    // Function to get the number suffix (e.g., 1st, 2nd, 3rd, etc.)
    for (var i = 1; i <= 10; i++) {
        var catField = `
          <div class="form-row">
            <div class="form-group col-md-6">
              <label class="form-label">Category ${i}</label>
              <select class="form-control category select2"></select>
              <div class="clearfix"></div>
            </div>
          </div>
        `;
        $('.categoryFields').append(catField);
    }
    var buttonCategory = `
    <div class="form-row">
        <div class="form-group col-md-6">
          <button type="submit" class="btn btn-info float-right btn_save_category">Save</button>
        </div>
    </div>
    `;
    $('.categoryFields').append(buttonCategory);
    var __select_category = function(){
        $('.category').empty();

        $('.category').append("<option value='' selected disabled> - - Select Category - - </option>");
        __executeExternalGet('3000/category/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.response.forEach(function(data){
                    $('.category').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching product list");
            }
        })
    }
    __select_category();

    $('.btn_save_category').on('click', function() {
        var selectedProducts = [];

        // Loop through each product dropdown and get its selected value
        $('.category').each(function() {
            var selectedValue = $(this).val();
            if (selectedValue !== null) {
                selectedProducts.push(selectedValue);
            }
        });

        console.log(selectedProducts);
        // Perform any other actions with the selected products here...
        if (selectedProducts.length > 0) {
            var payload = {
                "component": "dashboard",
                "type": "category-display",
                "data": JSON.stringify(selectedProducts)
            }
            console.log(payload);
            __executeExternalPost('3000/system-settings/new',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {

                    $("#success_prod").show();
                    $("#failed_prod").hide();
                    
                }else{
                    console.log(result.status);
                }
            })
        } else {
            $("#failed_prod").show();
            $("#success_prod").hide();

        }
    });

    $('.select2').select2({
        // dropdownParent: $('.modal'),
        width: '100%',
    });
}