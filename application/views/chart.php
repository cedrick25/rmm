<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Real-time Memory Chart</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<div id="chartContainer" width="1800" height="200">
    <canvas id="memoryChart" width="400" height="200"></canvas>
</div>
    <div class="mem_info"></div>

<script>
    $(document).ready(() => {
        var chartContainer = $("#chartContainer");
        chartContainer.css({ width: '1000px', height: '300px' });
        function computeBytesToGB(bytes) {
            return (bytes / (1024 * 1024 * 1024)).toFixed(2);
        }
        const sampleData = {
            "id": 1,
            "createdBy": "SYSTEM",
            "createdDate": "2023-09-07 11:37:52",
            "status": true,
            "deviceId": "1",
            "deviceName": null,
            "jsonData": "{\"available\":4420747264,\"physicalMemory\":[{\"bankLabel\":\"P0 CHANNEL A\",\"capacity\":8589934592,\"clockSpeed\":3200000000,\"manufacturer\":\"Samsung\",\"memoryType\":\"DDR4\"},{\"bankLabel\":\"P0 CHANNEL B\",\"capacity\":8589934592,\"clockSpeed\":3200000000,\"manufacturer\":\"A-DATA Technology\",\"memoryType\":\"DDR4\"}],\"pageSize\":4096,\"virtualMemory\":{\"swapPagesOut\":4572632,\"swapPagesIn\":50805294,\"virtualInUse\":24998776832,\"virtualMax\":41473187840,\"swapTotal\":24430350336,\"swapUsed\":156151808},\"total\":17042837504}",
            "type": "MEMORY",
            "historicalData": null
        };

       const parsedData = JSON.parse(sampleData.jsonData);
       const totalMemory = parsedData.total;
       let availableMemory = parsedData.available;
       let memoryInUse = totalMemory - availableMemory;

       function updateMemoryInfo() {
          var content = '<br><h5>Memory Information</h5><br>';
          content += '<p>Total Memory: ' + computeBytesToGB(totalMemory) + ' GB</p>';
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
                    label: 'Available Memory',
                    data: [],  // We'll dynamically populate this as well
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: '#36A2EB',
                    borderWidth: 1,
                    fill: true
                }, {
                    label: 'Used Memory',
                    data: [],  // We'll dynamically populate this as well
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: '#FF6384',
                    borderWidth: 1,
                    fill: true
                }]
            }
        });

        function addMemoryData() {
            const currentTime = new Date().toLocaleTimeString(); // Get current time

            // Add new data
            memoryChart.data.labels.push(currentTime);
            memoryChart.data.datasets[0].data.push(computeBytesToGB(parsedData.available));
            memoryChart.data.datasets[1].data.push(computeBytesToGB(totalMemory) - computeBytesToGB(parsedData.available));

            // Ensure chart doesn't have too many data points
            if (memoryChart.data.labels.length > 20) {
                memoryChart.data.labels.shift();
                memoryChart.data.datasets[0].data.shift();
                memoryChart.data.datasets[1].data.shift();
            }

            memoryChart.update();
        }

        function simulateRealTimeDataFetch() {
           // Simulate a random change in available memory (e.g., +/- up to 500MB)
           const change = Math.floor(Math.random() * 500000000) * (Math.random() < 0.5 ? 1 : -1);
           parsedData.available += change;
           availableMemory = parsedData.available;
           memoryInUse = totalMemory - availableMemory;  // Recompute memory in use
           
           addMemoryData();

           // Update the memory information display
           updateMemoryInfo();
        }
        updateMemoryInfo();
        setInterval(simulateRealTimeDataFetch, 3000);  // Simulate data fetch every 5 seconds
    });

</script>

</body>
</html>
