<?php $this->load->view('templates/header.php'); ?> 

<body class="bg-dark">


    <!-- new User account modal -->

    <!-- new User account modal -->
    <div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-form" style="margin-top: 90px;">
                    <div style="margin-bottom: 0px; text-align: center;">
                        <img class="align-content" src="images/rmmlogo.png" alt="" style="max-width: 32%;">
                    </div>
                    <div style="margin-bottom: 10px; text-align: center;">
                    <span style="font-size: 25px; text-align: center;">Remote Monitoring Management</span>
                    </div>
                    <div class="prompt" role="alert" id="prompt">
                    </div>
                    <hr>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-user"></i></div>
                                <input type="text" class="form-control email_username" placeholder="Email or Username">
                            </div>
                        </div>
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-lock"></i></div>
                                <input type="password" class="form-control password" placeholder="********">
                            </div>
                        </div>
                    </div>
                    <a href="javascript:">
                        <button type="submit" class="btn btn-info btn-flat m-b-30 m-t-30 btn-confirm">Log in</button>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/jquery-3.2.0.min.js"></script>
    <script src="assets/js/ajax_main.js"></script>
    <script src="assets/js/jquery.cookie.js"></script>
    <script src="assets/js/login.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            login();
        });
    </script>
</body>

</html>
