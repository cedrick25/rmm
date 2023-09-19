var apps_services = function(){

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
