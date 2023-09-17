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
            __executeExternalPost('8090/cluster/new',JSON.stringify(payload)).done(function (result) {
                console.log(result);
                if (result.status != "ERROR") {
                    if (result.status === "SUCCESS") {
                        $('#success').show();
                        $('#failed').hide();
                        setTimeout(function () {
                            $(".btn_confirm").prop('disabled', false);
                            $('#success').hide();
                            $(".form-control").val('');
                                // setTimeout(function () {
                                //     window.location.reload(true);
                                // }, 500);
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
        }
    })
}

var update = function(){
    console.log("attached events")

    var clusterID = getUrlParameter('clusterID');
    __executeExternalGet('8090/cluster/'+clusterID).done(function (result) {
        console.log(result)
        if (result.status != "ERROR") {
            $(".name").html(result.response.name)
            $(".description").html(result.response.description)
            
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
                    __executeExternalPost('8090/cluster/edit/'+clusterID,JSON.stringify(payload)).done(function (result) {
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

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();
        __executeExternalGet('8090/device/list/'+clusterID).done(function (result) {
            // console.log(result)

            if (result.status != "ERROR") {

                result.response.forEach(function(data){
                    console.log(data)
                    $('.table_body').append("<tr>"+
                        "<td style='text-align: center;'><label class='custom-control custom-checkbox m-0'><input type='checkbox' class='custom-control-input' data-id='"+data.id+"' data-name='"+data.deviceName+"'><span class='custom-control-label'></span> <i class='fas fa-desktop' style='font-size: 26px;'></i></label></td>"+
                        "<td>"+data.deviceName+"</td>"+
                        "<td>"+data.manufacturer+"</td>"+
                        "<td>"+data.description+"</td>"+
                        "<td>"+data.serialNumber+"</td>"+
                        "<td>"+data.status+"</td>"+
                        "<td class='actions'> <a href='cluster_device_details?deviceId="+data.id+"&deviceName="+data.manufacturer+"'><button class='btn btn-sm btn-info btn_view' type='submit'><i class='feather icon-eye'></i> View details</button></a> <button class='btn btn-sm btn-info update_device' type='submit' data-id='"+data.id+"' style=''> Update Device </button></td>")
                });

                $('#select-all').on('change', function () {
                    var isChecked = $(this).prop('checked');
                    $('.table_body .custom-control-input').prop('checked', isChecked);
                });
                // Handle individual checkbox change event
                $('.table_body').on('change', '.custom-control-input', function () {
                    var allChecked = $('.table_body .custom-control-input:checked').length === $('.table_body .custom-control-input').length;
                    $('#select-all').prop('checked', allChecked);
                });
                var table = $('.table_head').DataTable({
                    scrollX: true,
                    responsive: true, // Enable responsive design if needed
                    paging: true,
                });

                $('.table_head').on('click', '.btn_update', function() {
                    var id = $(this).data('id');
                    window.location.href = '/ams/asset_view_details?device=' + id;
                });

                $('.table_head').on('click', '.update_device', function() {
                    var id = $(this).data("id");
                    // console.log(data_id)
                    window.location.href = '/rmm/cluster_device_update?device='+id;
                });
                $('.moveCluster').prop('disabled', true); // Disable the button initially

                $('.custom-control-input').on('change', function() {
                    var isChecked = $('.table_body .custom-control-input:checked').length > 0;
                    $('.moveCluster').prop('disabled', !isChecked);
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
                    var url = '/rmm/cluster_move_device?';
                    window.location.href = url;
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
            // console.log(result)

            if (result.status != "ERROR") {
                $(document).ready(function() {

                    var responseArray = result.response;
                    // Create a function to generate tab content
                    function generateTabContent(data) {
                        var content = `<div class="tab-pane fade" id="${data.type}" role="tabpanel">`;

                        if (data.type === "CS") {
                            var beautifiedData = JSON.parse(data.jsonData);

                            content += '<div class="json-data">';
                            content += generateKeyValuePairs(beautifiedData.firmware, 'FIRMWARE');
                            content += generateKeyValuePairs(beautifiedData.baseboard, 'BASEBOARD');
                            content += '</div>';
                        } else if (data.type === "PUBLIC_IP") {
                            var beautifiedDataPublicIp = JSON.parse(data.jsonData);
                            content += '<div class="json-data">';
                            content += generateKeyValuePair(beautifiedDataPublicIp, 'PUBLIC IP');
                            content += '</div>';
                        } else if (data.type === "USB_DEVICES") {
                            var beautifiedDataUSB = JSON.parse(data.jsonData);
                            content += generateUsbDevicesTable(beautifiedDataUSB);
                        } else if (data.type === "GPU") {
                            var gpuData = JSON.parse(data.jsonData);
                            content += generateGPUContent(gpuData);
                        } else if (data.type === "DISPLAYS") {
                            content += generateDisplayContent(data);
                        } else if (data.type === "NETWORK") {
                            content += generateNetworkContent(data);
                        } else if (data.type === "BATTERY") {
                            content += generateBatteryContent(data);
                        } else if (data.type === "CPU") {
                            content += generateCPUContent(data);
                        } else if (data.type === "ProcessorCpuLoadTicks") {
                            content += generateCPULoadTicksContent(data);
                        } else if (data.type === "SystemCpuLoadTicks") {
                            content += generateSystemCpuLoadTicksContent(data);
                        } else if (data.type === "STORAGE") {
                            var storageArray = JSON.parse(data.jsonData);
                            content += '<div class="json-data">';
                            storageArray.forEach(storage => {
                                content += generateStorageProgressBar(storage);
                            });
                            content += '</div>';
                        } else if (data.type === "MEMORY") {
                            content += '<div class="json-data">';
                            content += '<div id="chartContainer">';
                            content += '<canvas id="memoryChart"></canvas>';
                            content += generateMemoryContent(JSON.parse(data.jsonData));
                            content += '</div>';
                            content += '</div>';
                        } else {
                            content += `<pre class="json-data">${JSON.stringify(data, null, 2)}</pre>`;
                            console.log('false');
                        }

                        content += '</div>';
                        return content;
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
                    function generateNetworkContent(data) {
                        var content = '<div class="json-data">';
                        content += '<h5>Network</h5>';

                        if (data.jsonData) {
                            var networkInfo = JSON.parse(data.jsonData);

                            for (var i = 0; i < networkInfo.length; i++) {
                                var network = networkInfo[i];
                                content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                                content += '<dt class="col-sm-3"><span>Name</span></dt>';
                                content += '<dd class="col-sm-9">' + network.name + '</dd>';
                                content += '<dt class="col-sm-3">Display Name</dt>';
                                content += '<dd class="col-sm-9">' + network.displayName + '</dd>';
                                content += '<dt class="col-sm-3">Index</dt>';
                                content += '<dd class="col-sm-9">' + network.index + '</dd>';
                                content += '<dt class="col-sm-3">MTU</dt>';
                                content += '<dd class="col-sm-9">' + network.mtu + '</dd>';
                                content += '<dt class="col-sm-3">IPv4 Address</dt>';
                                content += '<dd class="col-sm-9">' + (network.ipv4addr[0] || 'N/A') + '</dd>';
                                content += '<dt class="col-sm-3">IPv6 Address</dt>';
                                content += '<dd class="col-sm-9">' + (network.ipv6addr[0] || 'N/A') + '</dd>';
                                content += '<dt class="col-sm-3">MAC Address</dt>';
                                content += '<dd class="col-sm-9">' + network.macaddr + '</dd>';
                                content += '<dt class="col-sm-3">Operational Status</dt>';
                                content += '<dd class="col-sm-9">' + network.ifOperStatus + '</dd>';
                                content += '</dl>';
                            }
                        } else {
                            content += '<p>No network information available.</p>';
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
                    function generateCPUContent(cpu) {
                        var cpu = JSON.parse(data.jsonData);
                        var content = '<div class="json-data">';
                        content += '<h5>CPU</h5>';
                        content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                        content += '<dt class="col-sm-3"><span>Model</span></dt>';
                        content += '<dd class="col-sm-9">' + (cpu.processorIdentifier.name || 'N/A') + '</dd>';
                        content += '<dt class="col-sm-3">Vendor</dt>';
                        content += '<dd class="col-sm-9">' + (cpu.processorIdentifier.vendor || 'N/A') + '</dd>';
                        content += '<dt class="col-sm-3">Architecture</dt>';
                        content += '<dd class="col-sm-9">' + (cpu.processorIdentifier.cpu64bit ? '64-bit' : '32-bit') + '</dd>';
                        content += '<dt class="col-sm-3">Cores</dt>';
                        content += '<dd class="col-sm-9">' + (cpu.logicalProcessorCount || 'N/A') + '</dd>';
                        content += '<dt class="col-sm-3">Threads</dt>';
                        content += '<dd class="col-sm-9">' + (cpu.logicalProcessorCount * 2 || 'N/A') + '</dd>';
                        content += '</dl>';
                        
                        // Display CPU Cache information
                        var caches = cpu.processorCaches || [];
                        for (var i = 0; i < caches.length; i++) {
                            content += '<div class="cache-section">';
                            content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';
                            
                            // Change "Level 3 Cache" to "L3 Cache"
                            var cacheLevelLabel = 'L' + caches[i].level + ' Cache';

                            content += '<dt class="col-sm-3"><span>' + cacheLevelLabel + '</span></dt>';
                            
                            // Convert cache size to MB and KB
                            var cacheSizeMB = (caches[i].cacheSize / 1024).toFixed(2); // Convert to MB
                            var cacheSizeKB = caches[i].cacheSize; // Cache size in KB

                            content += '<dd class="col-sm-9">Size: ' + cacheSizeMB + ' MB (' + cacheSizeKB + ' KB)</dd>';
                            content += '<dd class="col-sm-9">Type: ' + caches[i].type + '</dd>';
                            content += '</dl>';
                            content += '</div>';
                        }


                        content += '</div>';
                        return content;
                    }
                    function generateCPULoadTicksContent(data) {
                        var cpuLoadTicks = JSON.parse(data.jsonData);
                        var content = '<div class="json-data">';
                        content += '<h5>CPU Load Ticks</h5>';

                        for (var i = 0; i < cpuLoadTicks.length; i++) {
                            var coreLoad = cpuLoadTicks[i];
                            content += '<div class="core-load">';
                            content += '<h6>Core ' + i + '</h6>';
                            content += '<dl class="row" style="margin-left:60px; margin-top: 10px; font-size:13px">';

                            var metricsLabels = ['User', 'Nice', 'System', 'Idle', 'I/O Wait', 'IRQ', 'Soft IRQ', 'Steal'];

                            for (var j = 0; j < metricsLabels.length; j++) {
                                content += '<dt class="col-sm-3"><span>' + metricsLabels[j] + '</span></dt>';
                                content += '<dd class="col-sm-9">' + coreLoad[j] + '</dd>';
                            }

                            content += '</dl>';
                            content += '</div>';
                        }

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
                    function formatDate(date) {
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        return date.toLocaleDateString(undefined, options);
                    }
                    function generateMemoryContent(memoryData) {
                        var totalMemory = memoryData.total;
                        var memoryInUse = totalMemory - memoryData.available;
                        var content = '<div class="mem_info">';
                        
                        content += '<br><h5>Memory Information</h5><br>';
                        content += '<p>Total Memory: ' + computeBytesToGB(totalMemory) + ' GB</p>';
                        content += '<p>Memory in Use: ' + computeBytesToGB(memoryInUse) + ' GB</p>';
                        content += '<p>Available Memory: ' + computeBytesToGB(memoryData.available) + ' GB</p><br>';
                        content += '</div>';
                        $(document).ready(function() {
                            generateMemoryChart(memoryData);
                        });
                        
                        return content;
                    }
                    function generateMemoryChart(memoryData) {
                        // Set the desired width and height for the chart container
                        var chartContainer = $("#chartContainer");
                        chartContainer.css({ width: '1000px', height: '300px' });

                        // Get the canvas element
                        var canvas = $("#memoryChart")[0];

                        var totalMemory = memoryData.total; // Total memory in bytes
                        var availableMemory = memoryData.available; // Available memory in bytes
                        var memoryInUse = totalMemory - availableMemory;
                        var memoryInUseGB = computeBytesToGB(memoryInUse);

                        // Initialize arrays to store data
                        var labels = ["Initial Label"]; // You can set this to a more appropriate initial label
                        var dataPoints = [memoryInUseGB];

                        // Create a Chart.js chart
                        var ctx = canvas.getContext("2d");
                        var memoryChart = new Chart(ctx, {
                            type: "line",
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: "Memory Usage (GB)",
                                        data: dataPoints,
                                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                                        borderColor: "rgba(0, 123, 255, 1)",
                                        borderWidth: 2,
                                        fill: true,
                                        stepped: 'before',
                                    },
                                ],
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            callback: function (value) {
                                                return value + ' GB';
                                            },
                                        },
                                    },
                                    x: {
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Time',
                                        },
                                    },
                                },
                            },
                        });

                        var elapsedTime = 0; // Variable to keep track of how long the chart has been running in seconds
                        var maxDuration = 3600; // 1 hour in seconds

                        // Let's use an IIFE (Immediately Invoked Function Expression) to encapsulate our logic
                        (function addDataPoint() {
                            if (elapsedTime >= maxDuration) {
                                return; // Stop the function if 1 hour has passed
                            }

                            var currentDate = new Date();
                            var currentTime = formatDate(currentDate);

                            labels.push(currentTime);
                            dataPoints.push(computeBytesToGB(memoryInUse));

                            var maxDataPoints = 10;
                            if (labels.length > maxDataPoints) {
                                labels.shift();
                                dataPoints.shift();
                            }

                            memoryChart.update();

                            elapsedTime += 1; // Increase the elapsed time by 1 second

                            // Recursive setTimeout is generally safer than setInterval
                            setTimeout(addDataPoint, 1000);
                        })();
                    }

                    function generateStorageProgressBar(storage) {
                        var totalSizeGB = (storage.size / (1024 * 1024 * 1024)).toFixed(2);
                        var usedSizeGB = totalSizeGB - (storage.partitions.reduce((acc, partition) => acc + partition.size, 0) / (1024 * 1024 * 1024)).toFixed(2);
                        var availableSizeGB = (totalSizeGB - usedSizeGB).toFixed(2);
                        var usedPercentage = ((usedSizeGB / totalSizeGB) * 100).toFixed(2);

                        return `
                            <h5>Model - ${storage.model}</h5>
                            <div class="progress" style="height: 30px;">
                                <div class="progress-bar progress-bar-striped bg-info" style="width: ${usedPercentage}%" aria-valuenow="${usedPercentage}" aria-valuemin="0" aria-valuemax="100">${usedPercentage}% Used</div>
                            </div>
                            <p>${availableSizeGB} GB FREE of ${totalSizeGB} GB</p>
                        `;
                    }
                    // Create tabs for each response data type
                    for (var i = 0; i < responseArray.length; i++) {
                        var data = responseArray[i];

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

                    // Activate the first tab by default
                    $('.nav-tabs a:first').tab('show');

                })
            }
        })
    }
    __table();
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
            __executeExternalGet('8090/cluster/list').done(function (result) {
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
            __executeExternalPost('8090/device/moveCluster/'+$('.cluster_move').val(),JSON.stringify(payload)).done(function (result) {
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

    __executeExternalGet('8090/device/'+device).done(function (result) {
        console.log(result)
        if (result.status != "ERROR") {
            $(".devName").html(result.response.deviceName)
            $(".manufacturer").html(result.response.manufacturer)
            $(".serialNumber").html(result.response.serialNumber)
            $(".desc").html(result.response.description)

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
                __executeExternalPost('8090/device/edit/'+device,JSON.stringify(payload)).done(function (result) {
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