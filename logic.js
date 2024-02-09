$(document).ready(function(){

    $('.add-json-entry-outer').hide();

    $( ".container .searchBar" ).on( "keyup", function() {

        if($(this).val() !== ""){
            $('.website-list li').remove();

            var val = $(this).val();

            !async function(){
                let data = await fetch("websites.json")
                    .then((response) => response.json())
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            

            let websiteList = data.websites;
            
            for (let i = 0; i < Object.keys(websiteList).length; i++){
                if(websiteList[i]["name"].toLowerCase().includes(val.toLowerCase())){
                    let htmlCode = '<li><a class="website" href="'+websiteList[i]["url"]+'"><img src="'+websiteList[i]["icon"]+'" class="logo"><p class="website-link"><strong>'+websiteList[i]["name"]+'</strong></p></a></li>';
                    $('.website-list').append(htmlCode);
                }
            }

            }();
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
});