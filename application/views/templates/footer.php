
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
    
    <script type="text/javascript">
        window.paceOptions = {
            ajax: { ignoreURLs: [/notification\/unread\/count/] }
        };
    </script>
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
            return parseInt(localStorage.getItem('previousNotificationValue'), 10) || 0;
        }

        var previousValue = getPreviousValue();
        $(".notificationCount").html(previousValue);

        var notificationPoll = {
            xhr: null,
            timer: null,
            failureDelay: 10000,
            schedule: function(delay) {
                var self = this;
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {
                    self.fetch();
                }, delay);
            },
            fetch: function() {
                var self = this;
                var uuid = $.cookie("uuid");
                if (document.hidden || !uuid || this.xhr) {
                    return;
                }
                this.xhr = $.ajax({
                    method: "GET",
                    url: __getContext() + '/rmm-server/notification/unread/count/' + uuid,
                    dataType: "json",
                    timeout: 8000
                }).done(function(result) {
                    var newValue = result ? parseInt(result.response, 10) : NaN;
                    if (result && result.status === "SUCCESS" && !isNaN(newValue)) {
                        if (newValue !== previousValue) {
                            $(".notificationCount").html(newValue);
                            localStorage.setItem('previousNotificationValue', newValue);
                            previousValue = newValue;
                        }
                        self.failureDelay = 10000;
                        if (!document.hidden) {
                            self.schedule(3000);
                        }
                    } else if (!document.hidden) {
                        self.schedule(self.failureDelay);
                        self.failureDelay = Math.min(self.failureDelay * 2, 30000);
                    }
                }).fail(function(jqXHR, textStatus) {
                    if (textStatus === "abort" || document.hidden) {
                        return;
                    }
                    self.schedule(self.failureDelay);
                    self.failureDelay = Math.min(self.failureDelay * 2, 30000);
                }).always(function() {
                    self.xhr = null;
                });
            }
        };

        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                clearTimeout(notificationPoll.timer);
                if (notificationPoll.xhr) {
                    notificationPoll.xhr.abort();
                }
            } else {
                notificationPoll.fetch();
            }
        });

        notificationPoll.fetch();
        
        $(".btn_logout").unbind('click').on('click', function(){
            console.log("logout");
            removeAllCookies();
            localStorage.clear();
            // window.location.href = 'http://localhost/ams';
        })
    });
    </script>