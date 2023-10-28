<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Notification</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-bell"></i> Notification</li>
                            </ol>
                        </div>
                        <div class="col-xl-7">
                            <div class="card mb-4">
                                <div class="card-header with-elements pb-0">
                                    <h6 class="card-header-title mb-0">Notifications</h6>
                                    <div class="card-header-elements ml-auto p-0">
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item">
                                                <a class="nav-link show active" data-toggle="tab" href="#all">All</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link show unreadTab" data-toggle="tab" href="#unread">Unread (<span class="notificationCount">0</span>)</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nav-tabs-top">
                                    <div class="tab-content">
                                        <div class="tab-pane fade active show" id="all">
                                            <div style="padding: 25px;" id="tab-table-1" class="ps ps--active-x ps--active-y">
                                                <table class="table table-hover card-table" id="allTables" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th>Device Name</th>
                                                            <th>Description</th>
                                                            <th>Received Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table_body">
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade " id="unread">


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 readContainer" style="display: none;">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h6 class="card-header-title mb-0 dev_name"></h6>
                                    <button type="button" class="close close-container" style="margin-top: -31px;">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="card-body">
                                    <!-- Description -->
                                    <dl>
                                        <dt>Description</dt>
                                        <dd class="desc"></dd>
                                        <dt>Received Date</dt>
                                        <dd class="createdDate"></dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php $this->load->view('templates/footer.php'); ?>
    <script src="assets/js/notification.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            list()
        });
    </script>
</body>
</html>