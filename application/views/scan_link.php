<?php $this->load->view('templates/header.php'); ?> 

<body>
    <!-- Left Panel -->


    <div class="layout-wrapper layout-2">
        <div class="layout-inner">

            <!-- left panel --> 
            <?php $this->load->view('templates/left-panel.php'); ?>
            <!-- left panel end -->

                <div class="layout-container">
                    <!-- header -->
                    <?php $this->load->view('templates/avatar.php'); ?>
                    <!-- header end -->

                        <!-- right panel -->
                        <div class="layout-content"> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0"> Scan and Link </h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item active"><span class="feather icon-user"></span> Scan and Link </a></li>
                                    </ol>
                                </div>

                                    <div class="card">
                                        <div class="card-header">
                                        <strong> Scanned List</strong>
                                        <a href="scan_link_new"><button type="button" class="btn btn-info float-right"><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;New scan</button></a>
                                    </div>
                                        <table class="table card-table">
                                            <thead class="thead-light" align="center">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Order No.</th>
                                                    <th>Item Name</th>
                                                    <th>Quantity</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody align="center">
                                                <tr>
                                                    <th>1</th>
                                                    <td>0011</td>
                                                    <td>Samsung Tablet</td>
                                                    <td>12</td>
                                                    <td>Pending</td>
                                                    <td><a href="scan_link_update"> <button type="button" class="btn btn-primary"><span class="feather icon-edit"></span>&nbsp;&nbsp;Update</button> </a></td>
                                                </tr>
                                                <tr>
                                                    <th>2</th>
                                                    <td>0012</td>
                                                    <td>Acer Laptop</td>
                                                    <td>1</td>
                                                    <td>Pending</td>
                                                    <td><a href="scan_link_update"> <button type="button" class="btn btn-primary"><span class="feather icon-edit"></span>&nbsp;&nbsp;Update</button> </a></td>
                                                </tr>
                                                <tr>
                                                    <th>3</th>
                                                    <td>0013</td>
                                                    <td>Lenovo</td>
                                                    <td>5</td>
                                                    <td>Completed</td>
                                                    <td><a href="scan_link_update"> <button type="button" class="btn btn-primary"><span class="feather icon-edit"></span>&nbsp;&nbsp;Update</button> </a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            </div>                
                        </div>
                    <!-- right panel end -->

                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?> 
</body>
</html>
 