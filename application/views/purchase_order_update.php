<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <div class="modal fade" id="uploadInvoice" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Upload Invoice</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-dark-success" role="alert" id="success_upload" style="display:none">
                    <i class="fa fa-check"></i>
                        Upload Successfully  
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Invoice Number</label>
                            <input type="text" name="type" class="form-control invoiceNumberUpload"  placeholder=""/>
                        </div>
<!--                         <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Kind</label>
                            <input type="text" name="kind" class="form-control kind"  placeholder="e.g Kind"/>
                        </div> -->
                        <div class="form-group col-md-6">        
                            <label for="text-input" class=" form-control-label">Upload File</label>
                            <input type="file" name="fileupload" class="form-control-file" id="fileupload">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-uploadConfirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="uploadDr" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Upload Delivery Receipts</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-dark-success" role="alert" id="success_upload" style="display:none">
                    <i class="fa fa-check"></i>
                        Upload Successfully  
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <button type="button" class="btn btn-success btn-sm float-right btn-addDr">Add more</button>
                        </div>
                        <!-- <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Delivery Number</label>
                            <input type="text" name="type" class="form-control deliveryNumberUpload"  placeholder=""/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Delivery Status</label>
                            <input type="text" name="type" class="form-control deliveryStatusUpload"  placeholder=""/>
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
                            <label for="text-input" class=" form-control-label">Upload File</label>
                            <input type="file" name="fileupload" class="form-control-file" id="fileupload">
                        </div> -->
                    </div>
                    <div class="form-row">
                        <div class="multipleDr"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-uploadConfirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="uploadCr" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Upload Invoice</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-dark-success" role="alert" id="success_upload" style="display:none">
                    <i class="fa fa-check"></i>
                        Upload Successfully  
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Invoice Number</label>
                            <input type="text" name="type" class="form-control invoiceNumberUpload"  placeholder=""/>
                        </div>
<!--                         <div class="form-group col-md-6">
                            <label for="text-input" class=" form-control-label">Kind</label>
                            <input type="text" name="kind" class="form-control kind"  placeholder="e.g Kind"/>
                        </div> -->
                        <div class="form-group col-md-6">        
                            <label for="text-input" class=" form-control-label">Upload File</label>
                            <input type="file" name="fileupload" class="form-control-file" id="fileupload">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-uploadConfirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <!-- /#left-panel -->

    <!-- right panel -->
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
                <div class="layout-container">
                    <?php $this->load->view('templates/avatar.php'); ?>
                        <div class="layout-content"> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0"> Purchase Order</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="purchase_order"><i class="feather icon-user"></i> Purchase Order</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Update </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                        <div class="card-header with-elements">
                                            <h6 class="card-header-title mb-0">Create Purchase Order</h6>
                                        </div>
                                        <div class="alert alert-dark-success" role="alert" id="success" style="display:none">
                                            <i class="fa fa-check"></i>
                                                Successfully Added  
                                        </div>
                                        <div class="alert alert-dark-danger" role="alert" id="error" style="display:none">
                                            <i class="fa fa-check"></i>
                                                Error
                                        </div>
                                            <div class="card-body">
                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-3">
                                                            <label class="form-label">Invoice Number</label>
                                                            <input type="text" class="form-control invoiceNumber" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                        <label class="form-label">Vendor</label>
                                                            <select class="custom-select vendor select2">
                                                            </select>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                        <label class="form-label">Vendor Point of Contact</label>
                                                            <select class="custom-select vendorPoc select2">
                                                            </select>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                        <label class="form-label">Invoice Status</label>
                                                            <select class="custom-select invoiceStatus select2">
                                                                <option selected disabled>Select</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Pending">Pending</option>
                                                                <option value="Paid">Paid</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                            </select>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                        <label class="form-label">Description</label>
                                                            <input type="text" class="form-control description" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <!-- <div class="form-group col-md-3">
                                                        <label class="form-label">Delivery Status</label>
                                                            <input type="text" class="form-control deliveryStatus" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                        <label class="form-label">Delivery Id</label>
                                                            <input type="text" class="form-control deliveryId" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div> -->
                                                        <div class="form-group col-md-4">
                                                        <label class="form-label">Total Cost</label>
                                                            <input type="text" class="form-control totalCost" placeholder="" readonly>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                            <label class="form-label">Paid</label><br><br>
                                                            <div class="d-flex align-items-center">
                                                                <label class="form-label">No</label>
                                                                <label class="switch mx-2">
                                                                    <input type="checkbox" class="form-check-input primary isPaid" id="" value="" name="paid">
                                                                    <span class="slider round"></span>
                                                                </label>
                                                                <label class="form-label">Yes</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <fieldset class="col-12" style="margin-bottom: 20px">
                                                        <legend>Particulars</legend>
                                                            <div class="col-12">
                                                                <button type="button" class="btn btn-success btn-sm float-right btn-add float-right" style="margin-bottom: 20px;">Add more</button>
                                                            </div>
                                                            <!-- <div class = "col-12">
                                                                <div class ="form-row">
                                                                    <div class="form-group col-md-4">
                                                                    <label class="form-label">Product</label>
                                                                        <select class="custom-select product select2">
                                                                        </select>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-4">
                                                                    <label class="form-label">Cost</label>
                                                                        <input type="text" class="form-control cost" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-4">
                                                                    <label class="form-label">Quantity</label>
                                                                        <input type="text" class="form-control quantity" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-4">
                                                                    <label class="form-label">Has Warranty</label><br><br>
                                                                    <div class="d-flex align-items-center">
                                                                        <label class="form-label">No</label>
                                                                        <label class="switch mx-2">
                                                                            <input type="checkbox" class="form-check-input primary" id="" value="" name="hasWarranty"checked>
                                                                            <span class="slider round"></span>
                                                                        </label>
                                                                        <label class="form-label">Yes</label>
                                                                    </div>
                                                                    </div>
                                                                    <div class="form-group col-md-4">
                                                                    <label class="form-label">Warranty Details</label>
                                                                        <input type="text" class="form-control warrantyDetails" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div> -->
                                                            <div class="particulars">
                                                            </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-info float-right btn-edit">Edit</button>
                                            <button type="button" class="btn btn-info float-right btn_update" style="display: none;">Update</button>
                                            <button type="button" class="btn btn-info float-right btn_uploadInvoice mx-2">Upload Invoice</button>
                                            <button type="button" class="btn btn-info float-right btn_Dr">Upload DR</button>
                                            <button type="button" class="btn btn-info float-right btn_uploadCr mx-2" style="display: none;">Upload CR</button>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header with-elements">
                                            <h6 class="card-header-title mb-0">Uploaded Files</h6>
                                        </div>
                                            <div class="card-body">
                                                <div class="datatable">
                                                    <table class="table card-table table_head" width="100%">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th>#</th>
                                                                <th>File Name</th>
                                                                <th>Type</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table_body">

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                    </div>
                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/purchaseOrder.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        purchaseOrderUpdate();
    });
    </script>
</body>
</html>