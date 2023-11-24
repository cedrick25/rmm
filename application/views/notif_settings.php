<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Notification Settings</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-settings"></i> Notification Settings</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-7">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Schedule Notification</strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display: none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! You have successfully updated a notification schedule."
                                        </div>
                                        <div class="alert alert-dark-danger alert-dismissible fade show" id="failed" style="display: none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Oops! Something went wrong. Failed to update notification schedule."
                                        </div>
                                        <div class="col-md-12" style="display:;">
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Default Time:</label>
                                                    <span class="default_time">09:00 AM</span>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label class="form-label">Set Time</label>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <select class="form-control update_hour"></select>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <select class="form-control update_minute"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label class="form-label">&nbsp;</label>
                                                    <select class="form-control desc_update_ampm">
                                                        <option value="AM">AM</option>
                                                        <option value="PM">PM</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">&nbsp;</label>
                                                <button type="submit" class="btn btn-info btn float-right btn_confirm">Confirm</button>
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
    <script src="assets/js/notification.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            for (let i = 1; i <= 12; i++) {
                const formattedHour = i < 10 ? `0${i}` : `${i}`;
                $('.update_hour').append(`<option value="${formattedHour}">${formattedHour}</option>`);
            }

            for (let i = 0; i <= 59; i++) {
                const formattedMinute = i < 10 ? `0${i}` : `${i}`;
                $('.update_minute').append(`<option value="${formattedMinute}">${formattedMinute}</option>`);
            }

            $('.btn_confirm').on('click', function () {
                $(".btn_confirm").prop('disabled', true);
                const selectedHour = $('.update_hour').val();
                const selectedMinute = $('.update_minute').val();
                const selectedAmPm = $('.desc_update_ampm').val();

                const time = selectedHour +":"+ selectedMinute +" "+ selectedAmPm;
                console.log(time)
                var payload = {
                    "time" : time
                }
                // __executeExternalPost('/rmm-server/device/edit/',JSON.stringify(payload)).done(function (result) {
                //     console.log(result);
                //     if (result.status != "ERROR") {
                //         if (result.status === "SUCCESS") {
                //             $('#success').show();
                //             $('#failed').hide();
                //             setTimeout(function () {
                //                 $(".btn_confirm").prop('disabled', false);
                //                 $('#success').hide();
                //                 $(".form-control").val('');
                //             }, 2500);
                //         }else{
                //             $('#success').hide();
                //             $('#failed').show();
                //             $(".btn_confirm").prop('disabled', false);
                //         }
                //     }else{
                //         console.log(result.status);
                //         // alert(result.message)
                //     }
                // })
            });
        });
    </script>
</body>
</html>