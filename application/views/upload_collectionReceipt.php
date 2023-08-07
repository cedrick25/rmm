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
                                <h4 class="font-weight-bold py-3 mb-0"> Purchase Order</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="purchase_order"><i class="feather icon-user"></i> Purchase Order</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Create </a></li>
                                    </ol>
                                </div>
                                    <div class="card">
                                        <div class="card-header with-elements">
                                            <h6 class="card-header-title mb-0">Create Purchase Order</h6>
                                        </div>
                                        <div class="alert alert-dark-success" role="alert" id="success" style="display:none">
                                            <i class="fa fa-check"></i>
                                                Successfully Added  
                                        </div>
                                        <div class="alert alert-dark-danger" role="alert" id="error" style="display:none">
                                            <i class="fa fa-check"></i>
                                                Error
                                        </div>
                                            <div class="card-body">
                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-3">
                                                            <label class="form-label">Collection Receipt Number</label>
                                                            <input type="text" class="form-control collectionReceiptNum" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
<!--                                                         <div class="form-group col-md-3">
                                                        <label class="form-label">Invoice Status</label>
                                                            <select class="custom-select invoiceStatus select2">
                                                                <option selected disabled>Select</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Pending">Pending</option>
                                                                <option value="Paid">Paid</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                            </select>
                                                            <div class="clearfix"></div>
                                                        </div> -->
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-3">        
                                                            <label for="text-input" class=" form-control-label">Upload File</label>
                                                            <input type="file" name="fileupload" class="form-control-file" id="fileupload">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-success float-right btn_uploadInvoice">Upload</button>
                                        </div>
                                    </div>
                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/purchaseOrderUpload.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        purchaseOrderUpload_CR();
    });
    </script>
</body>
</html>