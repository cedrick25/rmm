function initializeSelect2() {
  $('.product').select2({
    width: '100%'
  });
}

function calculateGrandTotal() {
    // Reset the grand total
    grandTotal = 0;

    // Loop through all the particular total costs and add them to the grand total
    $(".totalCost").each(function() {
        var totalCost = parseFloat($(this).val().replace("Php", "")) || 0;
        grandTotal += totalCost;
    });

    // Update the grand total display
    $(".estimatedTotal").val(grandTotal.toFixed(2));
}

function autoCompute(){
    $(".particulars").on("input", ".addListParticulars .estimatedQuantity, .addListParticulars .estimatedCost", function() {
        var $row = $(this).closest(".addListParticulars");
        var quantity = parseFloat($row.find(".estimatedQuantity").val()) || 0;
        var cost = parseFloat($row.find(".estimatedCost").val().replace("Php", "")) || 0;
        var totalCost = quantity * cost;
        $row.find(".totalCost").val(totalCost.toFixed(2));

        calculateGrandTotal();
    });
}

var purchaseRequestList = function() {
    // console.log(___ctx)
    // console.log("testList");

    $(".btn-create").unbind("click").on("click", function(){
    // console.log("clicked")
    window.location.href = 'http://localhost/ams/purchase_request_create';
    })
    __executeExternalGet('3000/purchase-request/list/0/300').done(function (result) {
    if (result.status != "ERROR") {
        console.log(result)
        result.response.content.forEach(function(data){
            // console.log(data)
            let actions = "<button class='btn btn-info btn_update client_update viewPurchaserequest' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather feather icon-eye'></i> View</button> <button class='btn btn-danger btn_remove removePurchaseRequest' type='submit' data-id='"+data.id+"' style='display:none;'><i class='feather icon-x-square'></i> Remove</button>";
                var peso = "\u20B1 " + data.estimatedTotal;
                $('.table_head').append("<tr>"+
                    "<td></td>"+
                    "<td>"+$.cookie("name")+"</td>"+
                    "<td>"+data.description+"</td>"+
                    "<td>"+data.subject+"</td>"+
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
                var purchaseId  = $(this).data("id");
                // console.log(permissionId)
                window.location.href = 'http://localhost/ams/purchase_request_update?purchaseId='+purchaseId;
            })
            $(".btn_remove").unbind("click").on("click", function(){
                // console.log("clicked")
                var purchaseId   = $(this).data("id");
                // console.log(permissionId)
                $('#removeModal').modal('show')
                $(".btn_remove_confirm").unbind("click").on("click", function(){
                    __executeExternalPost('3000/purchase-request/remove/'+purchaseId).done(function (result) {
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
    }
    else
    {
        console.log("ERROR")
    }
    })
}

var purchaseRequestCreate = function() {
    // console.log(___ctx)
    // console.log("testCreate");
    // console.log($.cookie("fieldOfficeId"))

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

    $(".department").val($.cookie("departmentName"));
    $(".actor").val($.cookie("name"));

    var grandTotal = 0;

    $(".initialParticular").on("input", "#qty, #cost", function() {
        var quantity = parseFloat($("#qty").val()) || 0;
        var cost = parseFloat($("#cost").val().replace("Php", "")) || 0;
        var totalCost = quantity * cost;

        $("#partCost").val(totalCost.toFixed(2));
        calculateGrandTotal();
    });

    $(".btn-add").unbind("click").on("click", function(){
        // console.log("clicked");
        $(".particulars").append(`
            <div class=" col-12 addListParticulars" style="margin-top: 20px">
                <div class="form-row">
                    <div class="form-group col-md-3">
                    <label class="form-label">Product</label>
                        <select class="custom-select product select2">
                        </select>
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2">
                    <label class="form-label">Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Php</span>
                        </div>
                        <input type="text" class="form-control estimatedCost" placeholder="">
                    </div>
                    <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-1">
                    <label class="form-label">Quantity</label>
                        <input type="text" class="form-control estimatedQuantity" placeholder="">
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2">
                        <label class="form-label">Total Cost</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Php</span>
                            </div>
                            <input type="text" class="form-control totalCost" placeholder="" readonly>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="form-group col-md-2">
                    <label class="form-label">Remarks</label>
                        <input type="text" class="form-control remarks" placeholder="">
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2 ml-auto position-relative">
                        <button type="button" class="btn btn-sm btn-danger btn-remove" style="position: absolute; left: 70%; top: 50%; transform: translateY(-50%);">Remove</button>
                    </div>
                </div>
            </div>
            `
        );
        initializeSelect2();
        __product();
        autoCompute();
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
        const estimatedCost = $(".estimatedCost");
        const estimatedQuantity = $(".estimatedQuantity");
        const remarks = $(".remarks");

        for(var i = 0; i < product.length; i++){
            const particularsList = {};
            particularsList.product = $(product[i]).val();
            particularsList.estimatedCost = $(estimatedCost[i]).val();
            particularsList.estimatedQuantity = $(estimatedQuantity[i]).val();
            particularsList.remarks = $(remarks[i]).val();
            particulars.push(particularsList);
        }

        // console.log(particulars)
        var required = ["subject", "description", "estimatedTotal", "product", "estimatedCost", "estimatedQuantity", "remarks"];
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
              "purchaseRequest": {
                "departmentId"          : $.cookie("departmentId"),
                "actorId"               : $.cookie("uuid"),
                "subject"               : $(".subject").val(),
                "description"           : $(".description").val(),
                "estimatedTotal"        : $(".estimatedTotal").val(),
                "decisionStatus"        : "",
                "decisionRemarks"       : "",
                "decisionMakerId"       : "",
                "id"                    : "",
                "createdBy"             : "",
                "createdDate"           : "",
                "updatedBy"             : "",
                "updatedDate"           : "",
                "status"                : true
              },
              "purchaseRequestParticularsDtos": []
            };

            for (var i = 0; i < particulars.length; i++) {
                var particular = particulars[i];

                var purchaseRequestParticular = {
                    "purchaseRequestId"     : "",
                    "productId"             : particular.product,
                    "estimatedCost"         : particular.estimatedCost,
                    "estimatedQuantity"     : particular.estimatedQuantity,
                    "remarks"               : particular.remarks,
                    "decisionStatus"        : "",
                    "decisionRemarks"       : "",
                    "id"                    : "",
                    "createdBy"             : "",
                    "createdDate"           : "",
                    "updatedBy"             : "",
                    "updatedDate"           : "",
                    "status"                : true
                };

                payload.purchaseRequestParticularsDtos.push(purchaseRequestParticular);
            }

            console.log(payload);

            __executeExternalPost('3000/purchase-request/new',JSON.stringify(payload)).done(function (result) {
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

var purchaseRequestUpdate = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var purchaseId = GetURLParameter('purchaseId');
// console.log(permissionId);
    
    var __product = function(){
        // $('.product').empty();
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


    var grandTotal = 0;

    $(".btn-add").unbind("click").on("click", function(){
        // console.log("clicked");
        $(".particulars").append(`
            <div class=" col-12 addListParticulars" style="margin-top: 20px">
                <div class="form-row">
                    <div class="form-group col-md-3">
                    <label class="form-label">Product</label>
                        <select class="custom-select product select2">
                        </select>
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2">
                    <label class="form-label">Cost</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Php</span>
                        </div>
                        <input type="text" class="form-control estimatedCost" placeholder="">
                    </div>
                    <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-1">
                    <label class="form-label">Quantity</label>
                        <input type="text" class="form-control estimatedQuantity" placeholder="">
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2">
                    <label class="form-label">Total Cost</label>
                        <input type="text" class="form-control totalCost" placeholder="" readonly>
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2">
                    <label class="form-label">Remarks</label>
                        <input type="text" class="form-control remarks" placeholder="">
                        <div class="clearfix"></div>
                    </div>
                    <div class="form-group col-md-2 ml-auto position-relative">
                        <button type="button" class="btn btn-sm btn-danger btn-remove" style="position: absolute; left: 70%; top: 50%; transform: translateY(-50%);">Remove</button>
                    </div>
                </div>
            </div>
            `
        );
        initializeSelect2();
        __product();
        autoCompute();
        
    });

    autoCompute();

    $('.particulars').on('click', '.btn-remove', function(e) {
        e.preventDefault();
        $(this).closest('.addListParticulars').remove();
        calculateGrandTotal();
    });

    var fields = ["subject", "description", "btn-add", ];
    fields.forEach(function(fieldName) {
        var elements = document.getElementsByClassName(fieldName);
            for (var i = 0; i < elements.length; i++) {
                if (fieldName === "btn-add") {
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
                if (fieldName === "btn-add") {
                    elements[i].disabled = false;
                } else {
                    elements[i].readOnly = false; 
                }
            }
        });
        $(".particulars .addListParticulars .estimatedCost").prop('readonly', false);
        $(".particulars .addListParticulars .estimatedQuantity").prop('readonly', false);
        $(".particulars .addListParticulars .remarks").prop('readonly', false);
        $(".particulars .addListParticulars .product").prop('disabled', false);
        $(".particulars .addListParticulars .btn-remove").prop('disabled', false);
        $(".btn-edit").hide();
        $(".btn-update").show();
    })

__executeExternalGet('3000/purchase-request/'+purchaseId).done(function (result) {

    if (result.status != "ERROR") {
        var result = result.response;
        console.log(result);
        $(".department").val($.cookie("departmentName"));
        $(".actor").val($.cookie("name"));
        $(".subject").val(result.purchaseRequest.subject);
        $(".description").val(result.purchaseRequest.description);
        $(".estimatedTotal").val(result.purchaseRequest.estimatedTotal);

        result.purchaseRequestParticularsDtos.forEach(function(data){
            $(".particulars").append(`
                <div class=" col-12 addListParticulars" style="margin-top: 20px">
                    <div class="form-row">
                        <div class="form-group col-md-3">
                        <label class="form-label">Product</label>
                            <select class="custom-select product select2" value="${data.productId}">
                            </select>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2">
                        <label class="form-label">Cost</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Php</span>
                            </div>
                            <input type="text" class="form-control estimatedCost" placeholder="" value="${data.estimatedCost}">
                        </div>
                        <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-1">
                        <label class="form-label">Quantity</label>
                            <input type="text" class="form-control estimatedQuantity" placeholder="" value="${data.estimatedQuantity}">
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2">
                        <label class="form-label">Total Cost</label>
                            <input type="text" class="form-control totalCost" placeholder="" readonly>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2">
                        <label class="form-label">Remarks</label>
                            <input type="text" class="form-control remarks" placeholder="" value="${data.remarks}">
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group col-md-2 ml-auto position-relative">
                            <button type="button" class="btn btn-sm btn-danger btn-remove" style="position: absolute; left: 70%; top: 50%; transform: translateY(-50%);">Remove</button>
                        </div>
                    </div>
                </div>
                `
            );
            initializeSelect2();
            // __product();
            $(".particulars .addListParticulars .product").prop('disabled', true);
            $(".particulars .addListParticulars").each(function () {
                const $particular = $(this);
                const cost = $particular.find('.estimatedCost').val();
                const quantity = $particular.find('.estimatedQuantity').val();
                const totalCost = cost * quantity || 0;
                $particular.find('.totalCost').val(totalCost);
                $particular.find('.estimatedCost').prop('readonly', true);
                $particular.find('.estimatedQuantity').prop('readonly', true);
                $particular.find('.remarks').prop('readonly', true);
                $particular.find('.btn-remove').prop('disabled', true);
            });

        })

    }else
    {
        console.log("ERROR")
    }
})

$(".btn-update").unbind("click").on("click", function(){
    // console.log("clicked")

    const particulars = [];
    const product = $(".product");
    const estimatedCost = $(".estimatedCost");
    const estimatedQuantity = $(".estimatedQuantity");
    const remarks = $(".remarks");

    for(var i = 0; i < product.length; i++){
        const particularsList = {};
        particularsList.product = $(product[i]).val();
        particularsList.estimatedCost = $(estimatedCost[i]).val();
        particularsList.estimatedQuantity = $(estimatedQuantity[i]).val();
        particularsList.remarks = $(remarks[i]).val();
        particulars.push(particularsList);
    }

    var required = ["subject", "description", "estimatedTotal", "product", "estimatedCost", "estimatedQuantity", "remarks"];
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
          "purchaseRequest": {
            "departmentId"          : $.cookie("departmentId"),
            "actorId"               : $.cookie("uuid"),
            "subject"               : $(".subject").val(),
            "description"           : $(".description").val(),
            "estimatedTotal"        : $(".estimatedTotal").val(),
            "decisionStatus"        : "",
            "decisionRemarks"       : "",
            "decisionMakerId"       : "",
            "id"                    : purchaseId,
            "createdBy"             : "",
            "createdDate"           : "",
            "updatedBy"             : "",
            "updatedDate"           : "",
            "status"                : true
          },
          "purchaseRequestParticularsDtos": []
        };

        for (var i = 0; i < particulars.length; i++) {
            var particular = particulars[i];

            var purchaseRequestParticular = {
                "purchaseRequestId"     : purchaseId,
                "productId"             : particular.product,
                "estimatedCost"         : particular.estimatedCost,
                "estimatedQuantity"     : particular.estimatedQuantity,
                "remarks"               : particular.remarks,
                "decisionStatus"        : "",
                "decisionRemarks"       : "",
                "id"                    : "",
                "createdBy"             : "",
                "createdDate"           : "",
                "updatedBy"             : "",
                "updatedDate"           : "",
                "status"                : true
            };

            payload.purchaseRequestParticularsDtos.push(purchaseRequestParticular);
        }

        console.log(payload);

        __executeExternalPost('3000/purchase-request/edit/'+purchaseId,JSON.stringify(payload)).done(function (result) {
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
