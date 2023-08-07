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
                                <h4 class="font-weight-bold py-3 mb-0"></h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#"><i class="feather icon-home"></i>Dashboard</a></li>
                                    </ol>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="card mb-4">
                                            <div class="card-header">
                                                <strong>Product Settings</strong>
                                            </div>
                                            <div class="card-body">
                                                <div class="alert alert-dark-success alert-dismissible fade show" id="success_prod" style="display:none;">
                                                    <button type="button" class="close" data-dismiss="alert">×</button>
                                                    "Success! Your selected Product Saved Successfully."
                                                </div>
                                                <div class="alert alert-dark-danger alert-dismissible fade show" id="failed_prod" style="display:none;">
                                                    <button type="button" class="close" data-dismiss="alert">×</button>
                                                    "Failed! Please select atleast 1 or more product."
                                                </div>
                                                <div class="col-md-6 productFields">
                                                    
                                                </div>
                                                <div class="col-md-6 viewProd">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-12">
                                        <div class="card mb-4">
                                            <div class="card-header">
                                                <strong>Category Settings</strong>
                                            </div>
                                            <div class="card-body">
                                                <div class="alert alert-dark-success alert-dismissible fade show" id="success_cat" style="display:;">
                                                    <button type="button" class="close" data-dismiss="alert">×</button>
                                                    "Success! Your selected Category Saved Successfully."
                                                </div>
                                                <div class="alert alert-dark-danger alert-dismissible fade show" id="failed_cat" style="display:;">
                                                    <button type="button" class="close" data-dismiss="alert">×</button>
                                                    "Failed! Please select atleast 1 or more category."
                                                </div>
                                                <div class="categoryFields">
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
    <script src="assets/js/system_dashboard.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        system_dashboard();
    });
    </script>
</body>
</html>
