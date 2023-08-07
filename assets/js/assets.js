var asset_create = function(){

    var __select_product = function(){
        $('.products').empty();

        $('.products').append("<option selected disabled> - - Select Product - - </option>");
        __executeExternalGet('3000/product/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.response.forEach(function(data){
                    $('.products').append(
                        "<option value="+data.product.id+">"+data.product.name+"</option>");
                });
            } else {
                console.log("failed fetching product list");
            }
        })
    }
    __select_product();

    var __select_vendor = function(){
        $('.vendors').empty();

        $('.vendors').append("<option selected disabled> - - Select Vendor - - </option>");
        __executeExternalGet('3000/vendor/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.response.forEach(function(data){
                    $('.vendors').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching vendor list");
            }
        })
    }
    __select_vendor();

  	$('.qty').on('input', function() {
	    var quantity = $(this).val();
	    calculateTotalPrice();
  	});

	function calculateTotalPrice() {
	  	var quantity = $('.qty').val();
	  	var cost = $('.cost').val();
	  
	  	if (quantity && cost) {
	    	var totalPrice = quantity * cost;
	    	$(".totalCost").text("Total Cost: " + totalPrice.toFixed(2));
	  	} else {
	    	$('.totalCost').empty();
	  	}
	}

    $(".btn-confirm").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["products", "vendors", "qty", "wrty"];
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
            var payload = [
			  	{
				    "productId": $(".products").val(),
				    "vendorId": $(".vendors").val(),
				    "quantity": $(".qty").val(),
				    "batch": $(".batch").val(),
				    "cost": $(".cost").val(),
				    "warranty": $(".wrty").val(),
				    "dateAcquired": $(".da").val(),
				    "stockGenerated": false,
				    "createdBy": $.cookie("uuid"),
				    "createdDate": "",
				    "updatedBy": "",
				    "updatedDate": "",
				    "status": true
			  	}
			]
            console.log(payload);
            __executeExternalPost('3000/asset/new',JSON.stringify(payload)).done(function (result) {
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
var asset_list = function() {
    console.log("asset list checker")

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        __executeExternalGet('3000/asset/list/0/300').done(function (result) {
            // console.log("==========")
            console.log(result)
            // console.log("==========")
            
            if (result.status != "ERROR") {
                    
                result.response.content.forEach(function(data){
                    var status;
                    let actions;
                    switch (data.stockGenerated) {
                    default:
                        actions = " <button class='btn btn-sm btn-info btn_update viewAssetBatch' type='submit' data-id='"+data.id+"' style='display:none;'> View</button>";
                        break;
                    };
                    var stockGenerated = data.stockGenerated === true ? "Yes" : "No";
                    $('.table_body').append("<tr>"+
                        "<td></td>"+
                        "<td>"+data.productDetails.product.name+"</td>"+
                        "<td>"+data.vendorDetails.name+"</td>"+
                        "<td>"+data.quantity+"</td>"+
                        "<td>"+data.batch+"</td>"+
                        "<td>"+data.cost+"</td>"+
                        "<td>"+data.warranty+"</td>"+
                        "<td>"+stockGenerated+"</td>"+
                        "<td>"+data.dateAcquired+"</td>"+
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
	                var id = $(this).data("id");
	                // console.log(data_id)
	                window.location.href = '/ams/asset_batch_view_details?assetID='+id;
	            });
        	}

        })
    }
    __table();
}
var asset_view_batch_details = function() {
	console.log("attached events for view batch details");
    var assetID = GetURLParameter('assetID');
    __executeExternalGet('3000/asset/'+assetID).done(function (result) {
    	console.log(result)
        if (result.status != "ERROR") {
		  	var quantity_view = result.response.quantity;
		  	var cost_view  	  = result.response.cost;

        	$(".prod_view").text(result.response.productDetails.product.name);
        	$(".ven_view").text(result.response.vendorDetails.name);
        	$(".qty_view").text(quantity_view);
        	$(".batch_view").text(result.response.batch);
        	$(".cost_view").text(cost_view);
        	$(".wrty_view").text(result.response.warranty);
        	$(".sgen_view").text(result.response.stockGenerated);
        	$(".daac_view").text(result.response.dateAcquired);
		  
		  	if (quantity_view && cost_view) {
		    	var totalPrice_view = quantity_view * cost_view;
		    	$(".total_cost").text(totalPrice_view.toFixed(2));
		  	} else {
		    	$('.total_cost').empty();
		  	}

        	if (result.response.stockGenerated === true) {
        		$(".btn_gen_stock").hide();
        		$(".btn_update").hide();
        	} else {
        		$(".btn_gen_stock").show();
        		$(".btn_update").show();
        	}
        	$(".btn_update").unbind("click").on("click", function(){
        		$(".btn_update, .btn_gen_stock").hide();
        		$(".updateForm").show();
        	})
        	$(".btn_cancel").unbind("click").on("click", function(){
        		$(".updateForm").hide();
        		$(".btn_update, .btn_gen_stock").show();
        	})

            $(".btn_gen_stock").unbind("click").on("click", function(){
    			$(this).prop("disabled", true);

            	var payload = {
				    "assetList": [assetID],
		    		"createdBy": $.cookie("uuid"),
				}
            	console.log(payload)
                __executeExternalPost('3000/inventory/generate-stock',JSON.stringify(payload)).done(function (result) {
                    if (result.status != "ERROR") {
                        $('#success_gen').show();
                            setTimeout(function () {
                            $('#viewModal').modal('hide');
                            $('#success_gen').hide();
               		 		$(".btn_gen_stock").prop("disabled", false);
                            
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                        }, 2000);
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
var asset_update_batch_details = function() {
    var assetID = GetURLParameter('assetID');
    // console.log(userId)

    var __select_product = function(){
        $('.products').empty();

        __executeExternalGet('3000/product/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.products').append("<option selected disabled> - - Select Product - - </option>");
                result.response.forEach(function(data){
                    $('.products').append(
                        "<option value="+data.product.id+">"+data.product.name+"</option>");
                });
            } else {
                console.log("failed fetching product list");
            }
        })
    }
    __select_product();

    var __select_vendor = function(){
        $('.vendors').empty();

        __executeExternalGet('3000/vendor/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                $('.vendors').append("<option selected disabled> - - Select Vendor - - </option>");
                result.response.forEach(function(data){
                    $('.vendors').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching vendor list");
            }
        })
    }
    __select_vendor();

    __executeExternalGet('3000/asset/'+assetID).done(function (result) {
    	console.log(result);
	    if (result.status != "ERROR") {
	        var cost = result.response.cost
	        $(".cost").val(cost);
	        var quantity = result.response.quantity
	        $(".qty").val(quantity);
	        $(".batch").val(result.response.batch);
	        $(".wrty").val(result.response.warranty);
	        $(".da").val(result.response.dateAcquired);
	        setTimeout(function() {
	            $(".products").val(result.response.productId).trigger('change');
	            $(".vendors").val(result.response.vendorId).trigger('change');
	        },1500);
			if (quantity && cost) {
		    	var totalPrice = quantity * cost;
		    	$(".totalCost").text("Total Cost: " + totalPrice.toFixed(2));
		  	} else {
		    	$('.totalCost').empty();
		  	}
	        $(".btn_confirm_update").unbind("click").on("click", function(){
	            // console.log('clicked')
    			$(this).prop("disabled", true);

	            var payload = {
				    "productId"		: $(".products").val(),
				    "vendorId"		: $(".vendors").val(),
				    "quantity"		: $(".qty").val(),
				    "batch"			: $(".batch").val(),
				    "cost"			: $(".cost").val(),
				    "warranty"		: $(".wrty").val(),
				    "dateAcquired"	: $(".da").val(),
				    "stockGenerated": false,
				    "createdBy"		: "",
				    "createdDate"	: "",
				    "updatedBy"		: $.cookie("uuid"),
				    "updatedDate"	: "",
				    "status"		: true
			  	}
	            // console.log(payload)
	            __executeExternalPost('3000/asset/edit/'+assetID,JSON.stringify(payload)).done(function (result) {
	                console.log(result);
	                if (result.status != "ERROR") {
	               	 	$('#success').show();
    					$(".btn_confirm_update").prop("disabled", false);

                        setTimeout(function () {
                            $('#success').hide();
                                setTimeout(function () {
                                    window.location.reload(true);
                                }, 500);
                        }, 2000);
	                }else{
	                    alert("failed")
	                }
	            })
	        })

	    }else{
	        alert("failed")
	    }
	})

	$('.qty').on('input', function() {
	    var quantity = $(this).val();
	    calculateTotalPrice();
  	});

	function calculateTotalPrice() {
	  	var quantity = $('.qty').val();
	  	var cost = $('.cost').val();
	  
	  	if (quantity && cost) {
	    	var totalPrice = quantity * cost;
	    	$(".totalCost").text("Total Cost: " + totalPrice.toFixed(2));
	  	} else {
	    	$('.totalCost').empty();
	  	}
	}
}

// this function is for asset details integration
var asset_details = function() {
    console.log("asset details checker")

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();

        __executeExternalGet('3000/inventory/list').done(function (result) {
            // console.log("==========")
            console.log(result)
            // console.log("==========")
            
            if (result.status != "ERROR") {
                    
                result.response.forEach(function(data){
                    var status;
                    let actions;
                    switch (data.stockGenerated) {

                    default:
                        actions = "<button class='btn btn-sm btn-info btn_update viewInventory' type='submit' data-id='"+data.assetRecordDto.skuId+"' style='display:none;'> View</button> <button class='btn btn-sm btn-info btn_qrCode generateqrInventory' type='submit' data-id='"+data.assetRecordDto.skuId+"' style='display:none;'> Generate QR</button>";
                        break;
                    };
                    var categoryArr = data.assetDto.productDetails.category;
                    var category;
					var categoryNames = [];

                    if (categoryArr.length > 0) {
						categoryArr.forEach(function(data2) {
						    categoryNames.push(data2.name);
						});
						var category = categoryNames.join(', ');
					} else {
						category = "N/A"
					}

                    $('.table_body').append("<tr>"+
                        "<td><label class='custom-control custom-checkbox m-0'><input type='checkbox' class='custom-control-input' data-skuid='" + data.assetRecordDto.skuId + "'> <span class='custom-control-label'></span> </label> </td>"+
                        "<td>"+data.assetDto.productDetails.product.name+"</td>"+
                        "<td>"+data.assetDto.vendorDetails.name+"</td>"+
                        "<td>"+data.assetRecordDto.skuName+"</td>"+
                        "<td>"+category+"</td>"+
                        "<td>"+data.assetRecordDto.skuStatus+"</td>"+
                        "<td align='center' class='actions'> "+actions+"")
                });
            	$(document).ready(function () {
				    $('#select-all').on('change', function () {
				        var isChecked = $(this).prop('checked');
				        $('.table_body .custom-control-input').prop('checked', isChecked);
				    });
				    // Handle individual checkbox change event
				    $('.table_body').on('change', '.custom-control-input', function () {
				        var allChecked = $('.table_body .custom-control-input:checked').length === $('.table_body .custom-control-input').length;
				        $('#select-all').prop('checked', allChecked);
				    });
	                var table = $('.table_head').DataTable({
	                    scrollX: true,
  						pageLength: 25
	                });

		            $('.table_head').on('click', '.btn_update', function() {
				        var id = $(this).data('id');
				        window.location.href = '/ams/asset_view_details?skuId=' + id;
				    });

		            $('.table_head').on('click', '.btn_qrCode', function() {
		                var id = $(this).data("id");
		                // console.log(data_id)
		                window.location.href = '/ams/qrcode?skuId='+id;
		            });
		            $('.generateQrBtn').prop('disabled', true); // Disable the button initially

					$('.custom-control-input').on('change', function() {
					  	var isChecked = $('.table_body .custom-control-input:checked').length > 0;
					  	$('.generateQrBtn').prop('disabled', !isChecked);
					});
		            $('.generateQrBtn').on('click', function() {
					    var selectedSKUIds = [];
					    $('.table_body .custom-control-input:checked').each(function() {
					      	var skuId = $(this).data('skuid');
				     	 	selectedSKUIds.push(skuId);
					    });
					    var url = '/ams/qrcode?skuId=' + selectedSKUIds.join(',');
					    window.location.href = url;

				  	});
	        	});
        	}
        })
    }
    __table();
}
var asset_view_details = function() {
	console.log("attached events for view details");
    var skuId = GetURLParameter('skuId');
	__executeExternalGet('3000/inventory/search/'+skuId).done(function (result) {
    	console.log(result)
        if (result.status != "ERROR") {
        	$(".status_view").text(result.response.skuStatus);
        	// $(".skuname_view").text(result.response.skuName);
        	$('.skuname_view').append('<a href="/ams/asset_batch_view_details?assetID='+result.response.assetId+'">'+result.response.skuName+' (view more details)</a>');
        	$(".skurmks_view").text(result.response.skuRemarks);
        	const sn = result.response.skuSerial ? result.response.skuSerial : "N/A"
        	$(".sernum_view").text(sn);
        	const accType = result.response.skuAssignmentType ? result.response.skuAssignmentType : "N/A"
        	$(".accType_view").text(accType);
        	const assID = result.response.skuAssignmentId ? result.response.skuAssignmentId : "N/A"
        	$(".personnel_view").text(assID);
        	const details = result.response.skuDetailsJson
			if (details === "" || details == null) {
				$('.deployment_view').text("N/A");
			}else {
				var json = JSON.parse(details);
	    	 	var departmentNames = $.map(json, function(obj) {
				    return obj.departmentName;
		 	 	});
			  	var output = $('.deployment_view');
			  	output.text(departmentNames.join(', '));
			}
        	$(".btn_update").unbind("click").on("click", function(){
        		$(".btn_update").hide();
        		$(".updateForm").show();
        	})
        	$(".btn_cancel").unbind("click").on("click", function(){
        		$(".updateForm").hide();
        		$(".btn_update").show();
        	})
        }else{
            alert("failed")
        }
    })
}
var asset_update_details = function() {
	console.log("attached events for update details");

    var skuId = GetURLParameter('skuId');
    
    function sortOptionsAlphabetically(selectElement) {
	  	var options = selectElement.find('option');
	  	options.sort(function(a, b) {
	    	return a.text.localeCompare(b.text);
	  	});
	  	selectElement.empty().append(options);
	}
	// Call the function on your select element with class "products"
	sortOptionsAlphabetically($('.status'));

    var __select_department = function(){
        $('.departmentList').empty();

        __executeExternalGet('8088/department/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    $('.departmentList').append(
                        "<option value="+data.id+">"+data.name+"</option>");
                });
            } else {
                console.log("failed fetching department list")
            }
        })
    }
    __select_department();

    var __select_user = function(){
        $('.personnelList').empty();

        $('.personnelList').append("<option selected disabled> - - Select Personnel - - </option>");
        __executeExternalGet('8088/user/list').done(function (result) {
            // console.log(result)
            if (result.status != "ERROR") {
                result.forEach(function(data){
                    $('.personnelList').append(
                        "<option value="+data.uuid+">"+data.firstName+ " " +data.lastName+"</option>");
                });
            } else {
                console.log("failed fetching Perosonnel");
            }
        })
    }
    __select_user();

    __executeExternalGet('3000/inventory/search/'+skuId).done(function (result) {
    	// console.log(result);
	    if (result.status != "ERROR") {
	        $(".personnelList").val(result.response.skuAssignmentId).trigger('change');
	        // console.log(result.response.skuAssignmentId);

		  	$('.status').change(function() {
			    var selectedStatus = $(this).val();
			    if (selectedStatus === 'AssignStock' || selectedStatus === 'InMaintenance' || selectedStatus === 'InRepair' || selectedStatus === 'ForPickup' ) {
			      	$(".accSelect").show();
			  		$(".depSelect").show();
			      	$(".perSelect").show();
			    }else {
			      	$(".accSelect").hide();
			  		$(".depSelect").hide();
			      	$(".perSelect").hide();
			    }
		  	});

        	$(".btn_confirm_update").unbind("click").on("click", function(){
	            console.log('clicked');

	            var required = ["status", "rmks"];
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
			    	var payload;
	            	if ($('.status').val() === 'AssignStock' || $('.status').val() === 'InMaintenance' || $('.status').val() === 'InRepair' || $('.status').val() === 'ForPickup' ) {
					    var selectedValues = $(".departmentList").val();

					    var outputArray = $.map(selectedValues, function(value) {
					    	var departmentName =  $(".departmentList").find('option[value="' + value + '"]').text();
					      	return {
					        	departmentID	: value,
					        	departmentName	: departmentName
					      	};
					    });
					    var deployment = JSON.stringify(outputArray);
					    console.log(deployment);

			            payload = {
						  	"assetId"		: result.response.assetId,
						  	"skuId"			: result.response.skuId,
						  	"assignmentType": $(".accType").val(),
						  	"assignedId"	: $(".personnelList").val(),
						  	"skuDetailsJson": deployment,
						  	"remarks"		: $(".rmks").val(),
						  	"itemStatus"	: "",
						  	"requestType"	: $(".status").val(),
						    "createdBy"		: $.cookie("uuid"),
						    "skuSerial"		: $(".sernum").val()
						}
				    }else {
			            payload = {
						  	"assetId"		: result.response.assetId,
						  	"skuId"			: result.response.skuId,
						  	"assignmentType": "",
						  	"assignedId"	: "",
						  	"skuDetailsJson": "",
						  	"remarks"		: $(".rmks").val(),
						  	"itemStatus"	: "",
						  	"requestType"	: $(".status").val(),
						    "createdBy"		: $.cookie("uuid"),
						    "skuSerial"		: $(".sernum").val()
						}
				    }
		            console.log(payload)
		            __executeExternalPost('3000/inventory/update/',JSON.stringify(payload)).done(function (result) {
		                // console.log(result);
		                if (result.status != "ERROR") {
		               	 	$('#success').show();
		                    setTimeout(function () {
		                        $('#success').hide();
		                            setTimeout(function () {
		                                window.location.reload(true);
		                            }, 500);
		                    }, 2000);
		                }else{
		                    alert("failed updating asset details")
		                }
		            })
		        }
	        })
	    }else{
	        alert("failed")
	    }
	})
}

var batch_upload = function(){
	console.log("Attached events for upload");
	$("#fileInput").on("change", function () {
	    var fileSelected = $(this).val() !== '';
	    $("#uploadBtn").toggle(fileSelected);
  	});

    // When the Upload button is clicked, get the list of files from the file input
    $("#uploadBtn").unbind("click").on("click", function() {
    	$(this).prop("disabled", true);
	    var fileInput = $("#fileInput")[0].files[0];

	    if (fileInput) {
	        var reader = new FileReader();

	        function excelSerialNumberToDate(dateValue) {
			    // Assuming the dateValue is a valid Excel serial number
			    if (typeof dateValue !== 'number') {
			        return null; // Return null for invalid dateValue
			    }

			    var baseDate = new Date(Date.UTC(1899, 11, 30)); // December 30, 1899 is the base date for Excel on Windows
			    var daysSinceBaseDate = Math.floor(dateValue);
			    var millisecondsPerDay = 24 * 60 * 60 * 1000;
			    var date = new Date(baseDate.getTime() + daysSinceBaseDate * millisecondsPerDay);

			    // Check if the date is valid
			    if (isNaN(date.getTime())) {
			        return null; // Return null for invalid date
			    }

			    return date;
			}

	        reader.onload = function(e) {
	            var data = e.target.result;
	            var workbook = XLSX.read(data, { type: 'binary' });
	            var sheetName = workbook.SheetNames[0];
	            var sheet = workbook.Sheets[sheetName];
	            var excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

	            // Process the data inside the reader.onload function
	            for (var i = 1; i < excelData.length; i++) {
				    var dateValue = excelData[i][6];
				    var date = excelSerialNumberToDate(dateValue);

				    if (date === null) {
				        // Handle the case when the date is invalid (e.g., show an error message, skip the row, etc.)
				    } else {
				        var day = date.getDate().toString().padStart(2, '0');
				        var month = (date.getMonth() + 1).toString().padStart(2, '0');
				        var year = date.getFullYear().toString();
				        var formattedDate = year + '-' + month + '-' + day;
				        excelData[i][6] = formattedDate;
				    }
			    }
				excelData.shift(); // Remove the first element (header row)

				// Now excelData contains only the rows of data without the header
				console.log(excelData);
				var payload = [];
				for (var i = 0; i < excelData.length; i++) {
			  	var data = excelData[i];
				  
				  // Create an object with the required properties and set their values accordingly
			  	var item = {
				    // "productId": data[0],
				    // "vendorId": data[1],
				    "productId": 1,
				    "vendorId": 1,
				    "cost": data[2],
				    "quantity": data[3],
				    "batch": data[4],
				    "warranty": data[5],
				    "dateAcquired": data[6],
				    "stockGenerated": false,
				    "createdBy": $.cookie("uuid")
			  	};
				  
				  // Push the created object into the payload array
			  	payload.push(item);
				}

				console.log(payload);
				
	            __executeExternalPost('3000/asset/new',JSON.stringify(payload)).done(function (result) {
	                console.log(result);
	                if (result.status != "ERROR") {
	                    $(".form-control").val('');
	                    $('#success_batch').show();
                        $('#failed_batch').hide();
               		 	$("#uploadBtn").prop("disabled", false);
	                    setTimeout(function () {
	                        $('#success_batch').hide();
                   		 	$('#failed_batch').hide();
	                            setTimeout(function () {
	                                window.location.reload(true);
	                            }, 500);
	                    }, 2000);
	                }else{
	                    console.log(result.status);
                        $('#success_batch').hide();
                        $('#failed_batch').show();
	                }
	            })
	        };

	        reader.readAsBinaryString(fileInput);
	    } else {
	        alert("Please select an Excel file.");
	    }
	});

}

var dashboard = function() {
	console.log("attached events to asset dashboard");

	var select = $('.monthFilter');
	var currentMonth = moment().month(); // Get the current month index (0-11)
	for (var i = 0; i <= 11; i++) {
	  var month = $('<option>').text(moment().month(i).format('MMMM')).val(i);
	  if (i === currentMonth) {
	    month.prop('selected', true); // Set the current month as selected
	  }
	  select.append(month);
	}

	var quarterSelect = $('.quarterFilter');
	var quarters = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter'];
	for (var i = 0; i < quarters.length; i++) {
	  var quarter = $('<option>').text(quarters[i]).val(i + 1);
	  quarterSelect.append(quarter);
	}

	var yearSelect = $('.yearFilter');
	var currentYear = new Date().getFullYear();
	for (var i = currentYear; i >= currentYear - 10; i--) {
	  var year = $('<option>').text(i).val(i);
	  yearSelect.append(year);
	}

	var selectedOption = $('.filterType').val();
	if (selectedOption === 'Month') {
	  $('.month-dropdown').show();
	  $('.quarter-dropdown').hide();
	  $('.annually-dropdown').hide();
	} else if (selectedOption === 'Quarter') {
	  $('.month-dropdown').hide();
	  $('.quarter-dropdown').show();
	  $('.annually-dropdown').hide();
	} else if (selectedOption === 'Annually') {
	  $('.month-dropdown').hide();
	  $('.quarter-dropdown').hide();
	  $('.annually-dropdown').show();
	} else {
	  $('.month-dropdown').hide();
	  $('.quarter-dropdown').hide();
	  $('.annually-dropdown').hide();
	}

  	function getDatesForSelectedMonth(selectedMonthIndex, selectedYear) {
	    var startDate = moment().year(selectedYear).month(selectedMonthIndex).date(1).format('YYYY-MM-DD');
	    var endDate = moment().year(selectedYear).month(selectedMonthIndex).endOf('month').format('YYYY-MM-DD');

	    return {
	      startDate: startDate,
	      endDate: endDate
	    };
  	}

  	function getDatesForSelectedQuarter(selectedQuarter, selectedYear) {
	    var quarterStartMonth = (selectedQuarter - 1) * 3; // Calculate the start month of the quarter
	    var startDate = moment().year(selectedYear).month(quarterStartMonth).date(1).format('YYYY-MM-DD');
	    var endDate = moment().year(selectedYear).month(quarterStartMonth + 2).endOf('month').format('YYYY-MM-DD');

	    return {
	      startDate: startDate,
	      endDate: endDate
	    };
  	}

  	$('.filterType').on('change', function() {
	    var selectedOption = $(this).val();
	    if (selectedOption === 'Month') {
	      $('.month-dropdown').show();
	      $('.quarter-dropdown').hide();
	      $('.annually-dropdown').hide();
	    } else if (selectedOption === 'Quarter') {
	      $('.month-dropdown').hide();
	      $('.quarter-dropdown').show();
	      $('.annually-dropdown').hide();
	    } else if (selectedOption === 'Annually') {
	      $('.month-dropdown').hide();
	      $('.quarter-dropdown').hide();
	      $('.annually-dropdown').show();
	    } else {
	      $('.month-dropdown').hide();
	      $('.quarter-dropdown').hide();
	      $('.annually-dropdown').hide();
	    }
  	});

    $('.btn_search').on('click', function() {
    	var payload;
		var selectedOption = $('.filterType').val();
		if (selectedOption === 'Month') {
	      	var selectedMonthIndex = $('.monthFilter').val();
	      	var selectedYear = $('.yearFilter').val();
	      	var dates = getDatesForSelectedMonth(selectedMonthIndex, selectedYear);

	      	payload = {
		        startDate: dates.startDate,
		        endDate: dates.endDate
	      	};
		} else if (selectedOption === 'Quarter') {
	        var selectedQuarter = $('.quarterFilter').val();
	        var selectedYear = $('.yearFilter').val();
	        var dates = getDatesForSelectedQuarter(selectedQuarter, selectedYear);

	        payload = {
	          startDate: dates.startDate,
	          endDate: dates.endDate
	        };
		} else if (selectedOption === 'Annually') {
	        var selectedYear = $('.yearFilter').val();
	        var startDate = moment(selectedYear + '-01-01').format('YYYY-MM-DD');
	        var endDate = moment(selectedYear + '-12-31').format('YYYY-MM-DD');

	        payload = {
	          startDate: startDate,
	          endDate: endDate
	        };
		}

        console.log('Payload:', payload);
	    __executeExternalPost('3000/dashboard/in-stock/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".InStock").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/in-repair/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".InRepair").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/in-maintenance/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".InMaintenance").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/impaired/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".Impaired").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/for-vendor-warranty/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ForVendorWarranty").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/for-repair/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ForRepair").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/for-pickup/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ForPickUp").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/for-manufacturer-warranty/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ForManufacturerWarranty").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/for-maintenance/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ForMaintenance").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/for-disposal/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ForDisposal").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/expire/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".ExpireAsset").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/disposed/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".DisposeStock").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/depreciated/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".Depreciated").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/consumed/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".Consumed").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/assigned/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".AssignStock").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/expiring30D/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".Expiring30D").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/in-manufacturer-warranty/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".InManufacturerWarranty").text(result);
	        }
	    })
	    __executeExternalPost('3000/dashboard/in-vendor-warranty/count',JSON.stringify(payload)).done(function (result) {
	        console.log(result)

	        if (result.status != "ERROR") {
	        	$(".InVendorWarranty").text(result);
	        }
	    })
    });
    $(".btn_search").trigger("click");

}
