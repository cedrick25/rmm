<?php $this->load->view('templates/header.php'); ?> 
<style type="text/css">
    .json-data {
/*    background-color: #f8f9fa;*/
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 15px;
    margin-top: 10px;
    overflow: auto;
    max-height: 620px;
    overflow-y: auto;
/*    font-family: monospace;*/
}
</style>
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
                                <li class="breadcrumb-item active"><i class="feather icon-users"></i> Cluster Device Details</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong class="device_header"></strong>
                                    </div>
                                    <div class="card-body">
                                        <ul class="nav nav-tabs" id="myTabs" role="tablist">

                                        </ul>
                                        <div class="tab-content" id="myTabsContent">
                                           
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="assets/js/cluster.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            cluster_device_details();
        });
    </script>
</body>
</html>