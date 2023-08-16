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
                                <li class="breadcrumb-item active"><i class="feather icon-users"></i> Cluster Devices</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Cluster Devices</strong>
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>
                                                        Devices
                                                    </th>
                                                    <th>Devices Name</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body">
                                                <tr>
                                                    <td><i class="fas fa-desktop" style="font-size: 26px;"></i></td>
                                                    <td>Desktop Arabo</td>
                                                    <td>Arabian Desktop</td>
                                                    <td>True</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><i class="fas fa-desktop" style="font-size: 26px;"></i></td>
                                                    <td>Desktop Arabo</td>
                                                    <td>Arabian Desktop</td>
                                                    <td>True</td>
                                                    <td></td>
                                                </tr>
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

    <?php $this->load->view('templates/footer.php'); ?> 
    <script type="text/javascript">
        $(document).ready(function() {
        });
    </script>
</body>
</html>