<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Apps Monitoring</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-slash"></i> Apps Monitoring</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Application List</strong>
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>Application Name</th>
                                                    <th>Exe File</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body">
                                                <tr>
                                                    <td>App 1</td>
                                                    <td>Sample.exe</td>
                                                    <td>Description1</td>
                                                    <td>True</td>
                                                    <td><a href="app_monitoring_update"><button class='btn btn-sm btn-info btn_update' type='submit'><i class='lnr lnr-redo'></i> Update</button></a></td>
                                                </tr>
                                                <tr>
                                                    <td>App 2</td>
                                                    <td>Sample1.exe</td>
                                                    <td>Description2</td>
                                                    <td>True</td>
                                                    <td><a href="app_monitoring_update"><button class='btn btn-sm btn-info btn_update' type='submit'><i class='lnr lnr-redo'></i> Update</button></a></td>
                                                </tr>
                                                <tr>
                                                    <td>App 3</td>
                                                    <td>Sample2.exe</td>
                                                    <td>Description3</td>
                                                    <td>True</td>
                                                    <td><a href="app_monitoring_update"><button class='btn btn-sm btn-info btn_update' type='submit'><i class='lnr lnr-redo'></i> Update</button></a></td>
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