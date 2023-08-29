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
                                <h4 class="font-weight-bold py-3 mb-0"> Department Create </h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="department"><i class="feather icon-user"></i> Department </a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Create </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">Create</h6>
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
                                                        <label class="form-label">Department</label>
                                                        <input type="text" class="form-control departmentName" placeholder="">
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                    <label class="form-label">Description</label>
                                                        <input type="text" class="form-control departmentDescription" placeholder="">
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="form-label">Location</label>
                                                        <select class="form-control locationId select2">
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    <div class="card-footer">
                                        <button type="button" class="btn btn-info float-right btn_create">Create</button>
                                    </div>
                                </div>
                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/department.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {

        create();

    });
    </script>
</body>
</html>