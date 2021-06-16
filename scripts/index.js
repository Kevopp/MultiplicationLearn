$(document).ready(function(){

    //----------------------------------------Initialize----------------------------------------
    const title = "Multiplication";
    const lang = localStorage.getItem("lang");
    const langCallback = function(obj){
        $("#nameLabel").html(obj.name + ":");
        $("#nextBtn").html(obj.next);
        $("#inputAlert").html(obj.emptyInput);
        $("html").attr("lang", obj.lang);
    };

    if(lang === null)
        changeLanguage("en", langCallback);
    else
        changeLanguage(lang, langCallback);

    for(let i = 0; i < title.length; ++i){
        let r = Math.floor((Math.random() * 255) + 1);
        let g = Math.floor((Math.random() * 255) + 1);
        let b = Math.floor((Math.random() * 255) + 1);
        let htmlLetter = $("<p class='letterOfTitle'></p>")
                        .text(title[i])
                        .css("color", "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")");
        $("#headerTitle").append(htmlLetter);
    }



    //----------------------------------------Events----------------------------------------
    $("#plLabel").click(() => {
        changeLanguage("pl", langCallback);
    })

    $("#enLabel").click(() => {
        changeLanguage("en", langCallback);
    })

    $("#nextBtn").click(() => {
        const input = document.getElementById("usernameInput");
        const SLIDE_TIME = 500;

        if(input.value.length !== 0){
            $("#headerTitle").fadeOut(SLIDE_TIME);
            $("#plLabel").fadeOut(SLIDE_TIME);
            $("#enLabel").fadeOut(SLIDE_TIME);

            $("#userContainer").slideUp(SLIDE_TIME, () => {
                localStorage.setItem("username", input.value);
                input.value = "";
                location.assign("app.html");
            });
        }
        else{
            $("#inputAlert").fadeIn("fast", () => {
                setTimeout(() => { $("#inputAlert").fadeOut("fast"); }, 2000);
            });
        }
    });
});