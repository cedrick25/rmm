var list = function(){

    var __table = function(){
        __executeExternalGet('/rmm-server/cluster/list').done(function (result) {
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
                    window.location.href = anyhost+'/rmm/user_account_update?userId='+userId;
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

    var __table = function(){
        $('.table_head').DataTable().destroy();
        $('.table_body').empty();
        __executeExternalGet('/rmm-server/device/list/'+clusterID).done(function (result) {
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
                    window.location.href = '/cluster_device_update?device='+id;
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

        __executeExternalGet('/rmm-server/deviceDetail/'+deviceId).done(function (result) {
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
                            console.log(data.type)
                            content += '<div class="json-data">';
                            content += '<form class="form-inline">';
                                content += '<label class="form-label mr-sm-2">Usage</label>';
                                content += '<select class="custom-select mr-sm-2 mb-2 mb-sm-0 col-md-3" id="CPUusageSelect">';
                                    content += '<option value="realtime" selected>Get Realtime</option>';
                                    content += '<option value="weekly">Get Weekly</option>';
                                    content += '<option value="monthly">Get Monthly</option>';
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
                            content += '</div>';
                            content += '<br><br><div id="cpuChartContainer" class="row"></div>';
                            content += '<div class="cpu_info"></div>';
                            content += '</div>';

                            $(document).ready(function() {
                                var cpuDetails = JSON.parse(data.jsonData);
                                displayCPUInfo();
                                // Function to display CPU information and caches
                                function displayCPUInfo() {
                                    var infoContent = '<br><br><br><h5>CPU Information</h5><br>';
                                    infoContent += '<p><strong>CPU Name:</strong> ' + cpuDetails.processorIdentifier.name.trim() + '</p>';
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

                                // Function to fetch and display data
                                function fetchDataAndDisplayData(selectedDataType) {
                                    // console.log(selectedDataType); // Logging data id
                                    __executeExternalGet('/rmm-server/deviceDetail/' + deviceId).done(function(resultCPU) {
                                        console.log(resultCPU)
                                        var responseArrayCPU = resultCPU.response;
                                        for (var i = 0; i < responseArrayCPU.length; i++) {
                                            var dataCPU = responseArrayCPU[i];
                                            // console.log(data.type); // Logging data id
                                            if (dataCPU.type === selectedDataType) {

                                                if (selectedDataType === "SystemCpuLoadTicks") {
                                                    SystemCpuLoadTicks(dataCPU.id, 'realtime');
                                                    console.log(dataCPU.id); // Logging data id
                                                    console.log(selectedDataType); // Logging selected data type
                                                }
                                                if (selectedDataType === "ProcessorCpuLoadTicks") {
                                                    ProcessorCpuLoadTicks(dataCPU.id, 'realtime');
                                                    console.log(dataCPU.id); // Logging data id
                                                    console.log(selectedDataType); // Logging selected data type
                                                }
                                            }
                                        }
                                    });
                                }
                                $(document).ready(function() {
                                    // Get the initial value of the selected radio button
                                    var selectedDataType = $('input[name="custom-radio-3"]:checked').val();
                                    console.log(selectedDataType);
                                    fetchDataAndDisplayData(selectedDataType);
                                });
                                // Event listener for the radio buttons
                                $('input[name="custom-radio-3"]').on('change', function() {
                                    // Get the value of the selected radio button
                                    var selectedDataType = $('input[name="custom-radio-3"]:checked').val();
                                    console.log(selectedDataType);
                                    fetchDataAndDisplayData(selectedDataType);
                                });
                            });
                        } else if (data.type === "STORAGE") {
                            content += '<div class="json-data">';
                            content += '<form class="form-inline">';
                            content += '<label class="form-label mr-sm-2">Usage</label>';
                            content += '<select class="custom-select mr-sm-2 mb-2 mb-sm-0 col-md-3" id="StorageUsageSelect">';
                            content += '<option value="realtime" selected>Get Realtime</option>';
                            content += '<option value="weekly">Get Weekly</option>';
                            content += '<option value="monthly">Get Monthly</option>';
                            content += '</select>';
                            content += '</form>';
                            content += '<div id="storageBarsContainer"></div>';
                            content += '</div>';

                            // Assuming you have an element with the ID `contentContainer` where you want to add the content.
                            $('#contentContainer').html(content);
                            setTimeout(function() {
                                $('#StorageUsageSelect').change();
                            }, 100);
                            // Now that the content has been added to the DOM, you can call the storageDataHandler.
                            storageDataHandler(data.id, 'realtime');
                        } else if (data.type === "MEMORY") {
                            content += '<div class="json-data">';
                            content += '<form class="form-inline">';
                            content += '<label class="form-label mr-sm-2">Usage</label>';
                            content += '<select class="custom-select mr-sm-2 mb-2 mb-sm-0 col-md-3" id="usageSelect">';
                            content += '<option value="realtime" selected>Get Realtime</option>';
                            content += '<option value="weekly">Get Weekly</option>';
                            content += '<option value="monthly">Get Monthly</option>';
                            content += '</select>';
                            content += '</form>';
                            content += '<div id="chartContainer">';
                            content += '<canvas id="memoryChart"></canvas>';
                            content += '</div>';
                            content += '<div class="mem_info"></div>';
                            content += '</div>';
                            generateMemoryChart(data.id);
                        } else {
                            content += `<pre class="json-data">${JSON.stringify(data, null, 2)}</pre>`;
                            console.log('false');
                        }

                        content += '</div>';
                        return content;
                    }
                    function SystemCpuLoadTicks(deviceDetailId, period) {
                        const CPU_API_URL = '/rmm-server/deviceDetail/history/';
                        const interval = 2000; // Update interval in milliseconds
                        const CPU_payload = {
                            "startDate": getStartDate(period),
                            "endDate": getEndDate(period)
                        };

                        function fetchDataCPU(deviceDetailId, CPU_payload) {
                            __executeExternalPost(CPU_API_URL + deviceDetailId, JSON.stringify(CPU_payload))
                                .done(function (result) {
                                    if (result.status === "SUCCESS") {
                                        const SystemCpuLoadTicksDetails = result.response;
                                        generateCharts(SystemCpuLoadTicksDetails);
                                    } else if (result.status === "ERROR") {
                                        console.error('Error fetching CPU data:', result);
                                    }
                                })
                                .fail(function (jqXHR, textStatus) {
                                    console.error("API Request Failed:", textStatus, jqXHR.responseText);
                                });
                        }

                        function getStartDate(period) {
                            let currentDate = new Date();
                            if (period === 'weekly') {
                                return new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] + " 00:00:00";
                            } else if (period === 'monthly') {
                                return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0] + " 00:00:00";
                            } else { // realtime
                                return currentDate.toISOString().split('T')[0] + " 00:00:00";
                            }
                        }

                        function getEndDate(period) {
                            let currentDate = new Date();
                            return currentDate.toISOString().split('T')[0] + " 23:59:59";
                        }

                        function generateCharts(SystemCpuLoadTicksDetails) {
                            const jsonData = JSON.parse(SystemCpuLoadTicksDetails.jsonData);

                            // Create a single canvas element for the chart
                            const canvas = document.createElement('canvas');
                            const container = $('#cpuChartContainer');
                            container.empty().append(canvas);

                            const ctx = canvas.getContext('2d');

                            const chart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: [],
                                    datasets: [{
                                        label: 'System CPU Load Ticks',
                                        data: [],
                                        borderColor: 'rgb(75, 192, 192)',
                                        fill: false,
                                    }],
                                },
                                options: {
                                    scales: {
                                        x: {
                                            type: 'category',
                                            beginAtZero: true,
                                        },
                                        y: {
                                            beginAtZero: true,
                                        },
                                    }
                                }
                            });

                            // Start the data update loop for this chart
                            setInterval(() => addDataToChart(chart, jsonData), interval);
                        }

                        function addDataToChart(chart, jsonData) {
                            const currentTime = new Date().toLocaleTimeString();
                            chart.data.labels.push(currentTime);
                            chart.data.datasets[0].data.push(jsonData.shift());

                            if (chart.data.labels.length > 20) {
                                chart.data.labels.shift();
                                chart.data.datasets[0].data.shift();
                            }

                            chart.update();
                        }

                        // Initial data fetch
                        fetchDataCPU(deviceDetailId, CPU_payload);

                        // Optionally, you can set up an interval to periodically fetch data.
                        // setInterval(() => fetchDataCPU(deviceDetailId), interval);
                    }
                    function ProcessorCpuLoadTicks(deviceDetailId, period) {
                        const CPU_API_URL = '/rmm-server/deviceDetail/history/';
                        const interval = 2000; // Update interval in milliseconds

                        var CPU_payload = {
                            "startDate": getStartDate(period),
                            "endDate": getEndDate(period)
                        };
                        function fetchDataCPU(deviceDetailId, CPU_payload) {
                            __executeExternalPost(CPU_API_URL + deviceDetailId, JSON.stringify(CPU_payload))
                                .done(function (result) {
                                    console.log(result)
                                    if (result.status === "SUCCESS") {
                                        const processorCpuLoadTicksDetails = {
                                            "status": "SUCCESS",
                                            "message": null,
                                            "response": {
                                                "id": 4,
                                                "createdBy": "SYSTEM",
                                                "createdDate": "2023-09-19 02:17:42",
                                                "status": true,
                                                "deviceId": "1",
                                                "deviceName": null,
                                                "jsonData": "[[6130546,0,2168718,128204046,0,528015,623359,0],[1438156,0,1567687,134490484,0,39562,118562,0],[1403328,0,832062,135381203,0,13593,24250,0],[1602265,0,1149921,134818562,0,17125,66562,0],[3325562,0,2402500,131879953,0,40453,5984,0],[1730171,0,1674718,134223187,0,18468,7890,0],[3965281,0,4172531,129456578,0,53312,6734,0],[1750468,0,1711015,134174375,0,12828,5750,0],[2221656,0,1649812,133756312,0,16093,10562,0],[2356703,0,1091984,134184953,0,11421,9375,0],[2030062,0,808406,134788031,0,19718,8218,0],[905593,0,602468,136134671,0,6562,5140,0]]",
                                                "type": "ProcessorCpuLoadTicks",
                                                "historicalData": []
                                            }
                                        }
                                        // console.log(processorCpuLoadTicksDetails)
                                        generateCharts(processorCpuLoadTicksDetails);
                                    } else if (result.status === "ERROR") {
                                        console.error('Error fetching CPU data:', result);
                                    }
                                })
                                .fail(function (jqXHR, textStatus) {
                                    console.error("API Request Failed:", textStatus, jqXHR.responseText);
                                });
                        }

                        function getStartDate(period) {
                            let currentDate = new Date();
                            if (period === 'weekly') {
                                return new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] + " 00:00:00";
                            } else if (period === 'monthly') {
                                return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0] + " 00:00:00";
                            } else { // realtime
                                return currentDate.toISOString().split('T')[0] + " 00:00:00";
                            }
                        }

                        function getEndDate(period) {
                            let currentDate = new Date();
                            return currentDate.toISOString().split('T')[0] + " 23:59:59";
                        }
                        function generateCharts(processorCpuLoadTicksDetails) {
                            const jsonData = JSON.parse(processorCpuLoadTicksDetails.response.jsonData);
                            const numProcessors = jsonData.length;

                            const container = $('#cpuChartContainer');
                            container.empty();

                            const cpuCharts = [];

                            for (let i = 0; i < numProcessors; i++) {
                                const canvasId = `cpuChart${i}`;
                                const canvasWrapper = $('<div class="col-md-4"></div>');
                                const canvas = $(`<canvas id="${canvasId}"></canvas>`);

                                canvasWrapper.append(canvas);
                                container.append(canvasWrapper);

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
                                                beginAtZero: true,
                                            },
                                            y: {
                                                beginAtZero: true,
                                            }
                                        }
                                    }
                                });

                                cpuCharts.push(chart);

                                // Start the data update loop for this chart
                                setInterval(() => addDataToChart(chart, jsonData[i]), interval);
                            }
                        }

                        function addDataToChart(chart, processorData) {
                            const currentTime = new Date().toLocaleTimeString();
                            chart.data.labels.push(currentTime);
                            chart.data.datasets[0].data.push(processorData);
                            
                            if (chart.data.labels.length > 20) {
                                chart.data.labels.shift();
                                chart.data.datasets[0].data.shift();
                            }

                            chart.update();
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

                        // Initial data fetch
                        fetchDataCPU(deviceDetailId, CPU_payload);

                        // Optionally, you can set up an interval to periodically fetch data.
                        // setInterval(() => fetchDataCPU(deviceDetailId), interval);
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
                    function computeBytesToGBRoundoff(bytes) {
                        return Math.round(bytes / (1024 * 1024 * 1024));
                    }
                    function formatDate(date) {
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        return date.toLocaleDateString(undefined, options);
                    }
                    function generateMemoryChart(deviceDetailId) {

                        $(document).ready(() => {
                            // console.log(deviceDetailId)

                            var memoryChart;  // Declare at the top level of your function
                            var chartContainer = $("#chartContainer");
                            chartContainer.css({ width: '100%', height: '' });

                            var usageSelect = document.querySelector('#usageSelect');
                            var intervalId;
                            var changeEvent = new Event('change');
                            usageSelect.dispatchEvent(changeEvent);
                            usageSelect.addEventListener('change', function() {
                                var currentDate = new Date();
                                var startDate, endDate;

                                // Clear any existing interval
                                if (intervalId) clearInterval(intervalId);

                                // Define Constants
                                const REALTIME_INTERVAL = 2000; // 5 seconds
                                const API_URL = '/rmm-server/deviceDetail/history/';

                                function fetchData(deviceDetailId, payload, callback) {
                                    __executeExternalPost(API_URL + deviceDetailId, JSON.stringify(payload))
                                        .done(function (result) {
                                        if (result.status === "SUCCESS") {
                                            const json = JSON.parse(result.response.jsonData);
                                            callback(json);
                                        } else if (result.status === "ERROR") {
                                            console.error('Error fetching data:', result);
                                        }
                                    });
                                }
                                function initializeChart(totalMemory) {

                                    if (memoryChart && typeof memoryChart.destroy === 'function') {
                                        memoryChart.destroy();
                                    }
                                    const ctx = document.getElementById('memoryChart').getContext('2d');
                                    memoryChart = new Chart(ctx, {
                                        type: 'line',
                                        data: {
                                            labels: [],
                                            datasets: [{
                                                label: 'Used Memory',
                                                data: [],
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

                                    return memoryChart;
                                }
                                function updateChartAndInfo(memoryChart, totalMemory, availableMemory) {
                                    const memoryInUse = totalMemory - availableMemory;

                                    // Update Chart
                                    const currentTime = new Date().toLocaleTimeString();
                                    memoryChart.data.labels.push(currentTime);
                                    memoryChart.data.datasets[0].data.push(computeBytesToGB(memoryInUse));
                                    if (memoryChart.data.labels.length > 20) {
                                        memoryChart.data.labels.shift();
                                        memoryChart.data.datasets[0].data.shift();
                                    }
                                    memoryChart.update();

                                    // Update Memory Info
                                    let content = '<br><h5>Memory Information</h5><br>';
                                    content += `<p>Total Memory: ${computeBytesToGBRoundoff(totalMemory)} GB</p>`;
                                    content += `<p>Memory in Use: ${computeBytesToGB(memoryInUse)} GB</p>`;
                                    content += `<p>Available Memory: ${computeBytesToGB(availableMemory)} GB</p><br>`;
                                    $('.mem_info').html(content);
                                }

                                if (usageSelect.value === 'realtime') {
                                    const currentDate = new Date();
                                    const startOfDay = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0));
                                    const startDate = startOfDay.toISOString().replace('T', ' ').split('.')[0];
                                    const endOfDay = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59));
                                    const endDate = endOfDay.toISOString().replace('T', ' ').split('.')[0];

                                    const payload = {
                                        "startDate": startDate,
                                        "endDate": endDate
                                    };

                                    fetchData(deviceId, payload, function (data) {
                                        const totalMemory = data.total;
                                        const availableMemory = data.available;
                                        const memoryChart = initializeChart(totalMemory);

                                        updateChartAndInfo(memoryChart, totalMemory, availableMemory);

                                        intervalId = setInterval(function () {
                                            fetchData(deviceId, payload, function (data) {
                                                updateChartAndInfo(memoryChart, data.total, data.available);
                                                // console.log("Memory realtime")
                                            });
                                        }, REALTIME_INTERVAL);
                                    });
                                }else {
                                    if (this.value === 'weekly') {
                                        startDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] + " 00:00:00";
                                        endDate = currentDate.toISOString().split('T')[0] + " 23:59:59";

                                        var payload = {
                                            "startDate": startDate,
                                            "endDate": endDate
                                        };
                                        console.log(payload);


                                        fetchData(deviceId, payload, function(data) {
                                            if (memoryChart && typeof memoryChart.destroy === 'function') {
                                                memoryChart.destroy();
                                            }

                                            const totalMemory = data.total;
                                            const availableMemory = data.available;

                                            memoryChart = initializeChart(totalMemory);
                                            updateChartAndInfo(memoryChart, totalMemory, availableMemory);

                                            // Assuming the API returns data for each day in the week
                                            data.history.forEach(item => {
                                                // Assuming 'time' and 'usedMemory' are fields in the item
                                                memoryChart.data.labels.push(item.time);
                                                memoryChart.data.datasets[0].data.push(computeBytesToGB(item.usedMemory));
                                                console.log("Memory weekly")
                                            });

                                            memoryChart.update();
                                        });

                                    } else if (this.value === 'monthly') {
                                        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0] + " 00:00:00";
                                        endDate = currentDate.toISOString().split('T')[0] + " 23:59:59";

                                        var payload = {
                                            "startDate": startDate,
                                            "endDate": endDate
                                        };
                                        console.log(payload);

                                        fetchData(deviceId, payload, function(data) {
                                            if (memoryChart && typeof memoryChart.destroy === 'function') {
                                                memoryChart.destroy();
                                            }

                                            const totalMemory = data.total;
                                            const availableMemory = data.available;

                                            memoryChart = initializeChart(totalMemory);
                                            updateChartAndInfo(memoryChart, totalMemory, availableMemory);

                                            // Assuming the API returns data for each day in the week
                                            data.history.forEach(item => {
                                                // Assuming 'time' and 'usedMemory' are fields in the item
                                                memoryChart.data.labels.push(item.time);
                                                memoryChart.data.datasets[0].data.push(computeBytesToGB(item.usedMemory));
                                                console.log("Memory weekly")
                                            });

                                            memoryChart.update();
                                        });
                                    }
                                }
                            });
                            usageSelect.dispatchEvent(changeEvent);
                        });
                    }
                    function storageDataHandler(storage_id, period) {
                        const storage_API_URL = '/rmm-server/deviceDetail/history/';
                        var storage_payload = {
                            "startDate": getStartDate(period),
                            "endDate": getEndDate(period)
                        };

                        let intervalId; // Variable to store the interval ID for "Realtime" updates

                        function fetchDataStorage(storage_id, storage_payload) {
                            __executeExternalPost(storage_API_URL + storage_id, JSON.stringify(storage_payload))
                                .done(function (result) {
                                    // console.log("API Response:", result);
                                if (result.status === "SUCCESS") {
                                    let storageArray = JSON.parse(result.response.jsonData);
                                    let content = '';
                                    storageArray.forEach(storage => {
                                        content += generateStorageProgressBar(storage);
                                    });
                                    $('#storageBarsContainer').html(content);
                                } else if (result.status === "ERROR") {
                                    console.error('Error fetching data:', result);
                                }
                            }).fail(function (jqXHR, textStatus) {
                                console.error("API Request Failed:", textStatus, jqXHR.responseText);
                            });
                        }

                        function generateStorageProgressBar(storage) {
                            // console.log(storage)
                            let totalSizeGB = (storage.size / (1024 * 1024 * 1024)).toFixed(2);
                            let usedSizeGB = totalSizeGB - (storage.partitions.reduce((acc, partition) => acc + storage.writeBytes, 0) / (1024 * 1024 * 1024)).toFixed(2);
                            let availableSizeGB = (totalSizeGB - usedSizeGB).toFixed(2);
                            let usedPercentage = ((usedSizeGB / totalSizeGB) * 100).toFixed(2);

                            let progressBar = '';
                            progressBar += '<br><h5>Model - ' + storage.model + '</h5>';
                            progressBar += '<div class="progress" style="height: 30px;">';
                            progressBar += '<div class="progress-bar progress-bar-striped bg-info" style="width: ' + usedPercentage + '%" aria-valuenow="' + usedPercentage + '" aria-valuemin="0" aria-valuemax="100">' + usedPercentage + '% Used</div>';
                            progressBar += '</div>';
                            progressBar += '<p>' + availableSizeGB + ' GB FREE of ' + totalSizeGB + ' GB</p>';

                            progressBar += '<br><h5>Storage Information</h5><br>';
                            progressBar += `<p>Used space: ${usedSizeGB} GB</p>`;
                            progressBar += `<p>Free space: ${availableSizeGB} GB</p>`;
                            progressBar += `<p>Capacity: ${totalSizeGB} GB</p><br>`;
                            return progressBar;
                        }

                        function getStartDate(period) {
                            let currentDate = new Date();
                            if (period === 'weekly') {
                                return new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] + " 00:00:00";
                            } else if (period === 'monthly') {
                                return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0] + " 00:00:00";
                            } else { // realtime
                                return currentDate.toISOString().split('T')[0] + " 00:00:00";
                            }
                        }

                        function getEndDate(period) {
                            let currentDate = new Date();
                            return currentDate.toISOString().split('T')[0] + " 23:59:59";
                        }

                        // Initial fetch based on the selected option
                        fetchDataStorage(storage_id, storage_payload);

                        // Event listener for the dropdown change
                        $(document).on('change', '#StorageUsageSelect', function () {
                            // console.log("Dropdown value changed to:", $(this).val());
                            let newPeriod = $(this).val();
                            let newPayload = {
                                "startDate": getStartDate(newPeriod),
                                "endDate": getEndDate(newPeriod)
                            };

                            // Clear the previous interval if exists
                            if (intervalId) {
                                clearInterval(intervalId);
                            }

                            if (newPeriod === "realtime") {
                                // For "Realtime," set an interval to periodically fetch data
                                fetchDataStorage(storage_id, newPayload);
                                intervalId = setInterval(function () {
                                    // console.log("Storage Realtime");
                                    fetchDataStorage(storage_id, newPayload);
                                }, 2000); // Adjust the interval as needed (e.g., every 2 seconds)
                            } else {
                                // For "Weekly" and "Monthly," fetch and display data once
                                fetchDataStorage(storage_id, newPayload);
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
    });
    var __service = function() {
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
    var __networking = function() {
        __executeExternalGet('/rmm-server/deviceDetail/'+deviceId).done(function (result) {
            if (result.status != "ERROR") {
                result.response.forEach(function(data) {
                // console.log(data.type)
                    if (data.type === "NETWORK") {
                        // console.log(data.type)
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
                                $('#networkContainer').html(content);
                            }
                        } else {
                            content += '<p>No network information available.</p>';
                        }

                        content += '</div>';
                        return content;
                    } else if (data.type === "PUBLIC_IP") {
                        var beautifiedDataPublicIp = JSON.parse(data.jsonData);
                        
                        var content = '<div class="json-data">';
                        content += generateKeyValuePair(beautifiedDataPublicIp, 'PUBLIC IP');
                        content += '</div>';

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
                        
                        $('#publicContainer').html(content);
                    }
                });
            } else {
                console.log("Failed fetching Networking.");
            }
        }).fail(function() {
            console.log("Error occurred while fetching Networking.");
        });
    }
    $(document).ready(function() {
        __service();
        __networking();
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