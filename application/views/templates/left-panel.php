            <div id="layout-sidenav" class="layout-sidenav sidenav sidenav-vertical bg-white logo-dark">
                <!-- Brand demo (see assets/css/demo/demo.css) -->
                <div class="app-brand demo">
                <span class="app-brand-logo demo">
                    <!-- <img src="assets/img/amslogo.png" alt="Brand Logo" class="d-block ui-w-30 rounded-circle"> -->
                </span>
                    <a href="dashboard" class="app-brand-text demo sidenav-text font-weight-normal ml-2">RMM</a>
                </div>
                <div class="sidenav-divider mt-0"></div>

                <!-- Links -->
                <ul class="sidenav-inner py-1">

                    <!-- Dashboards -->
                    <li class="sidenav-item dashboardNav" style="display: ;">
                        <a href="dashboard" class="sidenav-link">
                            <i class="sidenav-icon feather icon-home"></i>
                            <div>Dashboards</div>
                        </a>
                    </li>
                    <li class="sidenav-item clusterNav" style="display: ;">
                        <a href="cluster" class="sidenav-link">
                            <i class="sidenav-icon feather icon-users"></i>
                            <div>Cluster</div>
                        </a>
                    </li>
                    <li class="sidenav-item trackingNav" style="display: ;">
                        <a href="tracking" class="sidenav-link">
                            <i class="sidenav-icon feather icon-map-pin"></i>
                            <div>Tracking</div>
                        </a>
                    </li>
                    <li class="sidenav-item appNav" style="display: ;">
                        <a href="whitelisting" class="sidenav-link">
                            <i class="sidenav-icon feather icon-slash"></i>
                            <div>App Whitelisting</div>
                        </a>
                    </li>
                    <li class="sidenav-item notificationNav" style="display: ;">
                        <a href="notification" class="sidenav-link">
                            <i class="sidenav-icon feather icon-bell"></i>
                            <div>Notification</div>
                        </a>
                    </li>

                    <!-- User Management -->
                    <!-- <li class="sidenav-divider mb-1"></li> -->
                    <!-- <li class="sidenav-header small font-weight-semibold">System Settings</li> -->
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