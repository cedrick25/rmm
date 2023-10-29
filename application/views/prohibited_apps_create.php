<?php $this->load->view('templates/header.php'); ?> 

<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">
            <?php $this->load->view('templates/left-panel.php'); ?>
            <div class="layout-container">
                <?php $this->load->view('templates/avatar.php'); ?>
                <div class="layout-content"> 
                    <div class="container-fluid flex-grow-1 container-p-y">
                        <h4 class="font-weight-bold py-3 mb-0"> Cluster</h4>
                        <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                <li class="breadcrumb-item "><a href="prohibited_apps"><i class="feather icon-slash"></i> Prohibited Apps</a></li>
                                <li class="breadcrumb-item active"><i class="feather icon-slash"></i> Create Prohibited App</li>
                            </ol>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <strong>Prohibited App</strong>
                                    </div>
                                    <div class="card-body">
                                        <div class="alert alert-dark-success alert-dismissible fade show" id="success" style="display: none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Success! You have successfully created a new prohibited app."
                                        </div>
                                        <div class="alert alert-dark-danger alert-dismissible fade show" id="failed" style="display: none;">
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            "Oops! Something went wrong. Failed to create a new prohibited app."
                                        </div>
                                        <div class="col-md-6" style="display:;">
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">Name</label>
                                                    <input type="text" class="form-control name" placeholder="Steam">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <!-- <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label class="form-label">File Name</label>
                                                    <input type="text" class="form-control desc" placeholder="Steam.exe">
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div> -->
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <button type="submit" class="btn btn-info btn-sm float-right btn_confirm">Create</button> 
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
    </div>

    <?php $this->load->view('templates/footer.php'); ?> 
    <script type="text/javascript">
        $(document).ready(function() {
            $(".name").on("keyup", function(event) {
                if (event.key === "Enter") {
                    // Check if the Enter key was pressed
                    $(".btn_confirm").click(); // Programmatically trigger the "Confirm" button
                }
            });
            $(".btn_confirm").unbind("click").on("click", function(){
                $(this).prop('disabled', true);
                console.log('clicked')
                var required = ["name", "desc"];
                $(".errorRequired").remove()

                required.forEach(function(data){
                    if($("."+data).val() == "" || $("."+data).val() == null){
                        $("."+data).addClass("error_field");
                        $('<span class="errorRequired" style="font-style: italic; color: red; font-weight: bold; font-size: 11px;">* required field</span>').insertAfter(("."+data))

                    }else{
                        $("."+data).removeClass("error_field");
                    }
                });

                var requiredFields = $('.errorRequired:visible').length;
                console.log('Number of required fields: ' + requiredFields);

                if (requiredFields === 0) {
                    var payload = [{
                            "createdBy"     : "1",
                            "name"          : $(".name").val(),
                            "processName"   : $(".name").val()+'.exe',
                            "status"        : true,
                        }]
                    console.log(payload);
                    __executeExternalPost('/rmm-server/prohibited-apps/new',JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            if (result.status === "SUCCESS") {
                                $('#success').show();
                                $('#failed').hide();
                                setTimeout(function () {
                                    $(".btn_confirm").prop('disabled', false);
                                    $('#success').hide();
                                    $(".form-control").val('');
                                }, 2500);
                            }else{
                                $('#success').hide();
                                $('#failed').show();
                                $(".btn_confirm").prop('disabled', false);
                            }
                        }else{
                            console.log(result.status);
                            // alert(result.message)
                        }
                    })
                }else{
                 $(".btn_confirm").prop('disabled', false);
                }
            })
        });
    </script>
</body>
</html>