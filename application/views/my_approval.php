<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->
    <div class="modal fade" id="removeModal" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md" role="deactivate">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediumModalLabel">Remove Asset Request</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dark-success alert-dismissible fade show" id="success_remove" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        "Request Removed Successfully!"
                    </div>
                    <p>
                        Are you sure you want to Remove this request? 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn_remove_confirm btn-sm">Confirm</button>
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
                        <h4 class="font-weight-bold py-3 mb-0">My Approvals</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="feather icon-home "></i>Dashboard</a></li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>My Approvals List</strong>
                                        <!-- <a href="asset_request_create"> <button type="button" class="btn btn-info float-right"><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;New Request</button></a> -->
                                            <select class="form-control filterStatus float-right" style="max-width: 120px;">
                                                <option selected disabled>Filter by Status</option>
                                                <option value = "Draft">Draft</option>
                                                <option value = "New">New</option>
                                                <option value = "Pending">Pending</option>
                                                <option value = "Approved">Approved</option>
                                                <option value = "Rejected">Rejected</option>
                                            </select>
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category</th>
                                                    <th>Subject</th>
                                                    <th>Requestor</th>
                                                    <th>Allotment</th>
                                                    <th>Request Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body">
                                            </tbody>
                                        </table>
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
    <script src="assets/js/asset_request.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        my_approval_list();

    });
    </script>
</body>
</html>
