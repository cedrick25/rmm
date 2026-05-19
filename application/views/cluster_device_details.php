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
                                        <div class="alert alert-info" role="alert" style="font-weight: bolder; color: #3d80c5; display: none;" id="divLoading">
                                            <i class="fas fa-spinner fa-pulse"></i> Loading...
                                        </div>

                                        <ul class="nav nav-tabs" id="mainTabs" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="hardware-tab" data-toggle="tab" href="#hardware" role="tab" aria-controls="hardware" aria-selected="false">Hardware</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="software-tab" data-toggle="tab" href="#software" role="tab" aria-controls="software" aria-selected="true">Software</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="networking-tab" data-toggle="tab" href="#networking" role="tab" aria-controls="networking" aria-selected="false">Networking</a>
                                            </li>
                                        </ul>

                                        <div class="tab-content" id="mainTabsContent">
                                            <!-- Software tab content -->
                                            <div class="tab-pane fade  show active" id="hardware" role="tabpanel" aria-labelledby="hardware-tab">
                                                <ul class="nav nav-tabs mt-3" id="myTabs" role="tablist">
                                                </ul>
                                                <div class="tab-content" id="myTabsContent">
                                                </div>
                                            </div>
                                            
                                            <!-- Hardware tab content -->
                                            <div class="tab-pane fade" id="software" role="tabpanel" aria-labelledby="software-tab">
                                                
                                                <!-- Sub tabs under Hardware -->
                                                <ul class="nav nav-tabs mt-3" id="softwareSubTabs" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="apps-tab" data-toggle="tab" href="#apps" role="tab" aria-controls="apps" aria-selected="true">Running Apps</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="services-tab" data-toggle="tab" href="#services" role="tab" aria-controls="services" aria-selected="false">Services</a>
                                                    </li>
                                                </ul>

                                                <!-- Hardware sub-tab content -->
                                                <div class="tab-content mt-3">
                                                    <div class="tab-pane fade show active" id="apps">
                                                        <div id="runningAppsContainer">
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="services">
                                                        <div id="servicesContainer">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Networking tab content -->
                                            <div class="tab-pane fade" id="networking" role="tabpanel" aria-labelledby="networking-tab">
                                                
                                                <!-- Sub tabs under Networking -->
                                                <ul class="nav nav-tabs mt-3" id="networkingSubTabs" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="public-tab" data-toggle="tab" href="#public" role="tab" aria-controls="public" aria-selected="true">Public IP</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="network-tab" data-toggle="tab" href="#network" role="tab" aria-controls="network" aria-selected="false">Network</a>
                                                    </li>
                                                </ul>

                                                <!-- Networking sub-tab content -->
                                                <div class="tab-content mt-3">
                                                    <div class="tab-pane fade show active" id="public">
                                                        <div id="publicContainer">
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="network">
                                                        <div id="networkContainer">
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
    <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> -->
    <script src="assets/js/chart.js"></script>
    <script src="assets/js/cluster.js?v=20260515-memory-loading-3"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            cluster_device_details();
        });
    </script>
</body>
</html>
