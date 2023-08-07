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
                                <h4 class="font-weight-bold py-3 mb-0"> Category Management</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="category_management"><i class="feather icon-user"></i> Category Management</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Update </a></li>
                                    </ol>
                                </div>

                                    <div class="card">
                                        <div class="card-header with-elements">
                                            <h6 class="card-header-title mb-0">Update Category</h6>
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
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Category Name</label>
                                                            <input type="text" class="form-control categoryNameUpdate" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Asset Type</label>
                                                            <select class="custom-select assetTypeUpdate select2">
                                                                <option selected disabled>-- Select --</option>
                                                                <option value="Stock Type – Fixed">Stock Type – Fixed</option>
                                                                <option value="Consumables">Consumables</option>
                                                                <option value="Intangible Assets">Intangible Assets</option>
                                                            </select>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Consumable</label><br><br>
                                                            <div class="d-flex align-items-center">
                                                                <label class="form-label">No</label>
                                                                <label class="switch mx-2">
                                                                    <input type="checkbox" class="form-check-input primary isConsumable" id="" value="" name="consumableUpdate" checked>
                                                                    <span class="slider round"></span>
                                                                </label>
                                                                <label class="form-label">Yes</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-info float-right btn-edit">Edit</button>
                                            <button type="button" class="btn btn-info float-right btn-update" style="display:none;">Update</button>
                                        </div>
                                    </div>
                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/category.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {

        categoryUpdate();

    });
    </script> 
</body>
</html>