<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Prohibited Apps</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-slash"></i> Prohibited Apps</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>This apps is being monitored</strong>
                                        <a href="prohibited_apps_create"> <button type="button" class="btn btn-info float-right prohibited_apps_create" style=""><span class="feather icon-plus-circle"></span>&nbsp;&nbsp;Create Prohibited App</button></a>
                                    </div>
                                    <div class="card-body">

                                        <ul class="nav nav-tabs" id="hardwareSubTabs" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="apps-tab" data-toggle="tab" href="#apps" role="tab" aria-controls="apps" aria-selected="true">Prohibited Apps List</a>
                                            </li>
                                        </ul>

                                        <div class="tab-content mt-3">
                                            <div class="tab-pane fade show active" id="apps">
                                                <div id="prohibitedContainer" class="col-lg-6">
                                                    <table id="prohibitedTable" class="table table-hover table-sm">
                                                        <thead>
                                                            <tr>
                                                                <th>Application Name</th>
                                                                <th>Process Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <!-- Data will be inserted here -->
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