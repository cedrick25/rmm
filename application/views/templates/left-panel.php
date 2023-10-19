            <div id="layout-sidenav" class="layout-sidenav sidenav sidenav-vertical bg-white logo-dark">
                <!-- Brand demo (see assets/css/demo/demo.css) -->
                <div class="app-brand demo">
                <span class="app-brand-logo demo">
                    <img src="images/rmmlogo.png" alt="Brand Logo" class="d-block ui-w-30" style="width: 114px!important;">
                </span>
                    <a href="dashboard" class="app-brand-text demo sidenav-text font-weight-normal ml-2">RMM</a>
                </div>
                <div class="sidenav-divider mt-0"></div>

                <!-- Links -->
                <ul class="sidenav-inner py-1">

                    <!-- Dashboards -->
                    <li class="sidenav-item dashboardNav" style="">
                        <a href="/dashboard" class="sidenav-link">
                            <i class="sidenav-icon feather icon-home"></i>
                            <div>Dashboards</div>
                        </a>
                    </li>
                    <li class="sidenav-item clusterNav" style="">
                        <a href="/cluster" class="sidenav-link">
                            <i class="sidenav-icon feather icon-users"></i>
                            <div>Cluster</div>
                        </a>
                    </li>
                    <li class="sidenav-item appNav" style="">
                        <a href="/apps_and_services" class="sidenav-link">
                            <i class="sidenav-icon feather icon-settings"></i>
                            <div>Default apps and Services</div>
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
                document.addEventListener("DOMContentLoaded", function() {
                    const sidenavLinks = document.querySelectorAll(".sidenav-link");
                    const currentPath = window.location.pathname;
                    sidenavLinks.forEach(link => {
                    // console.log(link)
                    // console.log(link.getAttribute('href'))
                        if (link.getAttribute('href') === currentPath) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                });
            </script>