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
                                <h4 class="font-weight-bold py-3 mb-0"> Asset Request</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href=""><i class="feather icon-user"></i> My Requests</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Update </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">Update Request</h6>
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
                                                    <div class="form-group col-md-4">
                                                        <label class="form-label">Category</label>
                                                        <select class="form-control category select2">
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-4">
                                                        <label class="form-label">Allotment</label>
                                                        <select class="form-control allotment select2">
                                                            <option selected disabled>--Select--</option>
                                                            <option value = "Personal">Personal</option>
                                                            <option value = "Deployment">Deployment</option>
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div>
<!--                                                     <div class="form-group col-md-4">
                                                        <label class="form-label">Request Status</label>
                                                        <select class="form-control reqStatus select2">
                                                            <option selected disabled>--Select--</option>
                                                            <option value = "Draft">Draft</option>
                                                            <option value = "New">New</option>
                                                            <option value = "Pending">Pending</option>
                                                            <option value = "Approval">Approval</option>
                                                            <option value = "Approved">Approved</option>
                                                            <option value = "Rejected">Rejected</option>
                                                        </select>
                                                        <div class="clearfix"></div>
                                                    </div> -->
                                                    <div class="form-group col-md-4">
                                                        <label class="form-label">Subject</label>
                                                        <input type="text" class="form-control subject" placeholder="">
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-12">
                                                        <label class="form-label">Description</label>
                                                        <input type="text" class="form-control description" placeholder="">
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-group col-md-4 remarksInput" style="display:none;">
                                                        <label class="form-label">Remarks</label>
                                                        <input type="text" class="form-control remarks" placeholder="">
                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    <div class="card-footer">
                                        <button type="button" class="btn btn-info float-right btn-edit" style="display:none;">Edit</button>
                                        <button type="button" class="btn btn-info float-right btn-update" style="display:none;">Update</button>
                                        <button type="button" class="btn btn-success float-right btn-forApproved mx-2" style="display:none;">For Approval</button>
                                        <button type="button" class="btn btn-success float-right btn-approve mx-2" style="display:none;">Approve</button>
                                        <button type="button" class="btn btn-danger float-right btn-reject mx-2" style="display:none;">Reject</button>
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

        asset_request_update();

    });
    </script>
</body>
</html>