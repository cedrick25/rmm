<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->
    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove User Access</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-dark-success" role="alert" id="success_remove" style="display:none">
                    <i class="fa fa-check"></i>
                        Removed Successfully  
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want to Remove this user access? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>


    <div class="layout-wrapper layout-2">
        <div class="layout-inner">

            <!-- left panel --> 
            <?php $this->load->view('templates/left-panel.php'); ?>
            <!-- left panel end -->

                <div class="layout-container">
                    <!-- header -->
                    <?php $this->load->view('templates/avatar.php'); ?>
                    <!-- header end -->

                        <!-- right panel -->
                        <div class="layout-content"> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0"> User Level </h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item active"><span class="feather icon-user"></span> User Level </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">User Levels List</h6>
                                        <div class="card-header-elements ml-auto">
                                            <button type="button" class="btn btn-info waves-effect btn-addPosition userLevelcreate" style="display:none;">Add Position</button>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="datatable">
                                            <table class="table card-table userLevelsListTable" width="100%">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Position</th>
                                                        <th>Description</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table_body">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                    </div>
                                </div>
                            </div>                
                        </div>
                    <!-- right panel end -->

                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/userLevels.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {

        userLevelsList();

    });
    </script>
</body>
</html>
 