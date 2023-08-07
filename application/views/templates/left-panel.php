            <div id="layout-sidenav" class="layout-sidenav sidenav sidenav-vertical bg-white logo-dark">
                <!-- Brand demo (see assets/css/demo/demo.css) -->
                <div class="app-brand demo">
                <span class="app-brand-logo demo">
                    <img src="assets/img/amslogo.png" alt="Brand Logo" class="d-block ui-w-30 rounded-circle">
                </span>
                    <a href="dashboard" class="app-brand-text demo sidenav-text font-weight-normal ml-2">SHELTER AMS</a>
<!--                <a href="javascript:" class="layout-sidenav-toggle sidenav-link text-large ml-auto">
                    <i class="ion ion-md-menu align-middle"></i>
                    </a> -->
                </div>
                <div class="sidenav-divider mt-0"></div>

                <!-- Links -->
                <ul class="sidenav-inner py-1">

                    <!-- Dashboards -->
                    <li class="sidenav-item dashboardPanel" style="display: none;">
                        <a href="dashboard" class="sidenav-link">
                            <i class="sidenav-icon feather icon-home"></i>
                            <div>Dashboards</div>
                        </a>
                    </li>
                    <li class="sidenav-item purchaseRequestPanel" style="display: none;">
                        <a href="purchase_request" class="sidenav-link">
                            <i class="sidenav-icon feather icon-shopping-cart"></i>
                            <div>Purchase Request</div>
                        </a>
                    </li>
                    <li class="sidenav-item purchaseOrderPanel" style="display: none;">
                        <a href="purchase_order" class="sidenav-link">
                            <i class="sidenav-icon feather icon-file-text"></i>
                            <div>Purchase Order</div>
                        </a>
                    </li>

                    <!-- Layouts -->
                    <li class="sidenav-divider mb-1"></li>
                    <li class="sidenav-header small font-weight-semibold">Inventory Management</li>
                    <li class="sidenav-item assetPanel" style="display: none;">
                        <a href="javascript;" class="sidenav-link sidenav-toggle">
                            <i class="sidenav-icon feather icon-clipboard"></i>
                            <div>Asset</div>
                        </a>
                        <ul class="sidenav-menu">
                            <li class="sidenav-item assetDashboardPanel" style="display: none;">
                                <a href="assets_dashboard" class="sidenav-link">
                                    <div>Asset Dashboard</div>
                                </a>
                            </li>
                            <li class="sidenav-item assetBatchPanel" style="display: none;">
                                <a href="asset_batch" class="sidenav-link">
                                    <div>Asset Batch</div>
                                </a>
                            </li>
                            <li class="sidenav-item assetBatchPanel" style="display: none;">
                                <a href="assets_details" class="sidenav-link">
                                    <div>Asset Details</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidenav-item assetRequestPanel" style="display: none;">
                        <a href="javascript;" class="sidenav-link sidenav-toggle ">
                            <i class="sidenav-icon feather icon-clipboard"></i>
                            <div>Assets Request</div>
                        </a>
                        <ul class="sidenav-menu">
                            <li class="sidenav-item assetRequestmyRequest" style="display: none;">
                                <a href="my_requests" class="sidenav-link">
                                    <div>My Requests</div>
                                </a>
                            </li>
                            <li class="sidenav-item assetRequestmyApproval" style="display: none;">
                                <a href="my_approval" class="sidenav-link">
                                    <div>My Approvals</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidenav-item vendorManagementPanel" style="display: none;">
                        <a href="vendor" class="sidenav-link">
                            <i class="sidenav-icon feather icon-shopping-cart"></i>
                            <div>Vendor Management</div>
                        </a>
                    </li>
                    <li class="sidenav-item productManagementPanel" style="display: none;">
                        <a href="product_management" class="sidenav-link">
                            <i class="sidenav-icon feather icon-package"></i>
                            <div>Product Management</div>
                        </a>
                    </li>

                    <li class="sidenav-item categoryManagementPanel" style="display: none;">
                        <a href="category_management" class="sidenav-link">
                            <i class="sidenav-icon feather icon-file"></i>
                            <div>Category Management</div>
                        </a>
                    </li>
                    <!-- User Management -->
                    <li class="sidenav-divider mb-1"></li>
                    <li class="sidenav-header small font-weight-semibold">System Settings</li>
                    <li class="sidenav-item userAccess" style="display:none;">
                    <li class="sidenav-item systemDashboardPanel" style="display: none;">
                        <a href="systemDashboard" class="sidenav-link">
                            <i class="sidenav-icon feather icon-settings"></i>
                            <div>System Dashboard</div>
                        </a>
                    </li>
                    <li class="sidenav-item userAccessPanel" style="display: none;">
                        <a href="userAccess" class="sidenav-link">
                            <i class="sidenav-icon feather icon-user-plus"></i>
                            <div>User Access</div>
                        </a>
                    </li>
                    <li class="sidenav-item userLevelsPanel" style="display: none;">
                        <a href="userLevels" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-database"></i>
                            <div>User Levels</div>
                        </a>
                    </li>
                    <li class="sidenav-item departmentPanel" style="display:none;">
                        <a href="departments" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-apartment"></i>
                            <div>Departments</div>
                        </a>
                    </li>
                    <li class="sidenav-item locationPanel" style="display: none;">
                        <a href="locations" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-location"></i>
                            <div>Locations</div>
                        </a>
                    </li>
                    <li class="sidenav-item userAccountsPanel" style="display: none;">
                        <a href="user_accounts" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-user"></i>
                            <div>User Accounts</div>
                        </a>
                    </li>
                    <li class="sidenav-item orgChartPanel" style="display: none;">
                        <a href="org_chart" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-user"></i>
                            <div>Organization Chart</div>
                        </a>
                    </li>
                </ul>
            </div>

            <script type="text/javascript">
                const sidenavLinks = document.querySelectorAll(".sidenav-link");

                // Loop through each link and add a click event listener
                sidenavLinks.forEach(link => {
                    link.addEventListener("click", function (event) {
                        // Remove the "active" class from all links
                        sidenavLinks.forEach(item => item.classList.remove("active"));
                        // document.querySelector('.active')?.classList.remove('active');
                        // Add the "active" class to the clicked link
                        this.classList.add('active');
                        console.log("clicked", this)
                    });
                });
            </script>