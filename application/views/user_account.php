<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->

    <div class="modal fade" id="activateModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Activate User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dark-success alert-dismissible fade show" id="success_activated" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        "Account Activated Successfully!"
                    </div>
                    <p>
                        Are you sure you want to Activate this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_activate_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deactivateModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Deactivate User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dark-success alert-dismissible fade show" id="success_deactivate" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        "Account Deactivated Successfully!"
                    </div>
                    <p>
                        Are you sure you want to deactive this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_deactivate_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dark-success alert-dismissible fade show" id="success_remove" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        "Account Removed Successfully!"
                    </div>
                    <p>
                        Are you sure you want to Remove this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="restrictModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Restrict User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dark-success alert-dismissible fade show" id="success_restrict" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        "Account Restricted Successfully!"
                    </div>
                    <p>
                        Are you sure you want to Restrict this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_restrict_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="liftModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Lift User Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dark-success alert-dismissible fade show" id="success_lift" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        "Account Restricted Successfully!"
                    </div>
                    <p>
                        Are you sure you want to Lift this user account? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_lift_confirm btn-sm">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <!-- /#left-panel -->

    <!-- right panel -->
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
                <div class="layout-container">
                    <?php $this->load->view('templates/avatar.php'); ?>
                        <div class="layout-content"> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0"> User Accounts</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="user_accounts"><i class="feather icon-user"></i> User Accounts</a></li>
                                    </ol>
                                </div>

                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">User List</h6>
                                        <div class="card-header-elements ml-auto">
                                            <a href="user_account_create"><button type="button" class="btn btn-info waves-effect createUser">Create User</button></a>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full Name</th>
                                                    <th>Username</th>
                                                    <th>Email Address</th>
                                                    <th>User Role</th>
                                                    <th>Department</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body">

                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-footer">
                                    </div>
                                </div>
                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/user_account.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            list();
        });
    </script>
</body>
</html>
