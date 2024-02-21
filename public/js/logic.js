$(document).ready(function(){

    $('.add-json-entry-outer').hide();

    $( ".container .searchBar" ).on( "keyup", function() {

        if($(this).val() !== ""){
            $('.website-list li').remove();

            var val = $(this).val();

            // Json Daten auslesen

            fetch('/readJson', {
                method: "POST"
            })
                .then((response) => response.text())
                .then((body) => {
                    var jsonData = JSON.parse(body);

                    let websiteList = jsonData.websites;
            
                    for (let i = 0; i < Object.keys(websiteList).length; i++){
                        if(websiteList[i]["name"].toLowerCase().includes(val.toLowerCase())){
                            let htmlCode = '<li><a class="website" href="'+websiteList[i]["url"]+'"><img src="assets/images/logos/'+websiteList[i]["icon"]+'" class="logo"><p class="website-link"><strong>'+websiteList[i]["name"]+'</strong></p></a></li>';
                            $('.website-list').append(htmlCode);
                        }
                    }
                });
        }
        else{
            $('.website-list li').remove();
        }
    } );

    $('.create-entry-icon').on("click", function (){
        $('.add-json-entry-outer').show();
    });

    $('.close-btn').on("click", function (){
        $('.add-json-entry-outer').hide();
    });

    $('.add-json-entry-btn').on("click", function(){


        //console.log('here');
        
        
        var websiteName = $('#websiteName').val();
        var websiteURL = $('#websiteURL').val();

        var website = {name: websiteName, url:websiteURL, icon:"youtube.svg"}

        // Daten hinzufügen funktioniert hiermit

        fetch('/addJson', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                website
            })
        })
            .then((response) => response.text())
            .then((body) => {
                console.log(body);
            });


    });
});