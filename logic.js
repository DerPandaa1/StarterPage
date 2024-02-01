let websiteList = {
    0:{"name": "Youtube", "url":"https://www.youtube.com"},
    1:{"name": "Google", "url":"https://www.google.de/"},
    2:{"name": "Github", "url":"https://github.com/"},
    3:{"name": "Twitch", "url":"https://www.twitch.tv/"},
    4:{"name": "Pornhub", "url":"https://de.pornhub.com/"}
};

$(document).ready(function(){

    $( ".searchBar" ).on( "keyup", function() {
        //let htmlCode = '<li><a class="website" href="https://www.youtube.com"><img src="logos/youtube.png" class="logo"><p class="website-link"><strong>Youtube</strong></p></a></li>';

        //$('.website-list').append(htmlCode);



        if($(this).val() !== ""){
            $('.website-list li').remove();
            for (let i = 0; i < Object.keys(websiteList).length; i++){
                if(websiteList[i]["name"].toLowerCase().includes($(this).val().toLowerCase())){
                    console.log(websiteList[i]["url"]);
                    let htmlCode = '<li><a class="website" href="'+websiteList[i]["url"]+'"><img src="logos/github.svg" class="logo"><p class="website-link"><strong>'+websiteList[i]["name"]+'</strong></p></a></li>';
                    $('.website-list').append(htmlCode);
                }
            }
        }
        else{
            $('.website-list li').remove();
        }
    } );
});