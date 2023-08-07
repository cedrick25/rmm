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
                                <h4 class="font-weight-bold py-3 mb-0"> Purchase Request</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="purchase_request"><i class="feather icon-user"></i> Purchase Request</a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Update </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                        <div class="card-header with-elements">
                                            <h6 class="card-header-title mb-0">Create Purchase Request</h6>
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
                                                        <div class="form-group col-md-6">
                                                        <label class="form-label">Department</label>
                                                        <input type="text" class="form-control department" placeholder="" readonly>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                        <label class="form-label">Created By</label>
                                                            <input type="text" class="form-control actor" placeholder="" readonly>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-4">
                                                        <label class="form-label">Subject</label>
                                                            <input type="text" class="form-control subject" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                        <label class="form-label">Description</label>
                                                            <input type="text" class="form-control description" placeholder="">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                        <label class="form-label">Grand Total</label>
                                                            <input type="text" class="form-control estimatedTotal" placeholder="" readonly>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <fieldset class="col-12" style="margin-bottom: 20px">
                                                        <legend>Particulars</legend>
                                                            <div class="col-12">
                                                                <button type="button" class="btn btn-success btn-sm float-right btn-add float-right" style="margin-bottom: 20px;">Add more</button>
                                                            </div>
                                                            <!-- <div class="col-12 initialParticular">
                                                                <div class="form-row">
                                                                    <div class="form-group col-md-3">
                                                                    <label class="form-label">Product</label>
                                                                        <select class="custom-select product select2">
                                                                        </select>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-2">
                                                                    <label class="form-label">Cost</label>
                                                                        <input type="text" class="form-control estimatedCost" id="cost" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-1">
                                                                    <label class="form-label">Quantity</label>
                                                                        <input type="text" class="form-control estimatedQuantity" id="qty" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-2">
                                                                    <label class="form-label">Total Cost</label>
                                                                        <input type="text" class="form-control totalCost" id="partCost" placeholder="" disabled>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    <div class="form-group col-md-2">
                                                                    <label class="form-label">Remarks</label>
                                                                        <input type="text" class="form-control remarks" placeholder="">
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div> -->
                                                            <div class="particulars">
                                                            </div>
                                                    </fieldset>
                                                    <div class="form-row">
                                                        <table class="table card-table table_head" width="100%" style="margin-top: 20px; display: none;">
                                                            <thead class="thead-light">
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Product</th>
                                                                    <th>Approved Quantity</th>
                                                                    <th>Approved Cost</th>
                                                                    <th>Approve Quantity</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="table_body">

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </form>
                                            </div>
                                        <div class="card-footer">
                                            <button type="button" class="btn btn-info float-right btn-edit mx-2">Edit</button>
                                            <button type="button" class="btn btn-info float-right btn-update mx-2" style="display:none;">Update</button>
                                            <button type="button" class="btn btn-info float-right btn_link">Link Purchase Request</button>
                                        </div>
                                    </div>      


                            </div>                
                        </div>
                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/purchaseRequest.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        purchaseRequestUpdate();
    });
    </script>
</body>
</html>