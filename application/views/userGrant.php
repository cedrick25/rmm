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
                                <h4 class="font-weight-bold py-3 mb-0">Grant Permissions</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="userLevels"> User Levels List</a></li>
                                        <li class="breadcrumb-item active"> Create </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">Grant Permissions</h6>
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
                                        <div class="datatable">
                                            <table class="table card-table permissionListTable" width="100%">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Permission</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="button" class="btn btn-info float-right btn_grant">Grant</button>
                                    </div>
                                </div>
                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/userLevels.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {

        userGrant();

    });
    </script>
</body>
</html>