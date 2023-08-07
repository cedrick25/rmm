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
                        <h4 class="font-weight-bold py-3 mb-0">Inventory Batch</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="feather icon-home"></i>Dashboard</a></li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Inventory Batch List</strong>
                                        <a href="asset_create"> <button type="button" class="btn btn-info float-right newAssetbatch" style="display:none;"><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;New Asset</button></a>
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product</th>
                                                    <th>Vendor</th>
                                                    <th>Quantity</th>
                                                    <th>Batch</th>
                                                    <th>Cost</th>
                                                    <th>Warranty</th>
                                                    <th>Stock Generated</th>
                                                    <th>Date Acquired</th>
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
    <script src="assets/js/assets.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        asset_list();

    });
    </script>
</body>
</html>
