var dashboard = function (){
	console.log("attached events for dashboard");
    
    __executeExternalGet('3000/inventory/stock-count/InStock').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	console.log(result)
        	$(".InStock").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/AssignStock').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	console.log(result)
        	$(".AssignStock").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/ForRepair').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	console.log(result)
        	$(".ForRepair").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/InRepair').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	console.log(result)
        	$(".InRepair").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/ForMaintenance').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	console.log(result)
        	$(".ForMaintenance").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/InMaintenance').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
        	console.log(result)
        	$(".InMaintenance").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/ForPickUp').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".ForPickUp").text(result.response)
        }
    })
    
    __executeExternalGet('3000/inventory/stock-count/Consumed').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".Consumed").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/Impaired').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".Impaired").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/Depreciated').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".Depreciated").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/DisposeStock').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".DisposeStock").text(result.response)
        }
    })
    
    __executeExternalGet('3000/inventory/stock-count/ExpireAsset').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".ExpireAsset").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/Expiring30D').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".Expiring30D").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/ForDisposal').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".ForDisposal").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/InVendorWarranty').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".InVendorWarranty").text(result.response)
        }
    })
    
    __executeExternalGet('3000/inventory/stock-count/ForVendorWarranty').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".ForVendorWarranty").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/InManufacturerWarranty').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".InManufacturerWarranty").text(result.response)
        }
    })

    __executeExternalGet('3000/inventory/stock-count/ForManufacturerWarranty').done(function (result) {
        console.log(result)        

        if (result.status != "ERROR") {
            console.log(result)
            $(".ForManufacturerWarranty").text(result.response)
        }
    })
}