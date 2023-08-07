<?php $this->load->view('templates/header.php'); ?> 

    <style type="text/css">
        .select2 {
            height: calc(2.25rem + 2px)!important;
        }
        .qr-code {
            max-width: 200px;
            margin: 10px;
        }
        span {
        	margin-left: 17px;
        }
        .barcode_qr {
        	margin-bottom: 10px;
        }
    </style>
<body>
    <div class="buttonForm">
        <button class="btn btn-info printBtn">Print</button>
        <button class="btn btn-secondary doneBtn">Done</button>
    </div>
    <div class="barcode_base">
    </div>

    <?php $this->load->view('templates/footer.php'); ?> 

	
    <script type="text/javascript">
        jQuery(document).ready(function($) {      
            var currentUrl = window.location.href;
            var urlParams = new URLSearchParams(currentUrl.split('?')[1]);
            var skuIdParam = urlParams.get('skuId');
            var skuIdArray = skuIdParam.split(',');
            console.log(skuIdArray);
            $(".barcode_base").empty();

            $.each(skuIdArray, function(index, skuId) {
                var qrCodeUrl  = "https://chart.googleapis.com/chart?cht=qr&chl=" + skuId + "&chs=160x160&chld=L|0";
                var qrCodeHtml = '<div class="barcode_qr">' +
                               '<img src="' + qrCodeUrl + '" class="qr-code img-thumbnail img-responsive" /><br>' +
                               '</div>';
                $(".barcode_base").append(qrCodeHtml);
            });
            $(".printBtn").unbind('click').on('click', function(){
                $(this).hide();
                $(".doneBtn").hide();
                window.print();
                $(".doneBtn").show();
            })
            $(".doneBtn").unbind('click').on('click', function(){
                var url = 'http://localhost/ams/assets_details';
                window.location.href = url;
            })
        })
    </script>
</body>

</html>