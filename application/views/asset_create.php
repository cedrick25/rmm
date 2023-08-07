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
                                <h4 class="font-weight-bold py-3 mb-0"> New Asset</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="asset_batch"><i class="feather icon-user"></i> Assets Dashboard</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Create </a></li>
                                    </ol>
                                </div>


                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Upload Batch</strong>
                                        <!-- <button type="button" class="btn btn-sm btn-info float-right"><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;Import Excel</button> -->
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success_batch" style="display:none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! Your asset batch has been successfully uploaded and integrated into the system. Well done!"
                                        </div>
                                        <div class="alert alert-dark-danger alert-dismissible fade show" style="display: none;" id="failed_batch">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            Failed to Upload: Please check your files and try again.
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label w-100">File input</label>
                                            <input type="file" id="fileInput" accept=".xls, .xlsx">
                                        </div>
                                        <button type="button" class="btn btn-info" id="uploadBtn" style="display: none;"><span class="feather icon-upload"></span> Upload</button>
                                    </div>
                                </div>
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Create</strong>
                                        <!-- <button type="button" class="btn btn-sm btn-info float-right"><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;Import Excel</button> -->
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display:none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! Your new asset has been created."
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label class="form-label">Products</label>
                                                <select class="form-control products select2">
                                                </select>
                                                <div class="clearfix"></div>
                                            </div>
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
                                            <div class="form-group col-md-12">
                                                <label class="form-label">Date Acquired</label>
                                                <input type="date" class="form-control da">
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <h5 class="totalCost">Total Cost:</h5>
                                        </div>
                                        <!-- <button type="submit" class="btn btn-primary float-right">Import</button> -->
                                        <button type="submit" class="btn btn-info float-right btn-confirm">Confirm</button>
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
    <script src="assets/js/xlsx.full.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script> -->
    <script type="text/javascript">
    $(document).ready(function() {
        asset_create();
        batch_upload();
    });
    </script>
</body>
</html>