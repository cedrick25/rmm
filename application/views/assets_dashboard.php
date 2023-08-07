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
                        <!-- main content start --> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0">Inventory Dashboard</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#"><i class="feather icon-home"></i>Dashboard</a></li>
                                    </ol>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="card mb-4">
                                            <div class="card-header">
                                                <strong>Inventory</strong>
                                            </div>
                                            <div class="card-body">
                                                <div class="form-row">
                                                    <div class="form-group col-md-6">
                                                        <label class="form-label">Select Filter Type</label>
                                                        <select class="form-control filterType select2">
                                                            <option selected>Month</option>
                                                            <option>Quarter</option>
                                                            <option>Annually</option>
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-3 month-dropdown" style="display:none;">
                                                        <label class="form-label">Select Month</label>
                                                        <select class="form-control monthFilter select2">
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-3 quarter-dropdown" style="display:none;">
                                                        <label class="form-label">Select Quarter</label>
                                                        <select class="form-control quarterFilter select2">
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-3 year-dropdown">
                                                        <label class="form-label">Select Year</label>
                                                        <select class="form-control yearFilter select2">
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-12">
                                                        <button type="submit" class="btn btn-info btn-sm float-right btn_search">Search</button>
                                                    </div>
                                                </div><br>
                                                <div class="row analytics">
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 AssignStock">0</h2>
                                                                        <p class="text-muted mb-0"> Assign Stock</p>
                                                                    </div>
                                                                    <div class="lnr lnr-list display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 Depreciated">0</h2>
                                                                        <p class="text-muted mb-0"> Depreciated</p>
                                                                    </div>
                                                                    <div class="lnr lnr-undo display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 DisposeStock">0</h2>
                                                                        <p class="text-muted mb-0"> Dispose Stock</p>
                                                                    </div>
                                                                    <div class="lnr lnr-undo display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ExpireAsset">0</h2>
                                                                        <p class="text-muted mb-0"> Expire Asset</p>
                                                                    </div>
                                                                    <div class="lnr lnr-undo display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 Expiring30D">0</h2>
                                                                        <p class="text-muted mb-0"> Expiring 30 Days</p>
                                                                    </div>
                                                                    <div class="lnr lnr-rocket display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ForDisposal">0</h2>
                                                                        <p class="text-muted mb-0"> For Disposal</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ForMaintenance">0</h2>
                                                                        <p class="text-muted mb-0"> For Maintenance</p>
                                                                    </div>
                                                                    <div class="lnr lnr-wheelchair display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ForManufacturerWarranty">0</h2>
                                                                        <p class="text-muted mb-0"> For Manufacturer Warranty</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ForRepair">0</h2>
                                                                        <p class="text-muted mb-0"> For Repair</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ForVendorWarranty">0</h2>
                                                                        <p class="text-muted mb-0"> For Vendor Warranty</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 Impaired">0</h2>
                                                                        <p class="text-muted mb-0"> Impaired</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 InMaintenance">0</h2>
                                                                        <p class="text-muted mb-0"> In Maintenance</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 InManufacturerWarranty">0</h2>
                                                                        <p class="text-muted mb-0"> In Manufacturer Warranty</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 InRepair">0</h2>
                                                                        <p class="text-muted mb-0"> In Repair</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 InStock">0</h2>
                                                                        <p class="text-muted mb-0"> In Stock</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 InVendorWarranty">0</h2>
                                                                        <p class="text-muted mb-0"> In Vendor Warranty</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 Consumed">0</h2>
                                                                        <p class="text-muted mb-0"> Consumed</p>
                                                                    </div>
                                                                    <div class="lnr lnr-undo display-4 text-success"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="card mb-4">
                                                            <div class="card-body">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div class="analytic">
                                                                        <h2 class="mb-2 ForPickUp">0</h2>
                                                                        <p class="text-muted mb-0"> For Pickup</p>
                                                                    </div>
                                                                    <div class="lnr lnr-chart-bars display-4 text-success"></div>
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
                        </div>                
                </div>
        </div>
    </div>

    <!-- right panel end -->


	<?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/assets.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        dashboard();

    });
    </script>
</body>
</html>
