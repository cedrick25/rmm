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
                            <h4 class="font-weight-bold py-3 mb-0"> Dashboard</h4>
                            <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#"><i class="feather icon-home"></i> Dashboard</a></li>
                                </ol>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div class="">
                                                    <h2 class="mb-2"> 256 </h2>
                                                    <p class="text-muted mb-0">Number of <span class="badge badge-success">Devices</span> Registered</p>
                                                </div>
                                                <i class="fas fa-desktop text-success" style="font-size: 26px;"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div class="">
                                                    <h2 class="mb-2">951 GB</h2>
                                                    <p class="text-muted mb-0">Total <span class="badge badge-success">Storage</span>  of All Devices</p>
                                                </div>
                                                <i class="far fa-hdd text-success" style="font-size: 26px;"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div class="">
                                                    <h2 class="mb-2">2 TB <small></small></h2>
                                                    <p class="text-muted mb-0">Average <span class="badge badge-success">RAM</span> Usage of All Devices</p>
                                                </div>
                                                <i class="fas fa-memory text-success" style="font-size: 26px;"></i>
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


	<?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/dashboard_main.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        dashboard();
    });
    </script>
</body>
</html>
