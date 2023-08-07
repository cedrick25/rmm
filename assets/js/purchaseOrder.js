function initializeSelect2() {
  $('.product, .warrantyType, .warrantyMethod').select2({
    width: '100%'
  });
}

function calculateGrandTotal() {
    // Reset the grand total
    grandTotal = 0;

    // Loop through all the particular total costs and add them to the grand total
    $(".particularCost").each(function() {
        var totalCost = parseFloat($(this).val().replace("Php", "")) || 0;
        grandTotal += totalCost;
    });

    // Update the grand total display
    $(".totalCost").val(grandTotal.toFixed(2));
}

function autoCompute(){
    $(".particulars").on("input", ".addListParticulars .quantity, .addListParticulars .cost", function() {
        var $row = $(this).closest(".addListParticulars");
        var quantity = parseFloat($row.find(".quantity").val()) || 0;
        var cost = parseFloat($row.find(".cost").val().replace("Php", "")) || 0;
        var totalCost = quantity * cost;
        $row.find(".particularCost").val(totalCost.toFixed(2));

        calculateGrandTotal();
    });
}

function saveWarrantyType(selectedValue) {
    // console.log("Selected Warranty Type:", selectedValue);
}

function saveWarrantyMethod(selectedValue) {
    // console.log("Selected Warranty Type:", selectedValue);
}

$(document).ready(function() {
  $(".warrantySwitch").prop("checked");
  $(document).on("change", ".warrantySwitch", function() {
    toggleWarrantyFields();
  });
});

function toggleWarrantyFields() {
  $(".warrantySwitch").each(function() {
    const hasWarranty = $(this).prop("checked");
    const warrantyFields = $(this).closest(".addListParticulars, .initialParticular").find(".warranty-fields");
    warrantyFields.toggle(hasWarranty);
  });
}


var purchaseOrderList = function() {
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-create").unbind("click").on("click", function(){
    // console.log("clicked")
    window.location.href = 'http://localhost/ams/purchase_order_create';
    })

    __executeExternalGet('3000/purchase-order/list/0/300').done(function (result) {
    if (result.status != "ERROR") {
        console.log(result)
        result.response.content.forEach(function(data){
            // console.log(data)
            let actions = "<button class='btn btn-info btn_update client_update viewPurchaseorder' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather feather icon-refresh-ccw'></i> Update</button> <button class='btn btn-danger btn_remove removePruchaseorder' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button>";
                var peso = "\u20B1 " + data.totalCost;
                // console.log(peso);
                $('.table_head').append("<tr>"+
                    "<td></td>"+
                    "<td>"+data.invoiceNumber+"</td>"+
                    "<td>"+data.transactionId+"</td>"+
                    "<td>"+data.invoiceStatus+"</td>"+
                    "<td>"+peso+"</td>"+
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
                var orderId   = $(this).data("id");
                // console.log(permissionId)
                window.location.href = 'http://localhost/ams/purchase_order_update?orderId='+orderId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var orderId   = $(this).data("id");
                // console.log(permissionId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('3000/purchase-order/remove/'+orderId).done(function (result) {
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

var purchaseOrderCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");

    var __product = function(){
        $('.product').empty();
        __executeExternalGet('3000/product/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.product').append("<option selected disabled> - - Select - - </option>");
                result.response.forEach(function(data){
                    var data = data.product;
                    $('.product').append(
                        "<option value="+data.id+" data-id="+data.id+" data-name="+data.name+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    __product();

    var __vendor = function(){
        $('.vendor').empty();
        __executeExternalGet('3000/vendor/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.vendor').append("<option selected disabled> - - Select - - </option>");
                result.response.forEach(function(data){
                    // var data = data.product;
                    $('.vendor').append(
                        "<option value="+data.id+" data-id="+data.id+" data-name="+data.name+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    __vendor();

    $('.vendor').on('change', function() {
        const vendorId = this.value
        // console.log(vendorId)
        $('.vendorPoc').empty();
        __executeExternalGet('3000/vendor/contact/list/'+vendorId).done(function (result) {
            // console.log(result)
            var result = result.response;
                if (result.status != "ERROR") {
                    var dropdown = document.getElementById("poc");
                    dropdown.disabled = false;
                    $('.vendorPoc').append("<option selected disabled> - - Select - - </option>");
                    result.forEach(function(data){
                        // console.log(data)
                        var name = data.firstName + " " + data.middleName + " " + data.lastName + " " + data.suffix;
                        $('.vendorPoc').append(
                            "<option value="+data.id+" data-id="+data.id+">"+name+"</option>");

                    });
                } else {
                    console.log("failed fetching user roles list")
                }
        });
    });

    var grandTotal = 0;

    $(".initialParticular").on("input", "#qty, #iniCost", function() {
        var quantity = parseFloat($("#qty").val()) || 0;
        var cost = parseFloat($("#iniCost").val().replace("Php", "")) || 0;
        var totalCost = quantity * cost;

        $("#partCost").val(totalCost.toFixed(2));
        calculateGrandTotal();
    });


    $(".btn-add").unbind("click").on("click", function(){
        // console.log("clicked");
        $(".particulars").append(`
        <div class="form-row">
            <div class="col-12 addListParticulars d-flex align-items-center" style="margin-top: 20px">
                <div class="form-group col-md-2">
                <label class="form-label">Product</label>
                    <select class="custom-select product select2">
                    </select>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1">
                    <label class="form-label">Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Php</span>
                        </div>
                        <input type="text" class="form-control cost" placeholder="">
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1">
                <label class="form-label">Quantity</label>
                    <input type="text" class="form-control quantity" placeholder="">
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1">
                    <label class="form-label">Total Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Php</span>
                        </div>
                        <input type="text" class="form-control particularCost" placeholder="" readonly>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-2 warranty-fields">
                <label class="form-label">Warranty Type</label>
                    <select class="custom-select warrantyType select2">
                        <option selected disabled>Select</option>
                        <option value="None">None</option>
                        <option value="Parts Only">Parts Only</option>
                        <option value="Service Only">Service Only</option>
                        <option value="Parts and Services">Parts and Services</option>
                    </select>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-2 warranty-fields">
                <label class="form-label">Warranty Method</label>
                    <select class="custom-select warrantyMethod select2">
                        <option selected disabled>Select</option>
                        <option value="None">None</option>
                        <option value="Carry-in">Carry-in</option>
                        <option value="Pick-Up">Pick-Up</option>
                        <option value="On-site">On-site</option>
                    </select>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1 warranty-fields">
                <label class="form-label">Warranty Period</label>
                    <input type="text" class="form-control warrantyPeriod" placeholder="">
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-2">
                <label class="form-label">Has Warranty</label><br><br>
                <div class="d-flex align-items-center">
                    <label class="form-label">No</label>
                    <label class="switch mx-2">
                        <input type="checkbox" class="form-check-input primary warrantySwitch" id="" value="" name="hasWarranty" checked>
                        <span class="slider round"></span>
                    </label>
                    <label class="form-label">Yes</label>
                </div>
                </div>
            <div class="form-group col-md-2 ml-auto position-relative">
                <button type="button" class="btn btn-sm btn-danger btn-remove" style="position: absolute; left: -35%; top: 50%; transform: translateY(25%);">Remove</button>
            </div>
            </div>
        </div>
            `
        );
        initializeSelect2();
        __product();
        autoCompute();
        toggleWarrantyFields();
    });

    autoCompute();

    $('.particulars').on('click', '.btn-remove', function(e) {
        e.preventDefault();
        $(this).closest('.addListParticulars').remove();
        calculateGrandTotal();
    });

    $(".btn_create").unbind("click").on("click", function(){
        // console.log("clicked")

        const particulars = [];
        const product = $(".product");
        const cost = $(".cost");
        const quantity = $(".quantity");
        const hasWarranty = $("input:checkbox[name=hasWarranty]");
        const warrantyType = $(".warrantyType");
        const warrantyMethod = $(".warrantyMethod");
        const warrantyPeriod = $(".warrantyPeriod");

        for (var i = 0; i < product.length; i++) {
          const particularsList = {};
          particularsList.product = $(product[i]).val();
          particularsList.cost = $(cost[i]).val();
          particularsList.quantity = $(quantity[i]).val();
          particularsList.hasWarranty = $(hasWarranty[i]).is(":checked");
          particularsList.warrantyDetails = {
            warrantyType: $(warrantyType[i]).val(),
            warrantyMethod: $(warrantyMethod[i]).val(),
            warrantyPeriod: $(warrantyPeriod[i]).val()
          };
          particulars.push(particularsList);
        }

        var required = ["invoiceNumber", "vendor", "vendorPoc", "totalCost", "description", "deliveryStatus", "deliveryId", "product", "cost", "quantity"];
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
                "purchaseOrder": {

                    "transactionId"         : "",
                    "invoiceNumber"         : $(".invoiceNumber").val(),
                    "vendorId"              : $(".vendor").val(),
                    "vendorContactId"       : $(".vendorPoc").val(),
                    "totalCost"             : $(".totalCost").val(),
                    "description"           : $(".description").val(),
                    "isPaid"                : $("input:checkbox[name=paid]").is(":checked"),
                    "invoiceStatus"         : $(".invoiceStatus").val(),
                    "id"                    : "",
                    "createdBy"             : $.cookie("uuid"),
                    "createdDate"           : "",
                    "updatedBy"             : "",
                    "updatedDate"           : "",
                    "status"                : true

                },
              "purchaseOrderParticularsDtos": []
            };
            for (var i = 0; i < particulars.length; i++) {
                var particular = particulars[i];

                var purchaseOrderParticular = {
                    "transactionId"         : "",
                    "purchaseOrderId"       : "",
                    "productId"             : particular.product,
                    "productDetails"        : {
                        "product"       : {
                            "name"          : "",
                            "description"   : "",
                            "id"            : "",
                            "createdBy"     : "",
                            "createdDate"   : "",
                            "updatedBy"     : "",
                            "updatedDate"   : "",
                            "status"        : true
                    },
                    "category"              : [
                            {
                                "name"          : "",
                                "assetType"     : "",
                                "consumable"    : "",
                                "id"            : "",
                                "createdBy"     : "",
                                "createdDate"   : "",
                                "updatedBy"     : "",
                                "updatedDate"   : "",
                                "status"        : true
                            }
                        ]
                    },
                    "cost"                  : particular.cost,
                    "quantity"              : particular.quantity,
                    "hasWarranty"           : particular.hasWarranty,
                    "warrantyDetails"       : JSON.stringify(particular.warrantyDetails),
                    "id"                    : "",
                    "createdBy"             : $.cookie("uuid"),
                    "createdDate"           : "",
                    "updatedBy"             : "",
                    "updatedDate"           : "",
                    "status"                : true
                };

                payload.purchaseOrderParticularsDtos.push(purchaseOrderParticular);
            }

            console.log(payload);

                __executeExternalPost('3000/purchase-order/new',JSON.stringify(payload)).done(function (result) {
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

var purchaseOrderUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var orderId = GetURLParameter('orderId');

    __executeExternalPost('3000/purchase-order/get-receipt/'+orderId).done(function (result) {
        // console.log(result);
        var result = result.response;
        if (result.status != "ERROR") {
            result.forEach(function(data){
                // console.log(data);
                var receiptType = data.receiptType;
                var receiptNumber = data.receiptNumber;
                // console.log(orderUuid)
                var orderUuid;
                    if (receiptType === "Sales Invoice" && receiptNumber !== "") {
                        orderUuid = "SI-"+orderId+"-"+receiptNumber;
                        $(".btn_uploadCr").hide();
                    } else if (receiptType === "Delivery Receipt" && receiptNumber !== ""){
                        orderUuid = "DR-"+orderId+"-"+receiptNumber;
                        $(".btn_uploadCr").show();
                    } else if (receiptType === "Collection Receipt" && receiptNumber !== ""){
                        orderUuid = "CR-"+orderId+"-"+receiptNumber;
                    } else {
                        console.log("Unknown")
                    }
                    __executeExternalGet('8080/file/list/'+orderUuid).done(function (result) {
                        console.log(result)
                        result.files.forEach(function(data){
                        let actions = "<a href="+api+'8080/file/download/'+data.id+"><button class='btn btn-info btn-download' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-download'></i> Download</button></a> <a href="+api+'8080/file/view/'+data.id+"><button class='btn btn-success btn-download' data-id='"+data.id+"' data-file_path='"+data.filePath+"' data-file_name='"+data.fileName+"'><i class='fa fa-eye'></i> View</button></a>";
                            $('.table_body').append("<tr>"+
                                "<td></td>"+
                                "<td>"+data.fileName+"</td>"+
                                "<td>"+data.type+"</td>"+
                                "<td class='actions'> "+actions+"")
                        });
                    })
            });
        }else{
            console.log("error")
        }
    })

    // computeResult();

    var fields = ["invoiceNumber", "vendor", "vendorPoc", "description", "invoiceStatus", "btn-add", "isPaid"];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "vendor" || fieldName === "vendorPoc" || fieldName === "invoiceStatus" || fieldName === "btn-add" || fieldName === "isPaid") {
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
                if (fieldName === "vendor" || fieldName === "vendorPoc" || fieldName === "invoiceStatus" || fieldName === "btn-add" || fieldName === "isPaid") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });
        $(".particulars .addListParticulars .cost").prop('readonly', false);
        $(".particulars .addListParticulars .quantity").prop('readonly', false);
        $(".particulars .addListParticulars .warrantyPeriod").prop('readonly', false);
        $(".particulars .addListParticulars .warrantyType").prop('disabled', false);
        $(".particulars .addListParticulars .warrantyMethod").prop('disabled', false);
        $(".particulars .addListParticulars .product").prop('disabled', false);
        $(".particulars .addListParticulars .btn-remove").prop('disabled', false);
        $(".particulars .addListParticulars .warrantySwitch").prop('disabled', false);
        $(".btn-edit").hide();
        $(".btn_update").show();
    })

    $(".btn_uploadInvoice").unbind("click").on("click", function(){
        window.location.href = 'http://localhost/ams/upload_salesInvoice?orderId='+orderId;
    })
    $(".btn_Dr").unbind("click").on("click", function(){
        window.location.href = 'http://localhost/ams/upload_deliveryReceipt?orderId='+orderId;
    })
    $(".btn_uploadCr").unbind("click").on("click", function(){
        window.location.href = 'http://localhost/ams/upload_collectionReceipt?orderId='+orderId;
    })

    var __product = function(){
        $('.product').empty();
        __executeExternalGet('3000/product/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                var result = result.response;
                $('.product').append("<option selected disabled> - - Select - - </option>");
                result.forEach(function(data){
                    var data = data.product;
                    // console.log(data)
                    $('.product').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    // __product();

    var __vendor = function(){
        $('.vendor').empty();
        __executeExternalGet('3000/vendor/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.vendor').append("<option selected disabled> - - Select - - </option>");
                result.response.forEach(function(data){
                    $('.vendor').append(
                        "<option value="+data.id+" data-id="+data.id+" data-name="+data.name+">"+data.name+"</option>");

                });
            } else {
                console.log("failed fetching user roles list")
            }
        })
    }
    __vendor();

    var grandTotal = 0;
    // toggleWarrantyFields();
    $(".btn-add").unbind("click").on("click", function(){
        // console.log("clicked");
        $(".particulars").append(`
        <div class="form-row">
            <div class="col-12 addListParticulars d-flex align-items-center" style="margin-top: 20px" id="divParticulars">
                <div class="form-group col-md-2">
                <label class="form-label">Product</label>
                    <select class="custom-select product select2">
                    </select>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1">
                    <label class="form-label">Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Php</span>
                        </div>
                        <input type="text" class="form-control cost" placeholder="">
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1">
                <label class="form-label">Quantity</label>
                    <input type="text" class="form-control quantity" placeholder="">
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1">
                    <label class="form-label">Total Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Php</span>
                        </div>
                        <input type="text" class="form-control particularCost" placeholder="" readonly>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-2 warranty-fields">
                <label class="form-label">Warranty Type</label>
                    <select class="custom-select warrantyType select2">
                        <option selected disabled>Select</option>
                        <option value="None">None</option>
                        <option value="Parts Only">Parts Only</option>
                        <option value="Service Only">Service Only</option>
                        <option value="Parts and Services">Parts and Services</option>
                    </select>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-2 warranty-fields">
                <label class="form-label">Warranty Method</label>
                    <select class="custom-select warrantyMethod select2">
                        <option selected disabled>Select</option>
                        <option value="None">None</option>
                        <option value="Carry-in">Carry-in</option>
                        <option value="Pick-Up">Pick-Up</option>
                        <option value="On-site">On-site</option>
                    </select>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-1 warranty-fields">
                <label class="form-label">Warranty Period</label>
                    <input type="text" class="form-control warrantyPeriod" placeholder="">
                    <div class="clearfix"></div>
                </div>
                <div class="form-group col-md-2">
                <label class="form-label">Has Warranty</label><br><br>
                <div class="d-flex align-items-center">
                    <label class="form-label">No</label>
                    <label class="switch mx-2">
                        <input type="checkbox" class="form-check-input primary warrantySwitch" id="" value="" name="hasWarranty" checked>
                        <span class="slider round"></span>
                    </label>
                    <label class="form-label">Yes</label>
                </div>
                </div>
            <div class="form-group col-md-2 ml-auto position-relative">
                <button type="button" class="btn btn-sm btn-danger btn-remove" style="position: absolute; left: -35%; top: 50%; transform: translateY(25%);">Remove</button>
            </div>
            </div>
        </div>
            `
        );
        initializeSelect2();
        __product();
        autoCompute();
        toggleWarrantyFields();
    });

    autoCompute();


    $('.particulars').on('click', '.btn-remove', function(e) {
        e.preventDefault();
        $(this).closest('.addListParticulars').remove();
        calculateGrandTotal();
    });

__executeExternalGet('3000/purchase-order/'+orderId).done(function (result) {

    if (result.status != "ERROR") {
        // console.log(result);
        var result = result.response;
            // console.log(result);
            var __vendorPOC = function(){
                $('.vendorPoc').empty();
                __executeExternalGet('3000/vendor/contact/list/'+result.purchaseOrder.vendorContactId).done(function (result) {
                    // console.log(result)
                    if (result.status != "ERROR") {
                        $('.vendorPoc').append("<option selected disabled> - - Select - - </option>");
                        result.response.forEach(function(data){
                            var name = data.firstName + " " + data.middleName + " " + data.lastName + " " + data.suffix;
                            $('.vendorPoc').append(
                                "<option value="+data.id+" data-id="+data.id+">"+name+"</option>");

                        });
                    } else {
                        console.log("failed fetching user roles list")
                    }
                })
            }
            __vendorPOC();

        var totalCostParticulars = 0;
        // console.log(result);     
        $(".invoiceNumber").val(result.purchaseOrder.invoiceNumber);
        setTimeout(function () {
            $(".vendor").val(result.purchaseOrder.vendorId).trigger("change");
            $(".vendorPoc").val(result.purchaseOrder.vendorContactId).trigger("change");
            $(".invoiceStatus").val(result.purchaseOrder.invoiceStatus).trigger("change");
        }, 500 );
        $(".description").val(result.purchaseOrder.description);
        $(".deliveryStatus").val(result.purchaseOrder.deliveryStatus);
        $(".deliveryId").val(result.purchaseOrder.deliveryId);
        $("input:checkbox[name=paid]").prop("checked", result.purchaseOrder.isPaid);
        $(".totalCost").val("Php " + result.purchaseOrder.totalCost.toFixed(2));

        __product();
        result.purchaseOrderParticularsDtos.forEach(function(data){
            // console.log(data)
            var productDetails = data.productDetails;
            var product = productDetails.product;
            let value;
                switch (data.hasWarranty) {
                case true:
                    value = "checked";
                    break;
                default:
                    value = "";
                    break;
            }
            $(".particulars").append(`
                <div class="form-row">
                    <div class="col-12 addListParticulars d-flex align-items-center" style="margin-top: 20px">
                        <div class="form-group col-md-2">
                        <label class="form-label">Product</label>
                            <select class="custom-select product select2">
                            <option value="${product.id}" selected>${product.name}</option>
                            </select>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-1">
                            <label class="form-label">Cost</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Php</span>
                                </div>
                                <input type="text" class="form-control cost" value="${data.cost}">
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-1">
                        <label class="form-label">Quantity</label>
                            <input type="text" class="form-control quantity" placeholder="" value="${data.quantity}">
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-1">
                            <label class="form-label">Total Cost</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Php</span>
                                </div>
                                <input type="text" class="form-control particularCost" placeholder="" readonly>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2 warranty-fields">
                            <label class="form-label">Warranty Type</label>
                            <select class="custom-select warrantyType select2" onchange="saveWarrantyType(this.value)">
                                <option value="None" ${JSON.parse(data.warrantyDetails).warrantyType === 'None' ? 'selected' : ''}>None</option>
                                <option value="Parts Only" ${JSON.parse(data.warrantyDetails).warrantyType === 'Parts Only' ? 'selected' : ''}>Parts Only</option>
                                <option value="Service Only" ${JSON.parse(data.warrantyDetails).warrantyType === 'Service Only' ? 'selected' : ''}>Service Only</option>
                                <option value="Parts and Services" ${JSON.parse(data.warrantyDetails).warrantyType === 'Parts and Services' ? 'selected' : ''}>Parts and Services</option>
                            </select>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2 warranty-fields">
                            <label class="form-label">Warranty Method</label>
                            <select class="custom-select warrantyMethod select2" onchange="saveWarrantyMethod(this.value)">
                                <option value="None" ${JSON.parse(data.warrantyDetails).warrantyMethod === 'None' ? 'selected' : ''}>None</option>
                                <option value="Carry-in" ${JSON.parse(data.warrantyDetails).warrantyMethod === 'Carry-in' ? 'selected' : ''}>Carry-in</option>
                                <option value="Pick-Up" ${JSON.parse(data.warrantyDetails).warrantyMethod === 'Pick-Up' ? 'selected' : ''}>Pick-Up</option>
                                <option value="On-site" ${JSON.parse(data.warrantyDetails).warrantyMethod === 'On-site' ? 'selected' : ''}>On-site</option>
                            </select>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-1 warranty-fields">
                        <label class="form-label">Warranty Period</label>
                            <input type="text" class="form-control warrantyPeriod" placeholder="" value="${JSON.parse(data.warrantyDetails).warrantyPeriod}">
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2">
                        <label class="form-label">Has Warranty</label><br><br>
                        <div class="d-flex align-items-center">
                            <label class="form-label">No</label>
                            <label class="switch mx-2">
                                <input type="checkbox" class="form-check-input primary warrantySwitch" id="" 
                                ${value} name="hasWarranty">
                                <span class="slider round"></span>
                            </label>
                            <label class="form-label">Yes</label>
                        </div>
                        </div>
                    <div class="form-group col-md-2 ml-auto position-relative">
                        <button type="button" class="btn btn-sm btn-danger btn-remove" style="position: absolute; left: -35%; top: 50%; transform: translateY(25%);">Remove</button>
                    </div>
                    </div>
                </div>
                `
            );
            initializeSelect2();
            autoCompute();
            toggleWarrantyFields();
            $(".particulars .addListParticulars").each(function () {
                const $particular = $(this);
                const cost = $particular.find('.cost').val();
                const quantity = $particular.find('.quantity').val();
                const totalCost = cost * quantity || 0;
                $particular.find('.particularCost').val(totalCost);
                $particular.find('.cost').prop('readonly', true);
                $particular.find('.warrantyPeriod').prop('readonly', true);
                $particular.find('.btn-remove').prop('disabled', true);
                $particular.find('.quantity').prop('readonly', true);
            });
                $(".particulars .addListParticulars .warrantyType").prop('disabled', true);
                $(".particulars .addListParticulars .warrantyMethod").prop('disabled', true);
                $(".particulars .addListParticulars .product").prop('disabled', true);
                $(".particulars .addListParticulars .warrantySwitch").prop('disabled', true);

        })
            
    }else
    {
        console.log("ERROR")
    }


    $(".btn_update").unbind("click").on("click", function(){
        // console.log("clicked")
        const particulars = [];
        const product = $(".product");
        const cost = $(".cost");
        const quantity = $(".quantity");
        const hasWarranty = $("input:checkbox[name=hasWarranty]");
        const warrantyType = $(".warrantyType");
        const warrantyMethod = $(".warrantyMethod");
        const warrantyPeriod = $(".warrantyPeriod");

        for (var i = 0; i < product.length; i++) {
          const particularsList = {};
          particularsList.product = $(product[i]).val();
          particularsList.cost = $(cost[i]).val();
          particularsList.quantity = $(quantity[i]).val();
          particularsList.hasWarranty = $(hasWarranty[i]).is(":checked");
          particularsList.warrantyDetails = {
            warrantyType: $(warrantyType[i]).val(),
            warrantyMethod: $(warrantyMethod[i]).val(),
            warrantyPeriod: $(warrantyPeriod[i]).val()
          };
          particulars.push(particularsList);
        }

        console.log(particulars)
        var required = ["invoiceNumber", "vendor", "vendorPoc", "totalCost", "description", "deliveryStatus", "deliveryId", "product", "cost", "quantity", "warrantyDetails"];
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
                "purchaseOrder": {

                    "transactionId"         : result.purchaseOrder.transactionId,
                    "invoiceNumber"         : $(".invoiceNumber").val(),
                    "vendorId"              : $(".vendor").val(),
                    "vendorContactId"       : $(".vendorPoc").val(),
                    "totalCost"             : $(".totalCost").val(),
                    "description"           : $(".description").val(),
                    "isPaid"                : $("input:checkbox[name=paid]").is(":checked"),
                    "invoiceStatus"         : $(".invoiceStatus").val(),
                    "id"                    : orderId,
                    "createdBy"             : $.cookie("uuid"),
                    "createdDate"           : "",
                    "updatedBy"             : $.cookie("uuid"),
                    "updatedDate"           : "",
                    "status"                : true

                },
              "purchaseOrderParticularsDtos": []
            };
            for (var i = 0; i < particulars.length; i++) {
                var particular = particulars[i];
                var purchaseOrderParticular = {
                    "purchaseOrderId"       : orderId,
                    "productId"             : particular.product,
                    "cost"                  : particular.cost,
                    "quantity"              : particular.quantity,
                    "hasWarranty"           : particular.hasWarranty,
                    "warrantyDetails"       : JSON.stringify(particular.warrantyDetails),
                    "id"                    : "",
                    "createdBy"             : $.cookie("uuid"),
                    "createdDate"           : "",
                    "updatedBy"             : $.cookie("uuid"),
                    "updatedDate"           : "",
                    "status"                : true
                };

                payload.purchaseOrderParticularsDtos.push(purchaseOrderParticular);
            }

            console.log(payload);

                __executeExternalPost('3000/purchase-order/edit/'+orderId,JSON.stringify(payload)).done(function (result) {
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
                                // window.location.reload(true);
                            }, 500);
                        }, 2000);
                    }
                })
        }

    });
});
}


