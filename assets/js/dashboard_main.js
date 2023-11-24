var dashboard = function (){
	console.log("attached events for dashboard");
    
    __executeExternalGet('/rmm-server/dashboard/device/count/all').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	$(".Devices").text((result.response || 0))
        }
    })

    // __executeExternalGet('/rmm-server/dashboard/storage/count/all').done(function (result) {
    //     console.log(result)        

    //     if (result.status != "ERROR") {
    //     	$(".Storage").text((result.response || 0) ' GB')
    //     }
    // })

    __executeExternalGet('/rmm-server/dashboard/average/ram/all').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            $(".RAM").text((result.response || 0) + ' TB');
        }
    })

    __executeExternalGet('/rmm-server/dashboard/cluster/count/all').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            $(".Clusters").html((result.response || 0) + ' Total number of <span class="badge badge-success">Clusters</span>');
        }
    })

    $(document).ready(function() {
        __executeExternalGet('/rmm-server/dashboard/device/count/cluster').done(function (result) {
            console.log(result)        

            if (result.status != "ERROR") {
                var clusterNames = result.response.map(entry => entry.clusterName);
                var clusterCounts = result.response.map(entry => entry.count);

                var ctx = document.getElementById('clusterBarGraph').getContext('2d');
                new Chart(ctx, {
                    type: 'bar', // Use 'horizontalBar' for horizontal bar chart
                    data: {
                        labels: clusterNames,
                        datasets: [{
                            label: 'Device Count',
                            data: clusterCounts,
                            backgroundColor: 'rgba(0, 128, 0, 0.2)', // Green background color with alpha (0.2)
                            borderColor: 'rgba(0, 128, 0, 1)',  
                            borderWidth: 1
                        }]
                    },
                      options: {
                        indexAxis: 'y',
                      }
                });
            }
        })
    });

    
}