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
                                <h4 class="font-weight-bold py-3 mb-0"> View Asset Details</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="assets_details"><i class="feather icon-user"></i> Assets Details</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> View Asset Details</a></li>
                                    </ol>
                                </div>

                                <div class="card mb-4">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">View Asset Details </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display:none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! Your asset details has been updated."
                                        </div>
                                        <div class="col-md-6">
                                            <dl class="row">
                                                <dt class="col-sm-4">Status</dt>
                                                <dd class="col-sm-8">
                                                    <p class="status_view"></p>
                                                </dd>
                                                <dt class="col-sm-4">Batch Name</dt>
                                                <dd class="col-sm-8">
                                                    <p class="skuname_view"></p>
                                                </dd>

                                                <dt class="col-sm-4">Remarks</dt>
                                                <dd class="col-sm-8">
                                                    <p class="skurmks_view"></p>
                                                </dd>

                                                <dt class="col-sm-4">Serial Number</dt>
                                                <dd class="col-sm-8">
                                                    <p class="sernum_view"></p>
                                                </dd>

                                                <dt class="col-sm-4">Accountability Type</dt>
                                                <dd class="col-sm-8">
                                                    <p class="accType_view"></p>
                                                </dd>
                                                <dt class="col-sm-4">Personnel</dt>
                                                <dd class="col-sm-8">
                                                    <p class="personnel_view"></p>
                                                </dd>
                                                <dt class="col-sm-4">Deployment</dt>
                                                <dd class="col-sm-8">
                                                    <p class="deployment_view"></p>
                                                </dd>
                                                <div class="form-group col-md-12">
                                                    <button type="submit" class="btn btn-info float-right btn_update">Update</button>
                                                </div>
                                            </dl>
                                        </div>
                                        <div class="col-md-6 updateForm" style="display:none;">
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Status</label>
                                                    <select class="form-control status select2">
                                                        <option value="" selected> - - Select Status - - </option>
                                                        <option value="AssignStock">Assign Stock</option>
                                                        <option value="ForRepair">For Repair</option>
                                                        <option value="InRepair">In Repair</option>
                                                        <option value="ForMaintenance">For Maintenance</option>
                                                        <option value="InMaintenance">In Maintenance</option>
                                                        <option value="ForPickUp">For Pickup</option>
                                                        <option value="InStock">Return to Stock</option>
                                                        <option value="Consumed">Consumed</option>
                                                        <option value="Impaired">Impaired</option>
                                                        <option value="Depreciated">Depreciated</option>
                                                        <option value="DisposeStock">Dispose Stock</option>
                                                        <option value="ExpireAsset">Expire Asset</option>
                                                        <option value="Expiring30D">Expiring 30 Days</option>
                                                        <option value="ForDisposal">For Disposal</option>
                                                        <option value="InVendorWarranty">In Vendor Warranty</option>
                                                        <option value="ForVendorWarranty">For Vendor Warranty</option>
                                                        <option value="InManufacturerWarranty">In Manufacturer Warranty</option>
                                                        <option value="ForManufacturerWarranty">For Manufacturer Warranty</option>
                                                    </select>
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row accSelect" style="display: none;">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Accountability Type</label>
                                                    <select class="form-control accType select2">
                                                        <option value="personnel" selected>Personnel</option>
                                                    </select>
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row perSelect" style="display: none;">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Personnel</label>
                                                    <select class="form-control personnelList select2">
                                                    </select>
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row depSelect" style="display: none;">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Deployment</label>
                                                    <select class="form-control departmentList select2"  multiple="multiple">
                                                    </select>
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Serial Number</label>
                                                    <input type="text" class="form-control sernum" placeholder="Serrial Number">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Remarks</label>
                                                    <input type="text" class="form-control rmks" placeholder="Remarks">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12 demo-inline-spacing mt-3">
                                                    <button type="submit" class="btn btn-info float-right btn_confirm_update">Confirm Update</button> 
                                                    <button type="submit" class="btn btn-secondary float-right btn_cancel">Cancel</button> 
                                                </div>
                                            </div>
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
    <script src="assets/js/assets.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        asset_view_details();
        asset_update_details();
    });
    </script>
</body>
</html>