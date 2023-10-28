var dashboard = function (){
	console.log("attached events for dashboard");
    
    // __executeExternalGet('3000/inventory/stock-count/InStock').done(function (result) {
    //     console.log(result)        

    //     if (result.status != "ERROR") {
    //     	console.log(result)
    //     	$(".InStock").text(result.response)
    //     }
    // })

    // __executeExternalGet('3000/inventory/stock-count/AssignStock').done(function (result) {
    //     console.log(result)        

    //     if (result.status != "ERROR") {
    //     	console.log(result)
    //     	$(".AssignStock").text(result.response)
    //     }
    // })

    // __executeExternalGet('3000/inventory/stock-count/ForRepair').done(function (result) {
    //     console.log(result)        

    //     if (result.status != "ERROR") {
    //     	console.log(result)
    //     	$(".ForRepair").text(result.response)
    //     }
    // })
    
    // function getPreviousValue() {
    //     return parseInt(localStorage.getItem('previousNotificationValue')) || 0;
    // }

    // $(document).ready(function() {
    //     // Initial value when the page loads
    //     var previousValue = getPreviousValue();
    //     $(".notificationCount").html(previousValue);

    //     // Poll the API for value changes
    //     setInterval(function() {
    //         __executeExternalGet('/rmm-server/notification/unread/count/1111').done(function(result) {
    //             console.log(result);
    //             var newValue = result.response;
                
    //             if (newValue !== previousValue) {
    //                 $(".notificationCount").html(newValue);
    //                 localStorage.setItem('previousNotificationValue', newValue);
    //                 previousValue = newValue;
    //             }
    //         });
    //     }, 3000);
    // });
}