var list = function(){
    $('#divLoading').show()
    __executeExternalGet('/rmm-server/notification/list/1111').done(function (result) {
        if (result.status != "ERROR") {
            $('#divLoading').hide()
            result.response.forEach(function(data) {
                console.log(data);

                // Create a new table row with data attributes
                var row = $('<tr data-cd="' + data.createdDate + '" data-id="' + data.id + '" data-devname="' + data.deviceName + '" data-notification="' + data.notification + '"></tr>');

                // Add the deviceName and notification cells
                row.append('<td>' + data.clusterId + '</td>');
                row.append('<td>' + data.deviceName + '</td>');
                row.append('<td>' + data.notification + '</td>');
                row.append('<td>' + data.createdDate + '</td>');

                // Append the row to the table body
                $('.table_body').append(row);
            });

            // Set up the DataTable
            $(document).ready(function() {
                var table = $('#allTables').DataTable({
                    scrollX: true,
                    responsive: true,
                    paging: true,
                    lengthChange: false,
                    searching: false,
                });

                $('#allTables tbody').on('click', 'tr', function() {
                    var id = $(this).data('id');
                    if (id !== undefined) {
                        var deviceName = $(this).data('devname');
                        var notification = $(this).data('notification');
                        var createdDate = $(this).data('cd');
                        console.log('Clicked Row - ID: ' + id + ', Device Name: ' + deviceName + ', createdDate: ' + createdDate);
                        $('.dev_name').html("Device Name - " + deviceName);
                        $('.desc').html(notification);
                        $('.createdDate').html(createdDate);
                        $('.readContainer').show();



                        var payload = {
                            "uuid": "1111",
                            "id": id,
                        };
                        console.log(payload);

                        __executeExternalPost('/rmm-server/notification/markAsRead/' + 1111 + '/' + id, JSON.stringify(payload)).done(function(result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                                if (result.status === "SUCCESS") {
                                    
                                    __executeExternalGet('/rmm-server/notification/unread/count/1111').done(function(result) {
                                        console.log(result);
                                        $(".notificationCount").html(result.response)
                                    })
                                } else {
                                }
                            } else {
                                console.log(result.status);
                            }
                        });
                    }
                });
                $('.close-container').on('click', function() {
                    // Hide the parent .readContainer
                    $(this).closest('.readContainer').hide();
                });
            });
        }
    })
    $(document).on('click', ".unreadTab", function() {
        if ($.fn.DataTable.isDataTable('#unreadTables')) {
            $('#unreadTables').DataTable().destroy();
        }

        __executeExternalGet('/rmm-server/notification/unread/list/1111').done(function (result) {
            if (result.status != "ERROR") {
                $('#divLoading').hide();
                $('.table_body_unread').empty();

                var table = $('<table class="table table-hover card-table" id="unreadTables" width="100%"></table>');
                table.append('<thead><tr><th>Device Name</th><th>Description</th><th>Received Date</th></tr></thead>');
                table.append('<tbody class="table_body_unread"></tbody>');
                table.find('thead').addClass('style', 'width: 100%;');

                $("#unread").html(`
                    <div style="padding: 25px;" id="tab-table-2" class="ps ps--active-y">
                        ${table.prop('outerHTML')}
                    </div>`);

                // Add data to the table
                result.response.forEach(function(data) {
                    var row = $('<tr data-cd="' + data.createdDate + '" data-id="' + data.id + '" data-devname="' + data.deviceName + '" data-notification="' + data.notification + '"></tr>');
                    row.append('<td>' + data.deviceName + '</td>');
                    row.append('<td>' + data.notification + '</td>');
                    row.append('<td>' + data.createdDate + '</td>');
                    $('.table_body_unread').append(row);
                });

                // Initialize DataTable
                var table = $('#unreadTables').DataTable({
                    scrollX: true,
                    responsive: true,
                    paging: true,
                    lengthChange: false,
                    searching: false,
                });

                $('#unreadTables tbody').on('click', 'tr', function() {
                    var id = $(this).data('id');
                    if (id !== undefined) {
                        var deviceName = $(this).data('devname');
                        var notification = $(this).data('notification');
                        var createdDate = $(this).data('cd');
                        console.log('Clicked Row - ID: ' + id + ', Device Name: ' + deviceName + ', createdDate: ' + createdDate);
                        $('.dev_name').html("Device Name - " + deviceName);
                        $('.desc').html(notification);
                        $('.createdDate').html(createdDate);
                        $('.readContainer').show();

                        var payload = {
                            "uuid": "1111",
                            "id": id,
                        };
                        console.log(payload);

                        // Store a reference to the row
                        var clickedRow = $(this);

                        __executeExternalPost('/rmm-server/notification/markAsRead/' + 1111 + '/' + id, JSON.stringify(payload)).done(function(result) {
                            console.log(result);
                            if (result.status != "ERROR") {
                                if (result.status === "SUCCESS") {
                                    // Remove the clicked row
                                    table.row(clickedRow).remove().draw();
                                    __executeExternalGet('/rmm-server/notification/unread/count/1111').done(function(result) {
                                        console.log(result);
                                        $(".notificationCount").html(result.response)
                                    })
                                } else {
                                    // Handle unsuccessful result
                                }
                            } else {
                                console.log(result.status);
                            }
                        });
                    }
                });

                // Ensure the DataTable is responsive
                table.columns.adjust().draw();
                $('.close-container').on('click', function() {
                    $(this).closest('.readContainer').hide();
                });
            }
        });
    });
}
