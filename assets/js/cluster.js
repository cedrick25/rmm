var list = function(){

    var __table = function(){
        __executeExternalGet('8090/cluster/list').done(function (result) {
            // console.log("=====user=====")
            // console.log(result)
            // console.log("=====user=====")

            if (result.status != "ERROR") {

                result.response.forEach(function(data){
                    console.log(data)
                    var cardHtml = `
                        <div class="col-md-4">
                            <div class="card mb-4 bg-pattern-3-dark">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="text-primary"><i class="fas fa-desktop" style="font-size: 26px;"></i>
                                        </div>
                                        <div class="ml-3">
                                            <a href="cluster_update?clusterID=${data.id}" data-toggle="tooltip" data-placement="top" title="Update Name and Description">
                                                <div class="text-large">${data.name}</div>
                                            </a>
                                            <div class="text-muted small">${data.description}</div>
                                            <div style="margin-top: 5px;">
                                                <a href="cluster_devices?clusterID=${data.id}&clusterName=${data.name}">
                                                    <button type="button" class="btn btn-sm btn-primary"><span class="feather icon-eye"></span>&nbsp;&nbsp;View Devices</button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    $('#cluster_container').append(cardHtml);
                });
                $(".btn_update").unbind("click").on("click", function(){
                    var userId = $(this).data("id");
                    // console.log(data_id)
                    window.location.href = 'http://localhost/rmm/user_account_update?userId='+userId;
                });
            }
        })
    }
    __table();
}

var create = function(){
    console.log("attached events")
    $(".btn_confirm").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["name", "proj", "desc"];
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
            var payload = {
                    "createdBy"     : "1",
                    "name"          : $(".name").val(),
                    "description"   : $(".desc").val(),
                    "project"       : "ppa",
                    "status"        : true,
                }
            console.log(payload);
            __executeExternalPost('8090/cluster/new',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.status === "SUCCESS") {
                        $('#success').show();
                        $('#failed').hide();
                        setTimeout(function () {
                            $('#success').hide();
                            $(".form-control").val('');
                                // setTimeout(function () {
                                //     window.location.reload(true);
                                // }, 500);
                        }, 2500);
                    }else{
                        $('#success').hide();
                        $('#failed').show();
                    }
                }else{
                    console.log(result.status);
                    // alert(result.message)
                }
            })
        }
    })
}

var update = function(){
    console.log("attached events")

    var clusterID = getUrlParameter('clusterID');

    $(".btn_confirm_update").unbind("click").on("click", function(){
        console.log('clicked')
        var required = ["name_update", "proj_update", "desc_update"];
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
            var payload = {
                    "createdBy"     : "1",
                    "name"          : $(".name_update").val(),
                    "description"   : $(".desc_update").val(),
                    "project"       : $(".proj_update").val(),
                    "status"        : true,
                }
            console.log(payload);
            __executeExternalPost('8090/cluster/edit/'+clusterID,JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.status === "SUCCESS") {
                        $('#success').show();
                        $('#failed').hide();
                        setTimeout(function () {
                            $('#success').hide();
                            $(".form-control").val('');
                                // setTimeout(function () {
                                //     window.location.reload(true);
                                // }, 500);
                        }, 2500);
                    }else{
                        $('#success').hide();
                        $('#failed').show();
                    }
                }else{
                    console.log(result.status);
                    // alert(result.message)
                }
            })
        }
    })
}

var cluster_devices = function(){

    var clusterID = getUrlParameter('clusterID');
    var clusterName = getUrlParameter('clusterName');
    $('.cluster_header').html("Cluster Name: <span style='text-decoration: underline;'>" + clusterName + "</span>").css('font-weight', 'bold');

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();
        __executeExternalGet('8090/device/list/'+clusterID).done(function (result) {
            // console.log("=====user=====")
            // console.log(result)
            // console.log("=====user=====")

            if (result.status != "ERROR") {

                result.response.forEach(function(data){
                    console.log(data)
                    $('.table_body').append("<tr>"+
                        "<td style='text-align: center;'><i class='fas fa-desktop' style='font-size: 26px;'></i></td>"+
                        "<td>"+data.manufacturer+"</td>"+
                        "<td>"+data.description+"</td>"+
                        "<td>"+data.serialNumber+"</td>"+
                        "<td>"+data.status+"</td>"+
                        "<td class='actions'> <a href='cluster_device_details?deviceId="+data.id+"&deviceName="+data.manufacturer+"'><button class='btn btn-sm btn-info btn_view' type='submit'><i class='feather icon-eye'></i> View details</button></a></td>")
                });

                var table = $('.table_head').DataTable({
                    scrollX: true,
                    responsive: true, // Enable responsive design if needed
                    paging: true,
                });
            }
        })
    }
    __table();
}

var cluster_device_details = function(){

    var deviceId = getUrlParameter('deviceId');
    var deviceName = getUrlParameter('deviceName');
    $('.device_header').html("Device Name: <span style='text-decoration: underline;'>" + deviceName + "</span>").css('font-weight', 'bold');

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();
        __executeExternalGet('8090/deviceDetail/'+deviceId).done(function (result) {
            // console.log("=====user=====")
            // console.log(result)
            // console.log("=====user=====")

            if (result.status != "ERROR") {

                var responseArray = result.response;
                // Create a function to generate tab content
                // function generateTabContent(jsonData) {
                //     var parsedData = JSON.stringify(jsonData.jsonData); // Parse the JSON string
                //     var beautifiedData = JSON.parse(parsedData, null, 2); // Beautify the parsed data
                    
                //     var content = '<div class="tab-pane fade" id="' + jsonData.type + '" role="tabpanel">';
                //     content += '<div class="json-data">';
                //     content += '<pre>' + beautifiedData + '</pre>';
                //     content += '</div>';
                //     content += '</div>';
                //     return content;
                // }

                for (var i = 0; i < responseArray.length; i++) {
                    var data = responseArray[i];
                    console.log(data)
                    if (data.type === "Motherboard + Firmware") {

                        var beautifiedData = JSON.parse(data.jsonData, null, 2); // Beautify the parsed data
                        console.log(beautifiedData);
                        $(".mf_field").html(`
                            <h4><b>FIRMWARE</b></h4>
                                <dl class="row" style="margin-left:60px; margin-top: 10px;">
                                    <dt class="col-sm-3">DESCRIPTION</dt>
                                    <dd class="col-sm-9">${beautifiedData.firmware.description}</dd>
                                    <dt class="col-sm-3">MANUFACTURER</dt>
                                    <dd class="col-sm-9">${beautifiedData.firmware.manufacturer}</dd>
                                    <dt class="col-sm-3">RELEASE DATE</dt>
                                    <dd class="col-sm-9">${beautifiedData.firmware.releaseDate}</dd>
                                    <dt class="col-sm-3">NAME</dt>
                                    <dd class="col-sm-9">${beautifiedData.firmware.name}</dd>
                                    <dt class="col-sm-3">VERSION</dt>
                                    <dd class="col-sm-9">${beautifiedData.firmware.version}</dd>
                                </dl>
                            <h4><b>BASEBOARD</b></h4>
                                <dl class="row" style="margin-left:60px; margin-top: 10px;">
                                    <dt class="col-sm-3">MANUFACTURER</dt>
                                    <dd class="col-sm-9">${beautifiedData.baseboard.manufacturer}</dd>
                                    <dt class="col-sm-3">MODEL</dt>
                                    <dd class="col-sm-9">${beautifiedData.baseboard.model}</dd>
                                    <dt class="col-sm-3">SERIAL NUMBER</dt>
                                    <dd class="col-sm-9">${beautifiedData.baseboard.serialNumber}</dd>
                                    <dt class="col-sm-3">VERSION</dt>
                                    <dd class="col-sm-9">${beautifiedData.baseboard.version}</dd>
                                </dl>
                            `)
                        console.log("true");
                    }else{
                        console.log("false");
                    }
                }

                //     // Create tab element
                //     var tabElement = '<li class="nav-item">';
                //     tabElement += '<a class="nav-link" id="tab-' + data.type + '-tab" data-toggle="tab" href="#' + data.type + '" role="tab" aria-controls="' + data.type + '" aria-selected="false">' + data.type + '</a>';
                //     tabElement += '</li>';

                //     // Append tab element to the tab list
                //     $('#myTabs').append(tabElement);

                //     // Generate tab content and append to the tab content section
                //     var tabContent = generateTabContent(data);
                //     $('#myTabsContent').append(tabContent);
                // }

                // Activate the first tab by default
                $('.nav-tabs a:first').tab('show');
            }
        })
    }
    __table();
}