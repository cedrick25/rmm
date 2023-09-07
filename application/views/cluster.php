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
                                <li class="breadcrumb-item active"><i class="feather icon-users"></i> Cluster</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Cluster List</strong>
                                        <a href="cluster_create"> <button type="button" class="btn btn-info float-right newAssetbatch" style=""><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;New Cluster</button></a>
                                    </div>
                                    <div class="card-body">
                                        <div class="row" id="cluster_container">
                                            <div class="col-md-4">
                                                <div class="card mb-4 bg-pattern-3-dark">
                                                    <div class="card-body">
                                                        <div class="d-flex align-items-center">
                                                            <div class="text-primary"><i class="fas fa-desktop" style="font-size: 26px;"></i>
                                                            </div>
                                                            <div class="ml-3">
                                                                <div class="text-large" style="color: #878787;">Device Registration</div>
                                                                <div class="text-muted small">Device Registration</div>
                                                                <div style="margin-top: 5px;">
                                                                    <a href="cluster_devices?clusterID=0&clusterName=Unregister">
                                                                        <button type="button" class="btn btn-sm btn-primary"><span class="feather icon-eye"></span>&nbsp;&nbsp;Assign Devices to the cluster</button>
                                                                    </a>
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
                </div>
            </div>
        </div>
    </div>

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/cluster.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            list();
        });
    </script>
</body>
</html>