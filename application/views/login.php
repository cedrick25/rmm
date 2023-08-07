<?php $this->load->view('templates/header.php'); ?> 

<body class="bg-dark">


    <!-- new User account modal -->

    <!-- new User account modal -->
    <div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <span style="font-size: 60px;"><b>AMS</b></span><br>
                    <span>Asset Management System</span>
                </div>
                <div class="login-form">
                    <div style="margin-bottom: 30px; text-align: center;">
                        <img class="align-content" src="images/amslogo.png" alt="" style="max-width: 32%;">
                    </div>
                    <div class="prompt" role="alert" id="prompt">
                    </div>
                    <hr>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-user"></i></div>
                            <input type="text" class="form-control email_username" placeholder="Email or Username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-lock"></i></div>
                            <input type="password" class="form-control password" placeholder="********">
                        </div>
                    </div>
                    <a href="#!">
                        <button type="submit" class="btn btn-success btn-flat m-b-30 m-t-30 btn-confirm">Sign in</button>
                    </a>
                    <div class="register-link m-t-15 text-center">
                        <p>Don't have account ? <a href="#!" data-toggle="modal" data-target="#newUserModal"> Sign Up Here</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/jquery-3.2.0.min.js"></script>
    <script src="assets/js/ajax_main.js"></script>
    <script src="assets/js/jquery.cookie.js"></script>
    <script src="assets/js/loginAMS.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            login();
        });
    </script>
</body>

</html>
