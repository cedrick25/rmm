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
                                <h4 class="font-weight-bold py-3 mb-0"> Scan and Tag</h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item"><a href="scan_tag"><i class="feather icon-user"></i> Scan and Tag </a></li>
                                        <li class="breadcrumb-item active"><i class="feather icon-user"></i> Update Scan and Tag </a></li>
                                    </ol>
                                </div>

                                    <div class="container-fluid flex-grow-1 container-p-y">
                                        <div class="card mb-4">
                                            <h6 class="card-header">Update</h6>
                                            <div class="card-body">
                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Order No.</label>
                                                            <input type="text" class="form-control" placeholder="1212" disabled>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Item name</label>
                                                            <input type="text" class="form-control" placeholder="Acer">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Quantity</label>
                                                            <input type="text" class="form-control" placeholder="0">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Description</label>
                                                            <input type="text" class="form-control" placeholder="Laptop">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Tag</label>
                                                            <input type="text" class="form-control" placeholder="File Name">
                                                            <div class="clearfix">    
                                                            </div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <div class="clearfix">
                                                                <button type="submit" class="btn btn-primary">Tag</button>
                                                            </div>
                                                        </div>
                                                    </div>
<!--
                                                    <div class="form-group">
                                                        <label class="form-label">Address</label>
                                                        <input type="text" class="form-control" placeholder="Marikina">
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Username</label>
                                                            <input type="text" class="form-control">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">Password</label>
                                                            <input type="text" class="form-control">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-4">
                                                            <label class="form-label">Email</label>
                                                            <input type="text" class="form-control">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                            <label class="form-label">Contact Number</label>
                                                            <input type="text" class="form-control">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-4">
                                                            <label class="form-label">Birthdate</label>
                                                            <input type="date" class="form-control">
                                                            <div class="clearfix"></div>
                                                        </div> 
                                                    </div> -->
                                                    <button type="submit" class="btn btn-primary float-right">Link</button>
                                                </form>
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
</body>
</html>