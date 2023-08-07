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
                                <h4 class="font-weight-bold py-3 mb-0"> Managers</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="user_accounts"><i class="feather icon-user"></i> Managers</a></li>
                                    </ol>
                                </div>

                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">Managers List</h6>
                                        <!-- <div class="card-header-elements ml-auto">
                                            <a href="user_create"><button type="button" class="btn btn-info waves-effect">Create User</button></a>
                                        </div> -->
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full Name</th>
                                                    <th>Email Address</th>
                                                    <th>User Role</th>
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
    <script src="assets/js/user_accounts.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            managerList();
        });
    </script>
</body>
</html>