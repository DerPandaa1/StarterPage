let websiteList = {
    0:{"name": "Youtube"},
    1:{"name": "Google"},
    2:{"name": "Github"},
    3:{"name": "Twitch"},
    4:{"name": "Pornhub"},
};
$(document).ready(function(){

    $( ".input .searchBar" ).on( "keyup", function() {
        let htmlCode = '<li><a class="website" href="https://www.youtube.com" style="text-decoration: none;"><img src="logos/youtube.png" class="logo" style="height: 50px;"><p class="website-link"><strong>Youtube</strong></p></a></li>';

        $('.website-list').append(htmlCode);



        if($(this).val() !== ""){
            for (let i = 0; i < Object.keys(websiteList).length; i++){
                if(websiteList[i]["name"].toLowerCase().includes($(this).val().toLowerCase())){
                    console.log(websiteList[i]);
                }
            }
        }
    } );
});