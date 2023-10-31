<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Licensing</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-settings"></i> Licensing</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Subscription Support Services for one (1) year</strong>
                                        <!-- <a href="prohibited_apps_create"> <button type="button" class="btn btn-info float-right prohibited_apps_create" style=""><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;Create Prohibited App</button></a> -->
                                    </div>
                                    <div class="card-body">
                                        <div class="json-data"><h5>License</h5>
                                            <dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">
                                                <dt class="col-sm-3"><span>System License Key</span></dt>
                                                <dd class="col-sm-9">XXX-XXX-XXX</dd>
                                                <dt class="col-sm-3">System License Duration</dt>
                                                <dd class="col-sm-9">Perpetual</dd>
                                                <dt class="col-sm-3">Subscription License Key</dt>
                                                <dd class="col-sm-9">XXX-XXX-XXX</dd>
                                                <dt class="col-sm-3">Susbcription License Duration</dt>
                                                <dd class="col-sm-9">Sept. 6. 2023 - Sept. 6, 2024</dd>
                                            </dl>
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
    <script src="assets/js/apps_and_services.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            prohibited();

            function prohibited() {
                __executeExternalGet('/rmm-server/prohibited-apps/list').done(function(result) {
                    console.log(result)
                    if (result.status != "ERROR") {
                        var content = `
                        <table id="prohibitedTable" class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>File name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                        `;
                        result.response.forEach(function(data) {
                            content += `
                                <tr>
                                    <td>${data.name || 'N/A'}</td>
                                    <td>${data.processName || 'N/A'}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" data-id="${data.id}">Delete</button>
                                    </td>
                                </tr>
                            `;
                        });
                        content += `
                            </tbody>
                        </table>
                        `;
                        $('#prohibitedContainer').html(content);

                        $('#prohibitedContainer').on('click', '.btn-danger', function() {
                            var itemId = $(this).data('id');
                            var rowToRemove = $(this).closest('tr');
                            deleteProhibitedItem(itemId, rowToRemove);
                        });
                        function deleteProhibitedItem(itemId, rowToRemove) {

                            __executeExternalPost('/rmm-server/prohibited-apps/remove/'+itemId).done(function(result) {
                                console.log(result)
                                rowToRemove.remove();
                            })
                        }
                    } else {
                        console.log("failed fetching Cluster Name");
                    }
                }).fail(function() {
                    console.log("Error occurred while fetching data.");
                });
            }
        });
    </script>
</body>
</html>