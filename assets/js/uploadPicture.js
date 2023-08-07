var uploadPicture = function(){
    $('.btn-upload').on('click', function() {
        console.log("clicked")
        $('#file-input').click();
    });
    $('#file-input').on('change', function() {
        var api = ___ctx;
        console.log(api)
        var imgavat = $('#client_photo');

        console.log(imgavat);

        var file = this.files[0];

        console.log(file);

        // Create a FormData object to store the file data
        var formData = new FormData();

        formData.append('file', file);

        // Set up an AJAX request to send the file data to the server
        var url = api+"8080/file/upload?uuid="+$.cookie("uuid")+"&type=profilePicture&version=0&kind=profilePicture&createdby="+$.cookie("uuid")
        // console.log(url)
        $.ajax({
          url: url, // Replace with the path to your server-side script
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
            // Handle the server response here
            console.log(response);
          },
          error: function(xhr, status, error) {
            // Handle any errors here
            console.log(error);
          }
        });

        if (this.files[0]) {   
            var reader  = new FileReader();
            
            reader.readAsDataURL(this.files[0]);
            
            reader.onloadend = function () {
                imgavat.attr('src', reader.result);
            };
        }

    });
}

var uploadPictureUpdate = function(){
    __executeExternalGet('8080/file/view/4').done(function (result) {
        if (result.status != "ERROR") {
            console.log(result)
            // console.log(result.files.length)
            // if (result.files.length != 0) {
            //     console.log(result.files[0].id)
            //     $('#client_photo').attr('src', 'file/view/'+result.files[0].id);
            // }
        }else{
            console.log("error")
        }
    })
}