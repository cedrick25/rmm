<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->
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
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Create </a></li>
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
                                                            <select class="custom-select vendorPoc select2" id="poc" disabled>
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
                                                            <label class="form-label">Grand Total</label>
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text">Php</span>
                                                                </div>
                                                                <input type="text" class="form-control totalCost" placeholder="" readonly>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                            <label class="form-label">Paid</label><br><br>
                                                            <div class="d-flex align-items-center">
                                                                <label class="form-label">No</label>
                                                                <label class="switch mx-2">
                                                                    <input type="checkbox" class="form-check-input primary" id="" value="" name="paid" checked>
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
                                                            <div class ="form-row">
                                                                <div class = "col-12 d-flex align-items-center initialParticular">
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
                                                                            <input type="text" class="form-control cost" id = "iniCost" placeholder="">
                                                                        </div>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-1">
                                                                    <label class="form-label">Quantity</label>
                                                                        <input type="text" class="form-control quantity" id="qty" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-1">
                                                                        <label class="form-label">Total Cost</label>
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text">Php</span>
                                                                            </div>
                                                                            <input type="text" class="form-control particularCost" id= "partCost" placeholder="" readonly>
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
                                                                </div>
                                                            </div>
                                                            <div class="particulars">
                                                            </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-success float-right btn_create">Create</button>
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
        purchaseOrderCreate();
    });
    </script>
</body>
</html>