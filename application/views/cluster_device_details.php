<?php $this->load->view('templates/header.php'); ?> 
<style type="text/css">
    .json-data {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 15px;
    margin-top: 10px;
    overflow: auto;
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
                                            <li class="nav-item">
                                                <a class="nav-link active" id="tab-Motherboard_Firmware-tab" data-toggle="tab" href="#Motherboard_Firmware" role="tab" aria-controls="Motherboard_Firmware" aria-selected="true">Motherboard + Firmware</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="tab-CPU-tab" data-toggle="tab" href="#CPU" role="tab" aria-controls="CPU" aria-selected="false">CPU</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="tab-STORAGE-tab" data-toggle="tab" href="#STORAGE" role="tab" aria-controls="STORAGE" aria-selected="false">STORAGE</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="tab-GPU-tab" data-toggle="tab" href="#GPU" role="tab" aria-controls="GPU" aria-selected="false">GPU</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="tab-BATTERY-tab" data-toggle="tab" href="#BATTERY" role="tab" aria-controls="BATTERY" aria-selected="false">BATTERY</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="tab-MEMORY-tab" data-toggle="tab" href="#MEMORY" role="tab" aria-controls="MEMORY" aria-selected="false">MEMORY</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="tab-NETWORK-tab" data-toggle="tab" href="#NETWORK" role="tab" aria-controls="NETWORK" aria-selected="false">NETWORK</a>
                                            </li>
                                        </ul>

                                        <div class="tab-content" id="myTabsContent">
                                            <div class="tab-pane fade show active" id="Motherboard_Firmware" role="tabpanel">
                                                <div class="json-data mf_field">
                                                    <!-- <h4><b>FIRMWARE</b></h4>
                                                    <dl class="row" style="margin-left:60px; margin-top: 10px;">
                                                        <dt class="col-sm-3">Description</dt>
                                                        <dd class="col-sm-9">EUCN37WW</dd>
                                                        <dt class="col-sm-3">manufacturer</dt>
                                                        <dd class="col-sm-9">LENOVO</dd>
                                                        <dt class="col-sm-3">releaseDate</dt>
                                                        <dd class="col-sm-9">2022-04-14</dd>
                                                        <dt class="col-sm-3">name</dt>
                                                        <dd class="col-sm-9">EUCN37WW</dd>
                                                        <dt class="col-sm-3">version</dt>
                                                        <dd class="col-sm-9">LENOVO - 1</dd>
                                                    </dl>
                                                    <h4><b>DASHBOARD</b></h4> -->
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="CPU" role="tabpanel">
                                                <div class="json-data">
                                                    <pre id="jsonContent_CPU"></pre>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="STORAGE" role="tabpanel">
                                                <div class="json-data">
                                                    <pre id="jsonContent_STORAGE"></pre>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="GPU" role="tabpanel">
                                                <div class="json-data">
                                                    <pre id="jsonContent_GPU"></pre>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="BATTERY" role="tabpanel">
                                                <div class="json-data">
                                                    <pre id="jsonContent_BATTERY"></pre>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="MEMORY" role="tabpanel">
                                                <div class="json-data">
                                                    <pre id="jsonContent_MEMORY"></pre>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="NETWORK" role="tabpanel">
                                                <div class="json-data">
                                                    <pre id="jsonContent_NETWORK"></pre>
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
            cluster_device_details();
        });
    </script>
</body>
</html>