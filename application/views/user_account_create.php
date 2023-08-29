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
                                <h4 class="font-weight-bold py-3 mb-0"> User Accounts</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="user_accounts"><i class="feather icon-user"></i> User Accounts</a></li>
                                        <li class="breadcrumb-item"><a href="#"><i class="feather icon-user"></i> Create </a></li>
                                    </ol>
                                </div>
                                <div class="card mb-4">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">Create</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display:none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! Your new user account has been created."
                                        </div>
                                        <div style="margin-bottom: 30px; margin-right: 90px; text-align: right;">
                                            <img class="align-content" id="client_photo" src="images/profile_pic.jpg" alt="" style="max-width: 20%;">
                                        </div>
                                        <div style="margin-bottom: 30px; margin-right: 112px; text-align: right;">
                                            <input type="file" id="file-input" style="display: none">
                                            <button type="button" class="btn btn-success btn-sm btn-upload"><i class="feather icon-upload"></i> Upload Photo</button>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label class="form-label">First Name</label>
                                                <input type="text" class="form-control firstName" placeholder="John">
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label">Middle Name</label>
                                                <input type="text" class="form-control middleName" placeholder="Cruz">
                                                <div class="clearfix"></div>
                                                <label class="form-check">
                                                    <input class="form-check-input middleNameCheck" type="checkbox" checked="">
                                                    <span class="form-check-label text-tiny italic-font">No Middle Name</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label class="form-label">Last Name</label>
                                                <input type="text" class="form-control lastName" placeholder="Doe">
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label">Suffix Name</label>
                                                <input type="text" class="form-control suffix" placeholder="Jr">
                                                <div class="clearfix"></div>
                                                <label class="form-check">
                                                    <input class="form-check-input suffixCheck" type="checkbox" checked="">
                                                    <span class="form-check-label text-tiny italic-font">No Suffix Name</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label class="form-label">Username</label>
                                                <input type="text" class="form-control username" placeholder="JohnDoe">
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label">Password</label>
                                                <input type="password" class="form-control password" placeholder="*******">
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label class="form-label">Email</label>
                                                <input type="text" class="form-control email" placeholder="jd@gmail.com">
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label">Contact Number</label>
                                                <input type="number" class="form-control contactNo" placeholder="09123456789">
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label">Birthdate</label>
                                                <input type="date" class="form-control birthday">
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label class="form-label">Department</label>
                                                <select class="custom-select department select2">
                                                </select>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label">User Roles</label>
                                                <select class="custom-select user_roles select2">
                                                </select>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label">Manager</label>
                                                <select class="custom-select manager select2">
                                                </select>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
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
    <script src="assets/js/user_account.js"></script>
    <!-- <script src="assets/js/uploadPicture.js"></script> -->
    <script type="text/javascript">
    $(document).ready(function() {
        create();
        // uploadPicture();

    });
    </script>
</body>
</html>