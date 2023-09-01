<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Cluster</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item "><a href="cluster"><i class="feather icon-users"></i> Cluster</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-users"></i> Cluster Create</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Create New Cluster</strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display: none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! You have successfully created a new cluster."
                                        </div>
                                        <div class="alert alert-dark-danger alert-dismissible fade show" id="failed" style="display: none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Oops! Something went wrong. Failed to create a new cluster."
                                        </div>
                                        <div class="col-md-6" style="display:;">
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Name</label>
                                                    <input type="text" class="form-control name" placeholder="Name">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Project</label>
                                                    <input type="text" class="form-control proj" placeholder="Project">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Description</label>
                                                    <input type="text" class="form-control desc" placeholder="Description">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12 demo-inline-spacing mt-3">
                                                    <button type="submit" class="btn btn-info float-right btn_confirm">Create</button> 
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
        </div>
    </div>

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/cluster.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            create();
        });
    </script>
</body>
</html>