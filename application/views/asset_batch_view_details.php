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
                        <h4 class="font-weight-bold py-3 mb-0"> View Batch Details</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="asset_batch"><i class="feather icon-user"></i> Assets Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-user"></i> View Batch Details</a></li>
                            </ol>
                        </div>

                        <div class="card mb-4">
                            <div class="card-header with-elements">
                                <h6 class="card-header-title mb-0">View Batch Details</h6>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display:none;">
                                    <button type="button" class="close" data-dismiss="alert">×</button>
                                    "Success! Your asset has been updated."
                                </div>
                                <div class="alert alert-dark-success alert-dismissible fade show" id="success_gen" style="display:none;">
                                    <button type="button" class="close" data-dismiss="alert">×</button>
                                    "Success! Your stock has been generated."
                                </div>
                                <div class="col-md-6">
                                    <dl class="row">
                                        <dt class="col-sm-4">Product</dt>
                                        <dd class="col-sm-8">
                                            <p class="prod_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Vendor</dt>
                                        <dd class="col-sm-8">
                                            <p class="ven_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Quantity</dt>
                                        <dd class="col-sm-8">
                                            <p class="qty_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Batch</dt>
                                        <dd class="col-sm-8">
                                            <p class="batch_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Warranty</dt>
                                        <dd class="col-sm-8">
                                            <p class="wrty_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Cost</dt>
                                        <dd class="col-sm-8">
                                            <p class="cost_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Stock Generated</dt>
                                        <dd class="col-sm-8">
                                            <p class="sgen_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Date Acquired</dt>
                                        <dd class="col-sm-8">
                                            <p class="daac_view"></p>
                                        </dd>
                                        <dt class="col-sm-4">Total Cost:</dt>
                                        <dd class="col-sm-8">
                                            <p class="total_cost"></p>
                                        </dd>
                                        <div class="form-group col-md-12 demo-inline-spacing mt-3">
                                            <button type="submit" class="btn btn-info float-right btn_update" style="display:none;">Update</button>
                                            <button type="submit" class="btn float-right btn-primary btn_gen_stock" style="display:none;">Generate Stock</button>
                                        </div>
                                    </dl>
                                </div>
                                <div class="col-md-6 updateForm" style="display:none;">
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Products</label>
                                            <select class="form-control products select2">
                                            </select>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Vendors</label>
                                            <select class="form-control vendors select2">
                                            </select>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Cost</label>
                                            <input type="number" class="form-control cost" placeholder="123">
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Quantity</label>
                                            <input type="number" class="form-control qty" placeholder="123">
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Batch</label>
                                            <input type="text" class="form-control batch" placeholder="batch">
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Warranty</label>
                                            <input type="text" class="form-control wrty" placeholder="Warranty">
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="form-label">Date Acquired</label>
                                            <input type="date" class="form-control da">
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <h5 class="totalCost">Total Cost:</h5>
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
        asset_view_batch_details();
        asset_update_batch_details();
    });
    </script>
</body>
</html>