
    <nav class="layout-footer footer bg-white">
        <div class="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
            <div class="pt-3">
                <!-- <span class="footer-text font-weight-semibold">© <a href="https://srthemesvilla.com" class="footer-link" target="_blank">Srthemesvilla</a></span> -->
            </div>
            <div>
                <a href="javascript:" class="footer-link pt-3">About Us</a>
                <a href="javascript:" class="footer-link pt-3 ml-4">Help</a>
                <a href="javascript:" class="footer-link pt-3 ml-4">Contact</a>
                <a href="javascript:" class="footer-link pt-3 ml-4">Terms &amp; Conditions</a>
            </div>
        </div>
    </nav>
    
    <script src="assets/js/pace.js"></script>
    <!-- <script src="assets/js/jquery-3.3.1.min.js"></script> -->
    <script src="assets/js/jquery-3.2.0.min.js"></script>
    <script src="assets/libs/popper/popper.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    <script src="assets/js/sidenav.js"></script>
    <script src="assets/js/layout-helpers.js"></script>
    <script src="assets/js/material-ripple.js"></script>
    <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="vendors/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
    <script src="vendors/pdfmake/build/pdfmake.min.js"></script>
    <script src="vendors/pdfmake/build/vfs_fonts.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <!-- Libs -->
    <script src="assets/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="assets/libs/eve/eve.js"></script>
    <script src="assets/libs/flot/flot.js"></script>
    <script src="assets/libs/flot/curvedLines.js"></script>
    <script src="assets/libs/chart-am4/core.js"></script>
    <script src="assets/libs/chart-am4/charts.js"></script>
    <script src="assets/libs/chart-am4/animated.js"></script>

    <script src="assets/js/select2.min.js"></script>
    <script src="assets/js/demo.js"></script><script src="assets/js/analytics.js"></script>
    <script src="assets/js/pages/dashboards_index.js"></script>
    <script src="assets/js/ajax_main.js"></script>
    <script src="assets/js/jquery.cookie.js"></script>
    <!-- <script src="assets/js/cookie.js"></script> -->
    <script src="assets/js/viewer.min.js"></script>
    <!-- <script src="assets/js/mxgraph.js"></script> -->


    <script type="text/javascript">
    $(document).ready(function() {
        // cookie();
        $('.select2').select2({
            // dropdownParent: $('.modal'),
            width: '100%',
        });
        function getPreviousValue() {
            return parseInt(localStorage.getItem('previousNotificationValue')) || 0;
        }

        $(document).ready(function() {
            // Initial value when the page loads
            var previousValue = getPreviousValue();
            $(".notificationCount").html(previousValue);

            // Poll the API for value changes
            setInterval(function() {
                __executeExternalGet('/rmm-server/notification/unread/count/1111').done(function(result) {
                    // console.log(result);
                    var newValue = result.response;
                    
                    if (newValue !== previousValue) {
                        // Update the displayed value and save the new value
                        $(".notificationCount").html(newValue);
                        localStorage.setItem('previousNotificationValue', newValue);
                        previousValue = newValue;
                    }
                });
            }, 3000);
        });
        
        $(".btn_logout").unbind('click').on('click', function(){
            console.log("logout");
            removeAllCookies();
            localStorage.clear();
            // window.location.href = 'http://localhost/ams';
        })
    });
    </script>