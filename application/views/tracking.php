<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Tracking</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-map-pin"></i> Tracking</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Devices</strong>
                                    </div>
                                    <div class="card-body">
                                        <table class="table card-table table_head" width="100%">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>
                                                        Cluster
                                                    </th>
                                                    <th>Devices Name</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table_body">
                                                <tr>
                                                    <td>Cluster 1</td>
                                                    <td>Desktop Arabo</td>
                                                    <td>Arabian Desktop</td>
                                                    <td>True</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Cluster 2</td>
                                                    <td>Desktop Arabo</td>
                                                    <td>Arabian Desktop</td>
                                                    <td>True</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Cluster 3</td>
                                                    <td>222222</td>
                                                    <td>3333333</td>
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
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('.table_head thead th').each( function () {
                var title = $(this).text();
                $(this).html( title+'<br/><input type="text" placeholder="Search '+title+'" />' );
            } );
         
            // DataTable
            var table = $('.table_head').DataTable({
                scrollX: true,
                responsive: true // Enable responsive design if needed
            });
         
            // Apply the search
            table.columns().every( function () {
                var that = this;
         
                $( 'input', this.header() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that.search( this.value )
                            .draw();
                    }
                } );
            } );
        });
    </script>
</body>
</html>