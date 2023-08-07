<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- right panel -->
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
                <div class="layout-container">
                    <?php $this->load->view('templates/avatar.php'); ?>
                        <div class="layout-content">
                        <!-- main content start --> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0">Inventory Details</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#"><i class="feather icon-home"></i> Inventory Details</a></li>
                                    </ol>
                                </div>
                                <!-- row 1 -->
                                    <div class="row">
                                    <!-- table for recent product acquisitions -->
                                        <div class="col-xl-12">
                                            <div class="card mb-4">
                                                <div class="card-header">
                                                    <strong>Inventory List</strong>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row mb-2">
                                                        <div class="col-md-6">
                                                            <button class="btn btn-sm btn-info generateQrBtn generateMultipleQrInventory" style="display: none;">Generate Multiple QRcode</button>
                                                        </div>
                                                    </div>
                                                    <table class="table card-table table_head" width="100%">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th>
                                                                    <label class="custom-control custom-checkbox m-0">
                                                                        <input type="checkbox" id="select-all" class="custom-control-input">All
                                                                        <span class="custom-control-label"></span>
                                                                    </label>
                                                                </th>
                                                                <th>Product</th>
                                                                <th>Vendor</th>
                                                                <th>Batch Name</th>
                                                                <th>Category</th>
                                                                <th>Status</th>
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
        asset_details();

    });
    </script>
</body>
</html>
