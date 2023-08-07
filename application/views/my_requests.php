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
                        <h4 class="font-weight-bold py-3 mb-0">Request Assets</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="feather icon-home "></i>Dashboard</a></li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Asset Request List</strong>
                                        <a href="asset_request_create"> <button type="button" class="btn btn-info float-right assetRequestmyRequestcreate" style="display: none;"><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;New Request</button></a>
                                            <select class="form-control filterStatus" style="max-width: 120px;">
                                                <option selected disabled>Filter by Status</option>
                                                <option value = "Draft">Draft</option>
                                                <option value = "New">New</option>
                                                <option value = "Pending">Pending</option>
                                                <option value = "Approval">Approval</option>
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
                                                    <th>Description</th>
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
        my_request_list();

    });
    </script>
</body>
</html>
