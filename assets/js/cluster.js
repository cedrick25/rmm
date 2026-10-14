var list = function(){
    $('#divLoading').show()
    __executeExternalGet('/rmm-server/cluster/list').done(function (result) {
        if (result.status != "ERROR") {
            $('#divLoading').hide()

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
                window.location.href = anyhost+'/user_account_update?userId='+userId;
            });
        }
    })
}

var create = function(){
    console.log("attached events")
    $(".btn_confirm").unbind("click").on("click", function(){
        $(this).prop('disabled', true);
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
            __executeExternalPost('/rmm-server/cluster/new',JSON.stringify(payload)).done(function (result) {
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
}

var update = function(){
    console.log("attached events")

    var clusterID = getUrlParameter('clusterID');
    __executeExternalGet('/rmm-server/cluster/'+clusterID).done(function (result) {
        console.log(result)
        if (result.status != "ERROR") {
            $(".name").html(result.response.name)
            $(".description").html(result.response.description)
            $(".name_update").val(result.response.name)
            $(".desc_update").val(result.response.description)
            
            $(".btn_confirm_update").unbind("click").on("click", function(){
                $(this).prop('disabled', true);
                console.log('clicked')
                var required = ["name_update", "desc_update"];
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
                            "project"       : "ppa",
                            "status"        : true,
                        }
                    console.log(payload);
                    __executeExternalPost('/rmm-server/cluster/edit/'+clusterID,JSON.stringify(payload)).done(function (result) {
                        console.log(result);
                        if (result.status != "ERROR") {
                            if (result.status === "SUCCESS") {
                                $(".name").html($(".name_update").val())
                                $(".description").html($(".desc_update").val())
                                $('#success').show();
                                $('#failed').hide();
                                $(".btn_confirm_update").prop('disabled', false);
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
                                $(".btn_confirm_update").prop('disabled', false);
                            }
                        }else{
                            console.log(result.status);
                            // alert(result.message)
                        }
                    })
                }else{
                    $(".btn_confirm_update").prop('disabled', false);
                }
            })
        }
    })
}

var cluster_devices = function(){

    var clusterID = getUrlParameter('clusterID');
    var clusterName = getUrlParameter('clusterName');
    if (clusterID == "0") {
        $('.cluster_header').html("<span style='text-decoration: underline;'>Device Registration</span>").css('font-weight', 'bold');
    } else {
        $('.cluster_header').html("Cluster Name: <span style='text-decoration: underline;'>" + clusterName + "</span>").css('font-weight', 'bold');
    }
    $('#divLoading').show()
    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();
        __executeExternalGet('/rmm-server/device/list/'+clusterID).done(function (result) {
            console.log(result)

            if (result.status != "ERROR") {
            $('#divLoading').hide()

                result.response.forEach(function(data){
                    console.log(data)
                    $('.table_body').append("<tr>"+
                        "<td style='text-align: center;'><label class='custom-control custom-checkbox m-0'><input type='checkbox' class='custom-control-input' data-id='"+data.id+"' data-name='"+data.deviceName+"'><span class='custom-control-label'></span> <i class='fas fa-desktop' style='font-size: 26px;'></i></label></td>"+
                        "<td>"+data.deviceName+"</td>"+
                        "<td>"+data.manufacturer+"</td>"+
                        "<td>"+data.description+"</td>"+
                        "<td>"+data.serialNumber+"</td>"+
                        "<td class='actions'> <a href='cluster_device_details?deviceId="+data.id+"&deviceName="+data.manufacturer+"'><button class='btn btn-sm btn-info btn_view' type='submit'><i class='feather icon-eye'></i> View details</button></a> <button class='btn btn-sm btn-info update_device' type='submit' data-id='"+data.id+"' style=''> Update Device </button></td>")
                });
                var table = $('.table_head').DataTable({
                    scrollX: true,
                    responsive: true,
                    paging: true,
                });

                $('#select-all').on('change', function () {
                    var isChecked = $(this).prop('checked');
                    $('.table_body .custom-control-input').prop('checked', isChecked);
                });

                // Handle individual checkbox change event using delegated event handling
                $('.table_head').on('change', '.custom-control-input', function () {
                    var allChecked = $('.table_body .custom-control-input:checked').length === $('.table_body .custom-control-input').length;
                    $('#select-all').prop('checked', allChecked);
                    updateMoveClusterButton();
                });

                $('.table_head').on('click', '.btn_update', function() {
                    var id = $(this).data('id');
                    window.location.href = '/ams/asset_view_details?device=' + id;
                });

                $('.table_head').on('click', '.update_device', function() {
                    var id = $(this).data("id");
                    window.location.href = '/cluster_device_update?device='+id;
                });

                $('.moveCluster').prop('disabled', true);

                $('.table_body').on('change', '.custom-control-input', function() {
                    updateMoveClusterButton();
                });

                $('.moveCluster').on('click', function() {
                    localStorage.removeItem('devices');
                    var devices = [];
                    $('.table_body .custom-control-input:checked').each(function() {
                        var devID = $(this).data('id');
                        var devName = $(this).data('name');
                        devices.push({ id: devID, name: devName });
                    });

                    localStorage.setItem('devices', JSON.stringify(devices));
                    var url = '/cluster_move_device?';
                    window.location.href = url;
                });

                function updateMoveClusterButton() {
                    var isChecked = $('.table_body .custom-control-input:checked').length > 0;
                    $('.moveCluster').prop('disabled', !isChecked);
                }
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
        $('#divLoading').show()

        __executeExternalGet('/rmm-server/deviceDetail/'+deviceId).done(function (result) {
            if (result.status == "ERROR" || !result.response) {
                $('#divLoading').removeClass('alert-info').addClass('alert-danger').html('Device details are unavailable.');
                return;
            }
            $(document).ready(function() {
                    $('#divLoading').hide()

                    var responseArray = result.response;
                    function detailByType(type) {
                        for (var i = 0; i < responseArray.length; i++) {
                            if (responseArray[i].type === type) {
                                return responseArray[i];
                            }
                        }
                        return null;
                    }
                    function parseDetailJson(jsonData) {
                        if (!jsonData) {
                            return null;
                        }
                        try {
                            return JSON.parse(jsonData);
                        } catch (e) {
                            return null;
                        }
                    }
                    function showSectionError(selector, message) {
                        $(selector).removeClass('alert-info').addClass('alert-danger').html(message).show();
                    }
                    function generateTabContent(data) {
                        var content = `<div class="tab-pane fade" id="${data.type}" role="tabpanel">`;

                        if (data.type === "CS") {
                            var beautifiedData = JSON.parse(data.jsonData);

                            content += '<div class="json-data">';
                            content += generateKeyValuePairs(beautifiedData.firmware, 'FIRMWARE');
                            content += generateKeyValuePairs(beautifiedData.baseboard, 'BASEBOARD');
                            content += '</div>';
                        } else if (data.type === "USB_DEVICES") {
                            var beautifiedDataUSB = JSON.parse(data.jsonData);
                            content += generateUsbDevicesTable(beautifiedDataUSB);
                        } else if (data.type === "GPU") {
                            var gpuData = JSON.parse(data.jsonData);
                            content += generateGPUContent(gpuData);
                        } else if (data.type === "DISPLAYS") {
                            content += generateDisplayContent(data);
                        } else if (data.type === "BATTERY") {
                            content += generateBatteryContent(data);
                        } else if (data.type === "CPU" ) {
                            // console.log(data.type)
                            content += '<div class="json-data">';
                            content += '<form class="form-inline">';
                                content += '<label class="form-label mr-sm-2">Usage</label>';
                                content += '<select class="custom-select mr-sm-2 mb-2 mb-sm-0 col-md-3" id="CPUusageSelect">';
                                    content += '<option value="realtime" selected>Get Realtime</option>';
                                    content += '<option value="weekly" disabled>Get Weekly</option>';
                                    content += '<option value="monthly" disabled>Get Monthly</option>';
                                content += '</select>';
                            content += '</form>';
                            content += '<br><div class="form-group">';
                                content += '<div class="col-sm-10">';
                                    content += '<div class="custom-controls-stacked">';
                                        content += '<label class="custom-control custom-radio">';
                                            content += '<input name="custom-radio-3" type="radio" class="custom-control-input" value="SystemCpuLoadTicks" checked>';
                                            content += '<span class="custom-control-label">Overall Utilization</span>';
                                        content += '</label>';
                                        content += '<label class="custom-control custom-radio">';
                                            content += '<input name="custom-radio-3" type="radio" class="custom-control-input" value="ProcessorCpuLoadTicks">';
                                            content += '<span class="custom-control-label">Logical Processors</span>';
                                        content += '</label>';
                                    content += '</div>';
                                content += '</div>';
                            content += '</div><br><br><br>';
                            content += '<div class="alert alert-info" role="alert" style="font-weight: bolder; color: #3d80c5; display: none;" id="divLoadingCPU">';
                            content += '<i class="fas fa-spinner fa-pulse"></i> Loading...';
                            content += '</div>';
                            content += '<div id="cpuChartContainer" class="row cpuChartContainer"></div>';
                            content += '<div class="cpu_info"></div>';
                            content += '</div>';

                            $(document).ready(function() {
                                var cpuDetails = parseDetailJson(data.jsonData);
                                if (!cpuDetails) {
                                    showSectionError('#divLoadingCPU', 'CPU information is unavailable.');
                                    return;
                                }
                                displayCPUInfo();
                                function displayCPUInfo() {
                                    if (!cpuDetails.processorIdentifier) {
                                        showSectionError('#divLoadingCPU', 'CPU information is unavailable.');
                                        return;
                                    }
                                    var infoContent = '<br><br><h5>CPU Information</h5><br>';
                                    infoContent += '<p><strong>CPU Name:</strong> ' + (cpuDetails.processorIdentifier.name || '').trim() + '</p>';
                                    infoContent += '<p><strong>CPU Model:</strong> ' + cpuDetails.processorIdentifier.model + '</p>';
                                    infoContent += '<p><strong>Physical Processors:</strong> ' + cpuDetails.physicalProcessorCount + '</p>';
                                    infoContent += '<p><strong>Logical Processors:</strong> ' + cpuDetails.logicalProcessorCount + '</p>';

                                    var cacheContent = '';
                                    if (cpuDetails.processorCaches) {
                                        cacheContent += '<br><h5>CPU Caches</h5><br>';
                                        cpuDetails.processorCaches.forEach(function(cache) {
                                            cacheContent += '<p><strong>Level ' + cache.level + ' Cache:</strong> ';
                                            cacheContent += 'Size: ' + cache.cacheSize + 'KB, ';
                                            cacheContent += 'Type: ' + cache.type + ', ';
                                            cacheContent += 'Associativity: ' + cache.associativity + ', ';
                                            cacheContent += 'Line Size: ' + cache.lineSize + '</p>';
                                        });
                                    }

                                    $('.cpu_info').html(infoContent + cacheContent);
                                }
                                function renderCpuSelection(selectedDataType) {
                                    var detail = detailByType(selectedDataType);
                                    var ticks = detail ? parseDetailJson(detail.jsonData) : null;
                                    if (!ticks) {
                                        showSectionError('#divLoadingCPU', 'CPU usage is unavailable.');
                                        return;
                                    }
                                    $('#divLoadingCPU').hide();
                                    if (selectedDataType === "SystemCpuLoadTicks") {
                                        renderSystemCpuLoadTicks(ticks);
                                    } else if (selectedDataType === "ProcessorCpuLoadTicks") {
                                        renderProcessorCpuLoadTicks(ticks);
                                    }
                                }
                                renderCpuSelection($('input[name="custom-radio-3"]:checked').val());
                                $('input[name="custom-radio-3"]').on('change', function() {
                                    var selectedDataType = $('input[name="custom-radio-3"]:checked').val();
                                    $('.cpuChartContainer').empty();
                                    renderCpuSelection(selectedDataType);
                                });
                            });
                        } else if (data.type === "STORAGE") {
                            content += '<div class="json-data">';
                            content += '<form class="form-inline">';
                                content += '<label class="form-label mr-sm-2">Usage</label>';
                                content += '<select class="custom-select mr-sm-2 mb-2 mb-sm-0 col-md-3" id="StorageUsageSelect">';
                                    content += '<option value="realtime" selected>Get Realtime</option>';
                                    content += '<option value="weekly" disabled>Get Weekly</option>';
                                    content += '<option value="monthly" disabled>Get Monthly</option>';
                                content += '</select>';
                            content += '</form>';

                            content += '<br><div class="alert alert-info divLoadingStorage" role="alert" style="font-weight: bolder; color: #3d80c5; display: ;" id="">';
                            content += '<i class="fas fa-spinner fa-pulse"></i> Loading...';
                            content += '</div>';

                                content += '<div class="row" id="storageContainer">';
                                content += '</div>';
                            content += '</div>';

                        } else if (data.type === "MEMORY") {
                            content += '<div class="json-data">';
                            content += '<form class="form-inline">';
                                content += '<label class="form-label mr-sm-2">Usage</label>';
                                content += '<select class="custom-select mr-sm-2 mb-2 mb-sm-0 col-md-3" id="usageSelect">';
                                    content += '<option value="realtime" selected>Get Realtime</option>';
                                    content += '<option value="weekly" disabled>Get Weekly</option>';
                                    content += '<option value="monthly" disabled>Get Monthly</option>';
                                content += '</select>';
                            content += '</form>';

                            content += '<br><div class="alert alert-info divLoadingMemory" role="alert" style="font-weight: bolder; color: #3d80c5; display: ;" id="">';
                            content += '<i class="fas fa-spinner fa-pulse"></i> Loading...';
                            content += '</div>';

                            content += '<div id="chartContainer">';
                            content += '<canvas id="memoryChart"></canvas>';
                            content += '</div>';
                            content += '<div class="mem_info"></div>';
                            content += '</div>';
                        } else {
                            content += `<pre class="json-data">${JSON.stringify(data, null, 2)}</pre>`;
                            console.log('false');
                        }

                        content += '</div>';
                        return content;
                    }
                    function renderStorage(jsonData) {
                        var storageArray = parseDetailJson(jsonData);
                        if (!storageArray || !storageArray.hwDiskStores) {
                            showSectionError('.divLoadingStorage', 'Storage information is unavailable.');
                            return;
                        }
                        var content = '';
                        var partitionStorage = storageArray.partitions || [];
                        storageArray.hwDiskStores.forEach(function(storage) {
                            content += generateStorageProgressBar(storage, partitionStorage);
                        });
                        $('#storageContainer').html(content);
                        $('.divLoadingStorage').hide();

                        function generateStorageProgressBar(storage, partitionStorage) {
                            console.log(partitionStorage)
                            $('.divLoadingStorage').hide()

                            let progressBar = '';
                            progressBar += '<div class="col-md-12" style="border: 1px solid #dee2e6; margin-top:10px; padding-bottom:22px;">';
                                progressBar += '<div class="col-md-12">';
                                var name = storage.name
                                var readBytes  = computeBytesToGB(storage.readBytes)
                                var reads      = bytesToMB(storage.reads)
                                var writeBytes = computeBytesToGB(storage.writeBytes)
                                var writes     = bytesToMB(storage.writes)
                                progressBar += '<br><h3>Storage Information</h3>';
                                progressBar += '<div class="col-md-6">';
                                    progressBar += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:15px">';
                                        progressBar += `<dt class="col-sm-3"><span>Model:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${storage.model}</dd>`;
                                        progressBar += `<dt class="col-sm-3"><span>Name:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${name}</dd>`;
                                        progressBar += `<dt class="col-sm-3"><span>Serial:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${storage.serial}</dd>`;
                                        progressBar += `<dt class="col-sm-3"><span>ReadBytes:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${readBytes} GB</dd>`;
                                    progressBar += '</dl>';
                                progressBar += '</div>';
                                progressBar += '<div class="col-md-6">';
                                    progressBar += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:15px; margin-bottom: 10px;">';
                                        progressBar += `<dt class="col-sm-3"><span>Reads:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${reads} MB</dd>`;
                                        progressBar += `<dt class="col-sm-3"><span>WriteBytes:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${writeBytes} GB</dd>`;
                                        progressBar += `<dt class="col-sm-3"><span>Writes:</span></dt>`;
                                        progressBar += `<dd class="col-sm-9">${writes} MB</dd>`;
                                    progressBar += '</dl>';
                                progressBar += '</div>';
                            progressBar += '</div>';
                                progressBar += '<div class="col-lg-12">';
                                    if (storage.partitions && storage.partitions.length > 0) {
                                        progressBar += '<h3>Partitions</h3>';
                                        storage.partitions.forEach(partition => {
                                            console.log(partition)
                                            progressBar += '<div class="col-sm-6">';
                                                progressBar += '<div class="col-sm-12" style="border: 1px solid #dee2e6; padding-bottom: 18px; padding-left: 18px; padding-right: 18px;margin-top:10px;background: #fff; color: #111">';
                                                progressBar += `<br><span>Identification: ${partition.identification}</span><br>`;
                                                progressBar += `<span>Mount Point: ${partition.mountPoint}</span>`;

                                                const matchedPartition = partitionStorage.find(part => part.partition === partition.mountPoint);
                                                if (matchedPartition) {
                                                    // Calculate the used percentage
                                                    const totalSpace = parseInt(matchedPartition.totalSpace, 10);
                                                    const availableSpace = parseInt(matchedPartition.availableSpace, 10);
                                                    const usedSpace = parseInt(matchedPartition.usedSpace, 10);
                                                    const usedPercentage = ((usedSpace / totalSpace) * 100).toFixed(2);

                                                    progressBar += '<div class="progress" style="height: 30px;">';
                                                    progressBar += `<div class="progress-bar progress-bar-striped bg-info" style="width: ${usedPercentage}%;" aria-valuenow="${usedPercentage}" aria-valuemin="0" aria-valuemax="100">${usedPercentage}% Used</div>`;
                                                    progressBar += '</div>';

                                                    progressBar += `<span>Total Space: ${computeBytesToGB(matchedPartition.totalSpace)} GB</span><br>`;
                                                    progressBar += `<span>Available Space: ${computeBytesToGB(matchedPartition.availableSpace)} GB</span><br>`;
                                                    progressBar += `<span>Used Space: ${computeBytesToGB(matchedPartition.usedSpace)} GB</span><br>`;
                                                }
                                                progressBar += '</div>';
                                            progressBar += '</div>';
                                        });
                                    }
                                progressBar += '</div>';
                            progressBar += '</div>';

                            return progressBar;
                        }
                    }
                    function renderSystemCpuLoadTicks(jsonData) {
                        $('#divLoadingCPU').hide();
                        var ticks = Array.isArray(jsonData) ? jsonData : [];
                        var labels = ['User', 'Nice', 'System', 'Idle', 'I/O Wait', 'IRQ', 'Soft IRQ', 'Steal'];
                        var canvas = document.createElement('canvas');
                        var container = $('#cpuChartContainer');
                        container.empty().append(canvas);
                        var ctx = canvas.getContext('2d');
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ticks.map(function(_, i) { return labels[i] || ('Tick ' + (i + 1)); }),
                                datasets: [{
                                    label: 'System CPU Load Ticks',
                                    data: ticks,
                                    borderColor: 'rgb(75, 192, 192)',
                                    fill: false,
                                }],
                            },
                            options: {
                                scales: {
                                    x: { type: 'category', beginAtZero: true },
                                    y: { beginAtZero: true }
                                }
                            }
                        });
                    }
                    function renderProcessorCpuLoadTicks(jsonData) {
                        $('#divLoadingCPU').hide();
                        var processors = Array.isArray(jsonData) ? jsonData : [];
                        var container = $('#cpuChartContainer');
                        container.empty();
                        if (!processors.length) {
                            showSectionError('#divLoadingCPU', 'CPU usage is unavailable.');
                            return;
                        }
                        processors.forEach(function(processorData, i) {
                            var canvasWrapper = $('<div class="col-md-4"></div>');
                            var canvas = $('<canvas></canvas>');
                            canvasWrapper.append(canvas);
                            container.append(canvasWrapper);
                            var ctx = canvas[0].getContext('2d');
                            var value = Array.isArray(processorData) ? processorData[processorData.length - 1] : processorData;
                            new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: [new Date().toLocaleTimeString()],
                                    datasets: [{
                                        label: 'Processor ' + (i + 1) + ' Load',
                                        data: [value],
                                        borderColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
                                        fill: true,
                                    }]
                                },
                                options: {
                                    scales: {
                                        x: { type: 'category', beginAtZero: true },
                                        y: { beginAtZero: true }
                                    }
                                }
                            });
                        });
                    }
                    function generateKeyValuePair(data, title) {
                        var content = '';
                        content += `<h5>${title}</h5>`;
                        content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                        for (var key in data) {
                            content += `<dt class="col-sm-3"><span>${key}</span></dt>`;
                            content += `<dd class="col-sm-9">${data[key]}</dd>`;
                        }
                        content += '</dl>';
                        return content;
                    }
                    function generateKeyValuePairs(data, title) {
                        var content = '';
                        content += `<h5>${title}</h5>`;
                        content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                        for (var key in data) {
                            content += `<dt class="col-sm-3">${key}</dt>`;
                            content += `<dd class="col-sm-9">${data[key]}</dd>`;
                        }
                        content += '</dl>';
                        return content;
                    }
                    function generateUsbDevicesTable(devices) {
                        var content = `
                            <div class="json-data">
                                <table id="usbDevicesTable" class="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Vendor</th>
                                            <th>Vendor ID</th>
                                            <th>Product ID</th>
                                            <th>Serial Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                        `;

                        for (var i = 0; i < devices.length; i++) {
                            var device = devices[i];
                            content += `
                                <tr>
                                    <td>${device.name || 'N/A'}</td>
                                    <td>${device.vendor || 'N/A'}</td>
                                    <td>${device.vendorId || 'N/A'}</td>
                                    <td>${device.productId || 'N/A'}</td>
                                    <td>${device.serialNumber || 'N/A'}</td>
                                </tr>
                            `;
                        }

                        content += `
                                    </tbody>
                                </table>
                            </div>
                        `;

                        return content;
                    }
                    function generateGPUContent(gpus) {
                        var content = '<div class="json-data">';
                        // content += '<h5>GPU</h5>';

                        for (var i = 0; i < gpus.length; i++) {
                            var gpu = gpus[i];
                            content += '<div class="gpu-section">';
                            content += generateKeyValuePair(gpu, 'GPU');
                            content += '</div>';
                        }

                        content += '</div>';
                        return content;
                    }
                    function generateDisplayContent(data) {
                        var content = '<div class="json-data">';
                        content += '<h5>Displays</h5>';

                        if (data.jsonData) {
                            var displays = JSON.parse(data.jsonData);

                            for (var i = 0; i < displays.length; i++) {
                                var display = displays[i];
                                content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                                content += '<dt class="col-sm-3"><span>Display Name</span></dt>';
                                content += '<dd class="col-sm-9">' + display.displayName + '</dd>';
                                content += '<dt class="col-sm-3">Display Description</dt>';
                                content += '<dd class="col-sm-9">' + display.displayDesc + '</dd>';
                                content += '</dl>';
                            }
                        } else {
                            content += '<p>No display information available.</p>';
                        }

                        content += '</div>';
                        return content;
                    }
                    function generateBatteryContent(data) {
                        var batteryData = JSON.parse(data.jsonData);
                        var content = '<div class="json-data">';
                        // content += '<h5>BATTERY</h5>';
                        content += generateKeyValuePair(batteryData[0], 'BATTERY');
                        content += '</div>';
                        return content;
                    }
                    function generateSystemCpuLoadTicksContent(data) {
                        var systemCpuLoadTicks = JSON.parse(data.jsonData);
                        var content = '<div class="json-data">';
                        content += '<h5>System CPU Load Ticks</h5>';
                        content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';

                        var metricsLabels = ['User', 'Nice', 'System', 'Idle', 'I/O Wait', 'IRQ', 'Soft IRQ', 'Steal'];

                        for (var i = 0; i < metricsLabels.length; i++) {
                            content += '<dt class="col-sm-3"><span>' + metricsLabels[i] + '</span></dt>';
                            content += '<dd class="col-sm-9">' + systemCpuLoadTicks[i] + '</dd>';
                        }

                        content += '</dl>';
                        content += '</div>';
                        return content;
                    }
                    function computeBytesToGB(bytes) {
                        return (bytes / (1024 * 1024 * 1024)).toFixed(2);
                    }
                    function bytesToMB(bytes) {
                        return (bytes / 1048576).toFixed(2); // 1 megabyte = 1,048,576 bytes
                    }
                    function computeBytesToGBRoundoff(bytes) {
                        return Math.round(bytes / (1024 * 1024 * 1024));
                    }
                    function formatDate(date) {
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        return date.toLocaleDateString(undefined, options);
                    }
                    function renderMemory(jsonData) {
                        var memory = parseDetailJson(jsonData);
                        if (!memory || memory.total == null || memory.available == null) {
                            showSectionError('.divLoadingMemory', 'Memory information is unavailable.');
                            return;
                        }
                        var chartContainer = $('#chartContainer');
                        chartContainer.css({ width: '100%', height: '' });
                        var canvas = document.getElementById('memoryChart');
                        if (!canvas) {
                            showSectionError('.divLoadingMemory', 'Memory information is unavailable.');
                            return;
                        }
                        var totalMemory = memory.total;
                        var availableMemory = memory.available;
                        var memoryInUse = totalMemory - availableMemory;
                        var ctx = canvas.getContext('2d');
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: [new Date().toLocaleTimeString()],
                                datasets: [{
                                    label: 'Used Memory',
                                    data: [computeBytesToGB(memoryInUse)],
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: '#FF6384',
                                    borderWidth: 1,
                                    fill: true
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: computeBytesToGBRoundoff(totalMemory),
                                        ticks: {
                                            callback: function (value) {
                                                return value + ' GB';
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        var content = '<br><h3>Memory Information</h3><br>';
                        content += '<p>Total Memory: ' + computeBytesToGBRoundoff(totalMemory) + ' GB</p>';
                        content += '<p>Memory in Use: ' + computeBytesToGB(memoryInUse) + ' GB</p>';
                        content += '<p>Available Memory: ' + computeBytesToGB(availableMemory) + ' GB</p><br>';
                        $('.mem_info').html(content);
                        $('.divLoadingMemory').hide();
                    }
                    function renderNetworking(details) {
                        details.forEach(function(data) {
                            if (data.type === "NETWORK") {
                                var content = '<div class="json-data">';
                                content += '<h5>Network</h5>';
                                var networkInfo = parseDetailJson(data.jsonData);
                                if (networkInfo && networkInfo.length) {
                                    for (var n = 0; n < networkInfo.length; n++) {
                                        var network = networkInfo[n];
                                        content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                                        content += '<dt class="col-sm-3"><span>Name</span></dt>';
                                        content += '<dd class="col-sm-9">' + (network.name || 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">Display Name</dt>';
                                        content += '<dd class="col-sm-9">' + (network.displayName || 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">Index</dt>';
                                        content += '<dd class="col-sm-9">' + (network.index != null ? network.index : 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">MTU</dt>';
                                        content += '<dd class="col-sm-9">' + (network.mtu != null ? network.mtu : 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">IPv4 Address</dt>';
                                        content += '<dd class="col-sm-9">' + ((network.ipv4addr && network.ipv4addr[0]) || 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">IPv6 Address</dt>';
                                        content += '<dd class="col-sm-9">' + ((network.ipv6addr && network.ipv6addr[0]) || 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">MAC Address</dt>';
                                        content += '<dd class="col-sm-9">' + (network.macaddr || 'N/A') + '</dd>';
                                        content += '<dt class="col-sm-3">Operational Status</dt>';
                                        content += '<dd class="col-sm-9">' + (network.ifOperStatus || 'N/A') + '</dd>';
                                        content += '</dl>';
                                    }
                                } else {
                                    content += '<p>No network information available.</p>';
                                }
                                content += '</div>';
                                $('#networkContainer').html(content);
                            } else if (data.type === "PUBLIC_IP") {
                                var publicIp = parseDetailJson(data.jsonData);
                                if (!publicIp) {
                                    $('#publicContainer').html('<p>Public IP information is unavailable.</p>');
                                    return;
                                }
                                var publicContent = '<div class="json-data">';
                                publicContent += generateKeyValuePair(publicIp, 'PUBLIC IP');
                                publicContent += '</div>';
                                $('#publicContainer').html(publicContent);
                            }
                        });
                    }
                    for (var i = 0; i < responseArray.length; i++) {
                        var data = responseArray[i];
                        // console.log(data.type)
                        if (data.type === "SystemCpuLoadTicks" || data.type === "ProcessorCpuLoadTicks" || data.type === "PUBLIC_IP" || data.type === "NETWORK") {
                            continue;
                        }
                        // Create tab element
                        var tabElement = '<li class="nav-item">';
                        tabElement += '<a class="nav-link" id="tab-' + data.type + '-tab" data-toggle="tab" href="#' + data.type + '" role="tab" aria-controls="' + data.type + '" aria-selected="false">' + (data.type === "CS" ? "Motherboard + Firmware" : data.type) + '</a>';
                        tabElement += '</li>';

                        // Append tab element to the tab list
                        $('#myTabs').append(tabElement);

                        // Generate tab content and append to the tab content section
                        var tabContent = generateTabContent(data);
                        $('#myTabsContent').append(tabContent);
                    }
                           
                    $('#myTabs a:first').tab('show');
                    var memoryDetail = detailByType('MEMORY');
                    if (memoryDetail) {
                        renderMemory(memoryDetail.jsonData);
                    }
                    var storageDetail = detailByType('STORAGE');
                    if (storageDetail) {
                        renderStorage(storageDetail.jsonData);
                    }
                    renderNetworking(responseArray);
                })
        })
    }
    __table();

    var softwareLoaded = false;
    $('#software-tab').on('shown.bs.tab', function() {
        if (softwareLoaded) {
            return;
        }
        softwareLoaded = true;
        loadRunningApps();
        loadServices();
    });

    function loadRunningApps() {
            __executeExternalGet('/rmm-server/device/process/list').done(function(result) {
                if (result.status != "ERROR") {
                    var content = `
                        <div class="json-data">
                            <table id="servicesTable" class="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                    `;
                    result.response.forEach(function(data) {
                        content += `
                            <tr>
                                <td>${data.name || 'N/A'}</td>
                                <td>${data.status === true ? 'Installed' : 'N/A'}</td>
                            </tr>
                        `;
                    });
                    content += `
                                </tbody>
                            </table>
                        </div>
                    `;

                    // Populate the content inside the placeholder
                    $('#runningAppsContainer').html(content);
                } else {
                    console.log("failed fetching Cluster Name");
                }
            }).fail(function() {
                console.log("Error occurred while fetching data.");
            });
    }
    function loadServices() {
        __executeExternalGet('/rmm-server/device/service/list').done(function(result) {
            if (result.status != "ERROR") {
                var content = `
                    <div class="json-data">
                        <table id="servicesTable" class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Process ID</th>
                                    <th>State</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                result.response.forEach(function(data) {
                    content += `
                        <tr>
                            <td>${data.name || 'N/A'}</td>
                            <td>${data.processId || 'N/A'}</td>
                            <td>${data.state || 'N/A'}</td>
                            <td>${data.status === true ? 'Installed' : 'N/A'}</td>
                        </tr>
                    `;
                });
                content += `
                            </tbody>
                        </table>
                    </div>
                `;

                // Populate the content inside the placeholder
                $('#servicesContainer').html(content);
            } else {
                console.log("Failed fetching service details.");
            }
        }).fail(function() {
            console.log("Error occurred while fetching service data.");
        });
    }

}

var cluster_move_device = function(){
    var devicesString = localStorage.getItem('devices');

    if (devicesString) {
        var devices = JSON.parse(devicesString);
        console.log(devices);
        
        var devNameElement = $(".devName");
        
        devNameElement.empty();
        var devID = []
        devices.forEach(function(device, index) {
            devNameElement.append(device.name);
            
            if (index < devices.length - 1) {
                devNameElement.append(', ');
            }

            devID.push(device.id);
        });

        var __cluster = function(){
            $('.cluster_move').empty();

            $('.cluster_move').append("<option selected disabled> - - Select Cluster Name - - </option>");
            __executeExternalGet('/rmm-server/cluster/list').done(function (result) {
                // console.log(result)
                if (result.status != "ERROR") {
                    result.response.forEach(function(data){
                        $('.cluster_move').append(
                            "<option value="+data.id+">"+data.name+"</option>");
                    });
                } else {
                    console.log("failed fetching Cluster Name");
                }
            })
        }
        __cluster();
        $(".btn_confirm_update").unbind("click").on("click", function(){
            $(this).prop('disabled', true);
            var payload = devID
            console.log(payload);
            __executeExternalPost('/rmm-server/device/moveCluster/'+$('.cluster_move').val(),JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.status === "SUCCESS") {
                        $('#success').show();
                        $('#failed').hide();
                        setTimeout(function () {
                            $(".btn_confirm_update").prop('disabled', false);
                            $('#success').hide();
                            $(".form-control").val('');
                                setTimeout(function() {
                                    // Replace 'newLocationURL' with the URL you want to navigate to
                                    window.location.href = 'cluster';
                                }, 500); // 5000 milliseconds (5 seconds) delay
                        }, 2500);
                    }else{
                        $('#success').hide();
                        $('#failed').show();
                        $(".btn_confirm_update").prop('disabled', false);
                    }
                }else{
                    console.log(result.status);
                    // alert(result.message)
                }
            })
        })

    } else {

    }
}

var cluster_devices_update = function(){
    var device = getUrlParameter('device');

    __executeExternalGet('/rmm-server/device/'+device).done(function (result) {
        console.log(result)
        if (result.status != "ERROR") {
            $(".devName").html(result.response.deviceName)
            $(".manufacturer").html(result.response.manufacturer)
            $(".serialNumber").html(result.response.serialNumber)
            $(".desc").html(result.response.description)
            $(".desc_update").val(result.response.description)

            $(".btn_confirm_update").unbind("click").on("click", function(){
                $(this).prop('disabled', true);
                var payload = {
                    clusterId   : result.response.clusterId,
                    // deviceName  : result.response.deviceName,
                    // hardwareUuid: result.response.hardwareUuid,
                    // manufacturer: result.response.manufacturer,
                    // serialNumber: result.response.serialNumber,
                    description : $(".desc_update").val(),
                    status      : true,
                    updatedBy   : "1",
                }
                console.log(payload);
                __executeExternalPost('/rmm-server/device/edit/'+device,JSON.stringify(payload)).done(function (result) {
                    console.log(result);
                    if (result.status != "ERROR") {
                        if (result.status === "SUCCESS") {
                            $(".desc").html($(".desc_update").val())
                            $('#success').show();
                            $('#failed').hide();
                            setTimeout(function () {
                                $(".btn_confirm_update").prop('disabled', false);
                                $('#success').hide();
                                $(".form-control").val('');
                                    // setTimeout(function() {
                                    //     cluster_devices_update();
                                    // }, 500);
                            }, 2500);
                        }else{
                            $('#success').hide();
                            $('#failed').show();
                            $(".btn_confirm_update").prop('disabled', false);
                        }
                    }else{
                        console.log(result.status);
                        // alert(result.message)
                    }
                })
            })

        }
    })
}