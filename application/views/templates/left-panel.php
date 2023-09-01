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
                    <!-- <li class="sidenav-item trackingNav" style="display: ;">
                        <a href="tracking" class="sidenav-link">
                            <i class="sidenav-icon feather icon-map-pin"></i>
                            <div>Tracking</div>
                        </a>
                    </li> -->
                    <li class="sidenav-item appNav" style="display: ;">
                        <a href="app_monitoring" class="sidenav-link">
                            <i class="sidenav-icon feather icon-slash"></i>
                            <div>App Monitoring</div>
                        </a>
                    </li>
                    <!-- <li class="sidenav-item notificationNav" style="display: ;">
                        <a href="notification" class="sidenav-link">
                            <i class="sidenav-icon feather icon-bell"></i>
                            <div>Notification</div>
                        </a>
                    </li> -->

                    <!-- User Management -->
                    <!-- <li class="sidenav-divider mb-1"></li>
                    <li class="sidenav-header small font-weight-semibold">System Settings</li>
                    <li class="sidenav-item userAccess">
                    <li class="sidenav-item userAccessPanel">
                        <a href="permission" class="sidenav-link">
                            <i class="sidenav-icon feather icon-user-plus"></i>
                            <div>Permissions</div>
                        </a>
                    </li>
                    <li class="sidenav-item userLevelsPanel">
                        <a href="user_role" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-database"></i>
                            <div>Roles</div>
                        </a>
                    </li>
                    <li class="sidenav-item departmentPanel">
                        <a href="department" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-apartment"></i>
                            <div>Departments</div>
                        </a>
                    </li>
                    <li class="sidenav-item locationPanel">
                        <a href="location" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-location"></i>
                            <div>Locations</div>
                        </a>
                    </li>
                    <li class="sidenav-item userAccountsPanel">
                        <a href="user_account" class="sidenav-link">
                            <i class="sidenav-icon lnr lnr-user"></i>
                            <div>User Accounts</div>
                        </a>
                    </li> -->
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