function initializeSelect2() {
  $('.deliveryStatus').select2({
    width: '100%'
  });
}

var purchaseOrderUpload_SI = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var orderId = GetURLParameter('orderId');

    // console.log(orderId)

__executeExternalGet('3000/purchase-order/'+orderId).done(function (result) {

    if (result.status != "ERROR") {
    // console.log(result);
    var result = result.response;
        // console.log(result);
        $(".btn_uploadInvoice").unbind("click").on("click", function(){
        // console.log("clicked")
            // var purchaseId = result.purchaseOrder.id;
            // console.log(orderId);
            var fileToUpload = $('#fileupload').prop('files')[0];
            // console.log(fileToUpload);
            if (fileToUpload === undefined) {
                alert("Please Choose File Before Upload!")
            }else {
                var form = new FormData();
                form.append("file", fileToUpload, fileToUpload.name);

                var settings = {
                    "url": "http://localhost:8080/file/upload?uuid="+"SI-"+orderId+"-"+$(".invoiceNumber").val()+"&type=sales_invoice&createdby="+$.cookie('uuid')+"&version=0&kind=sales_invoice",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
                console.log(settings);
                $.ajax(settings).done(function (response) {
                    // console.log(response);
                    if (response) {
                        // $('#success_upload').show();
                        setTimeout(function () {
                            $('#success_upload').hide();
                            window.location.reload(true);
                        }, 2000);
                    } else {

                    }
                });
            }
            var payload = {
                    "id"                            : "",
                    "createdBy"                     : $.cookie("uuid"),
                    "createdDate"                   : "",
                    "updatedBy"                     : "",
                    "updatedDate"                   : "",
                    "status"                        : true,
                    "purchaseOrderId"               : orderId,
                    "receiptType"                   : "Sales Invoice",
                    "receiptNumber"                 : $(".invoiceNumber").val(),
                    "receiptStatus"                 : ""
            }
            // console.log(payload);
            __executeExternalPost('3000/purchase-order/new-receipt/'+orderId,JSON.stringify(payload)).done(function (result) {
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
        })
    }else{
        console.log("error")
    }
})
}

var purchaseOrderUpload_DR = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var orderId = GetURLParameter('orderId');

    // console.log(orderId)

__executeExternalGet('3000/purchase-order/'+orderId).done(function (result) {

    if (result.status != "ERROR") {
    // console.log(result);
    var result = result.response;
        // console.log(result);
        // var vendorId = result.purchaseOrder.vendorId;
        var deliveryRowCounter = 0;
        $(".btn-addDr").unbind("click").on("click", function(){
            // console.log("clicked");
            deliveryRowCounter++;
            var deliveryIdentifier = "delivery_" + deliveryRowCounter;
            $(".multipleDr").append(`
                <div class="form-row">
                    <div class="col-12 addMoreDr">
                        <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Delivery Number</label>
                            <input type="text" name="type" class="form-control deliveryNumberUpload"  placeholder=""/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Delivery Status</label>
                            <select class="custom-select deliveryStatus select2">
                                <option value="null" selected disabled>Select</option>
                                <option value="Partial Delivery">Partial Delivery</option>
                                <option value="Complete Delivery">Complete Delivery</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">        
                            <label for="text-input" class="form-control-label">Upload File</label>
                            <input type="file" name="fileupload_${deliveryIdentifier}" class="form-control-file fileupload" data-delivery-id="${deliveryIdentifier}" id="fileupload">
                        </div>
                        <div class="form-group col-md-12">
                        <button type="button" class="btn btn-sm btn-danger btn-remove float-right">Remove</button
                        </div>
                    </div>
                </div>
                `
            )
        });
        $('.multipleDr').on('click', '.btn-remove', function(e) {
            e.preventDefault();
            $(this).closest('.addMoreDr').remove();
        });
        $(".btn_uploadDr").unbind("click").on("click", function(){
            // console.log("clicked")
            // console.log(orderId);
            var fileToUpload = $('#fileupload').prop('files')[0];
            // console.log(fileToUpload);
                var fileInputs = document.getElementsByClassName("fileupload");
                var uploadDeliveryReceipts = [];

                for (var i = 0; i < fileInputs.length; i++) {
                    var fileToUpload = fileInputs[i].files[0];
                    var deliveryId = fileInputs[i].getAttribute("data-delivery-id");

                    if (fileToUpload !== undefined) {
                        var form = new FormData();
                        form.append("file", fileToUpload, fileToUpload.name);

                        var settings = {
                            "url": "http://localhost:8080/file/upload?uuid="+"DR-"+orderId+"-"+$(".deliveryNumberUpload").eq(i).val()+"&type=delivery_receipt&createdby="+$.cookie('uuid')+"&version=0&kind=delivery_receipt",
                            "method": "POST",
                            "timeout": 0,
                            "processData": false,
                            "mimeType": "multipart/form-data",
                            "contentType": false,
                            "data": form
                        };
                        // console.log(settings)
                        var uploadedDr = $.ajax(settings).done(function (response) {
                            // if (response) {
                            //     $('#success_upload').show();
                            //     setTimeout(function () {
                            //         $('#success_upload').hide();
                            //         // window.location.reload(true);
                            //     }, 2000);
                            // } else {

                            // }
                        });

                        uploadDeliveryReceipts.push(uploadedDr);
                        // console.log(uploadDeliveryReceipts);
                    }
                }
                    $.when.apply($, uploadDeliveryReceipts).done(function () {
                        $('#success_upload').show();
                            setTimeout(function () {
                                $('#success_upload').hide();
                                // localStorage.setItem("delivery_uuid", uuid);
                                window.location.href = 'http://localhost/ams/purchase_order_update?orderId='+orderId;
                                // window.location.reload(true);
                            }, 2000);
                    });

                    const uploadDetails = [];
                    const deliveryNumberUpload = $(".deliveryNumberUpload");
                    const deliveryStatusUpload = $(".deliveryStatusUpload");

                    for (var i = 0; i < deliveryNumberUpload.length; i++) {
                      const uploadParticulars = {};
                      uploadParticulars.deliveryNumberUpload = $(deliveryNumberUpload[i]).val();
                      uploadParticulars.deliveryStatusUpload = $(deliveryStatusUpload[i]).val();
                      uploadDetails.push(uploadParticulars);
                    }
                    // console.log(uploadDetails)
                    for (var h = 0; h < deliveryNumberUpload.length; h++){
                        // if (requiredFields === 0) {
                            const payload = {
                                "id"                            : "",
                                "createdBy"                     : $.cookie("uuid"),
                                "createdDate"                   : "",
                                "updatedBy"                     : "",
                                "updatedDate"                   : "",
                                "status"                        : true,
                                "purchaseOrderId"               : orderId,
                                "receiptType"                   : "Delivery Receipt",
                                "receiptNumber"                 : uploadDetails[h].deliveryNumberUpload,
                                "receiptStatus"                 : uploadDetails[h].deliveryStatusUpload
                            }     
                            // console.log(payload)
                            __executeExternalPost('3000/purchase-order/new-receipt/'+orderId,JSON.stringify(payload)).done(function (result) {
                                // console.log(result);
                                if (result.status != "ERROR") {
                                    // $(".createForm").val('');
                                    $('#success').show();
                                    setTimeout(function () {
                                        $('#success').hide();
                                        setTimeout(function () {
                                            // window.location.reload(true);
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
                        // }
                    }
        })
    }else{
        console.log("error")
    }
})
}

var purchaseOrderUpload_CR = function() {
    // console.log(___ctx)
    // console.log("testUpdate");

var orderId = GetURLParameter('orderId');

    console.log(orderId)

__executeExternalGet('3000/purchase-order/'+orderId).done(function (result) {

    if (result.status != "ERROR") {
    // console.log(result);
    var result = result.response;
        // console.log(result);
        $(".btn_uploadInvoice").unbind("click").on("click", function(){
        // console.log("clicked")
            var vendorId = result.purchaseOrder.vendorId;
            // console.log(orderId);
            var fileToUpload = $('#fileupload').prop('files')[0];
            // console.log(fileToUpload);
            if (fileToUpload === undefined) {
                alert("Please Choose File Before Upload!")
            }else {
                var form = new FormData();
                form.append("file", fileToUpload, fileToUpload.name);

                var settings = {
                    "url": "http://localhost:8080/file/upload?uuid="+"CR-"+orderId+"-"+$(".collectionReceiptNum").val()+"&type=collection_receipt&createdby="+$.cookie('uuid')+"&version=0&kind=collection_receipt",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
                // console.log(settings);
                $.ajax(settings).done(function (response) {
                    // console.log(response);
                    if (response) {
                        // $('#success_upload').show();
                        setTimeout(function () {
                            $('#success_upload').hide();
                            window.location.reload(true);
                        }, 2000);
                    } else {

                    }
                });
            }
            var payload = {
                    "id"                            : "",
                    "createdBy"                     : $.cookie("uuid"),
                    "createdDate"                   : "",
                    "updatedBy"                     : "",
                    "updatedDate"                   : "",
                    "status"                        : true,
                    "purchaseOrderId"               : orderId,
                    "receiptType"                   : "Collection Receipt",
                    "receiptNumber"                 : $(".collectionReceiptNum").val(),
                    "receiptStatus"                 : ""
            }
            // console.log(payload);
            __executeExternalPost('3000/purchase-order/new-receipt/'+orderId,JSON.stringify(payload)).done(function (result) {
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
        })
    }else{
        console.log("error")
    }
})
}