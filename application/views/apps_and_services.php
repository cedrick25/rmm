<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Default Apps and Services</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-settings"></i> Default Apps and Services</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Default Apps and Services List</strong>
                                    </div>
                                    <div class="card-body">

                                        <ul class="nav nav-tabs" id="hardwareSubTabs" role="tablist">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/apps_and_services.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            apps_services();
        });
    </script>
</body>
</html>