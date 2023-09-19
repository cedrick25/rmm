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

        __executeExternalGet('8090/deviceDetail/'+deviceId).done(function (result) {
            // console.log(result)

            if (result.status != "ERROR") {
                $(document).ready(function() {

                    var responseArray = result.response;
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
                            content += '<div class="json-data">';
                            content += '<div id="cpuChartContainer" class="row"></div>';
                            content += '<div class="cpu_info"></div>';
                            content += '</div>';

                            try {
                                $(document).ready(function() {
                                    // Parsing the jsonData from the provided data
                                    var cpuDetails = JSON.parse(data.jsonData);
                                    // console.log("Parsed CPU Details:", cpuDetails);  // Log parsed data to console

                                    // Extracting basic CPU information
                                    var infoContent = '';
                                    infoContent += '<br><h5>CPU Information</h5><br>';
                                    infoContent += '<p><strong>CPU Name:</strong> ' + cpuDetails.processorIdentifier.name.trim() + '</p>';
                                    infoContent += '<p><strong>CPU Model:</strong> ' + cpuDetails.processorIdentifier.model + '</p>';
                                    infoContent += '<p><strong>Physical Processors:</strong> ' + cpuDetails.physicalProcessorCount + '</p>';
                                    infoContent += '<p><strong>Logical Processors:</strong> ' + cpuDetails.logicalProcessorCount + '</p>';

                                    $('.cpu_info').html(infoContent);
                                    // console.log("Info Content:", infoContent);  // Log the constructed info content to console
                                })
                            } catch (error) {
                                console.error("Error processing CPU data:", error);
                            }

                            historicalData(data.deviceId);
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
                            content += '</div>';
                            content += '<div class="mem_info"></div>';
                            content += '</div>';
                            generateMemoryChart(JSON.parse(data.jsonData));
                        } else {
                            content += `<pre class="json-data">${JSON.stringify(data, null, 2)}</pre>`;
                            console.log('false');
                        }

                        content += '</div>';
                        return content;
                    }
                    function historicalData(deviceId){
                        __executeExternalGet('8090/deviceDetail/'+deviceId).done(function (result) {
                            if (result.status != "ERROR") {
                                // var responseArray = result.response;
                                
                                // var processorDataPoints = [];
                                // var systemDataPoints = [];
                                
                                // responseArray.forEach(data => {
                                //     if (data.type === "ProcessorCpuLoadTicks") {
                                //         // Assuming data.jsonData is an array of numbers; adapt as needed
                                //         processorDataPoints = JSON.parse(data.jsonData);
                                //     }
                                //     if (data.type === "SystemCpuLoadTicks") {
                                //         systemDataPoints = JSON.parse(data.jsonData);
                                //     }
                                // });
                                
                                //     generateCharts(processorDataPoints, systemDataPoints);
                                $(document).ready(function() {
                                const canvasId = `cpuChart${i}`;
                                let canvasWrapper = $('<div class="col-md-4"></div>');
                                let canvas = $(`<canvas id="${canvasId}"></canvas>`);

                                canvasWrapper.append(canvas);
                                    let cpuCharts = [];

                                    function generateCharts(cpuDetails) {
                                        const numProcessors = cpuDetails.logicalProcessorCount;

                                        // Clear any existing charts and canvases
                                        $('#cpuChartContainer').empty();

                                        if (cpuCharts.length > 0) {
                                            cpuCharts.forEach(chart => chart.destroy());
                                            cpuCharts = [];
                                        }

                                        for (let i = 0; i < numProcessors; i++) {
                                            const canvasId = `cpuChart${i}`;
                                            
                                            // Wrap the canvas inside a grid column
                                            let canvasWrapper = $('<div class="col-md-4"></div>');
                                            let canvas = $(`<canvas id="${canvasId}"></canvas>`);

                                            canvasWrapper.append(canvas);
                                            $('#cpuChartContainer').append(canvasWrapper);

                                            // Since canvas is already in DOM, we can access its context
                                            const ctx = canvas[0].getContext('2d');

                                            const chart = new Chart(ctx, {
                                                type: 'line',
                                                data: {
                                                    labels: [],
                                                    datasets: [{
                                                        label: `Processor ${i + 1} Load`,
                                                        data: [],
                                                        borderColor: getRandomColor(),
                                                        fill: true,
                                                    }]
                                                },
                                                options: {
                                                    scales: {
                                                        x: {
                                                            type: 'category',
                                                            beginAtZero: true
                                                        },
                                                        y: {
                                                            beginAtZero: true
                                                        }
                                                    }
                                                }
                                            });

                                            cpuCharts.push(chart);
                                            
                                            // Start the data update loop for this chart
                                            setInterval(() => addDataToChart(chart), 2000);
                                        }
                                    }

                                    function getRandomColor() {
                                        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                                    }

                                    function addDataToChart(chart) {
                                        const currentTime = new Date().toLocaleTimeString();

                                        chart.data.labels.push(currentTime);
                                        chart.data.datasets[0].data.push(Math.random() * 100);

                                        if (chart.data.labels.length > 20) {
                                            chart.data.labels.shift();
                                            chart.data.datasets[0].data.shift();
                                        }

                                        chart.update();
                                    }

                                    const sampleData = {
                                        logicalProcessorCount: 12,  // Just a sample value, replace with actual count
                                    };

                                    generateCharts(sampleData);
                                });

                            }
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
                    function computeBytesToGBRoundoff(bytes) {
                        return Math.round(bytes / (1024 * 1024 * 1024));
                    }
                    function formatDate(date) {
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        return date.toLocaleDateString(undefined, options);
                    }
                    function generateMemoryChart(memoryData) {
                        $(document).ready(() => {
                            var chartContainer = $("#chartContainer");
                            chartContainer.css({ width: '100%', height: '' });
                            const totalMemory = memoryData.total;
                            let availableMemory = memoryData.available;
                            let memoryInUse = totalMemory - availableMemory;

                            function updateMemoryInfo() {
                                var content = '<br><h5>Memory Information</h5><br>';
                                content += '<p>Total Memory: ' + computeBytesToGBRoundoff(totalMemory) + ' GB</p>';
                                content += '<p>Memory in Use: ' + computeBytesToGB(memoryInUse) + ' GB</p>';
                                content += '<p>Available Memory: ' + computeBytesToGB(availableMemory) + ' GB</p><br>';
                                $('.mem_info').html(content);
                            }

                            const ctx = document.getElementById('memoryChart').getContext('2d');
                            const memoryChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: [], // We'll dynamically populate this with timestamps
                                    datasets: [{
                                        // label: 'Available Memory',
                                        // data: [],  // We'll dynamically populate this as well
                                        // backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                        // borderColor: '#36A2EB',
                                        // borderWidth: 1,
                                        // fill: true
                                    // }, {
                                        label: 'Used Memory',
                                        data: [],  // We'll dynamically populate this as well
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
                                            max: computeBytesToGBRoundoff(totalMemory),  // Set the maximum value for Y-axis
                                            ticks: {
                                                // Callback to append "GB" to the label
                                                callback: function(value, index, values) {
                                                    return value + ' GB';
                                                }
                                            }
                                        }
                                    }
                                }
                            });

                            function addMemoryData() {
                                const currentTime = new Date().toLocaleTimeString(); // Get current time

                                memoryChart.data.labels.push(currentTime);
                                // memoryChart.data.datasets[0].data.push(computeBytesToGB(availableMemory));
                                memoryChart.data.datasets[0].data.push(computeBytesToGB(memoryInUse));

                                if (memoryChart.data.labels.length > 20) {
                                    memoryChart.data.labels.shift();
                                    // memoryChart.data.datasets[0].data.shift();
                                    memoryChart.data.datasets[0].data.shift();
                                }

                                memoryChart.update();
                            }

                            function simulateRealTimeDataFetch() {
                                const change = Math.floor(Math.random() * 500000000) * (Math.random() < 0.5 ? 1 : -1);
                                availableMemory += change;
                                memoryInUse = totalMemory - availableMemory;

                                addMemoryData();
                                updateMemoryInfo();
                            }

                            updateMemoryInfo();
                            setInterval(simulateRealTimeDataFetch, 2000);
                        });
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
                    for (var i = 0; i < responseArray.length; i++) {
                        var data = responseArray[i];
                        
                        // Skip SystemCpuLoadTicks and ProcessorCpuLoadTicks
                        if (data.type === "SystemCpuLoadTicks" || data.type === "ProcessorCpuLoadTicks") {
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
                })
            }
        })
    }
    __table();
    $(document).ready(function() {
        // Load running apps when the page is loaded
        loadRunningApps();

        // Function to load running apps
        function loadRunningApps() {
            __executeExternalGet('8090/device/process/list').done(function(result) {
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
                                <td>${data.status || 'N/A'}</td>
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
    });
    var __service = function() {
        __executeExternalGet('8090/device/service/list').done(function(result) {
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
                            <td>${data.status || 'N/A'}</td>
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

    $(document).ready(function() {
        __service();
    });

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