function fillButtons(time){
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = a * b;
    const btnIndex = Math.floor(Math.random() * 3) + 1;
    const buttons = $("#answersContainer p");

    $("#numberA").html(a);
    $("#numberB").html(b);
    $("#btn" + btnIndex.toString()).html(c);

    for(let i = 1; i < buttons.length + 1; ++i){
        $("#btn" + i.toString()).click(function(){
            $("#numberC").html($("#btn" + i.toString()).text());
        });

        if(i === btnIndex)
            $("#btn" + btnIndex.toString()).html(c);
        else
            $("#btn" + i.toString()).html(Math.floor(Math.random() * 100) + 1);
    }

    $("#numberC").html("");
    $("#animatingBackground").css("height", "0px");
    $("#animatingBackground").animate({ height: window.innerHeight.toString() }, time, function(){
        const userResult = Number($("#numberC").text());

        if(userResult === c)
            $("#goodNumber").html(Number($("#goodNumber").text()) + 1);
        else if(userResult === 0)
            console.log("Nothing");
        else
            $("#badNumber").html(Number($("#badNumber").text()) + 1);

        fillButtons(time);
    });
}


$(document).ready(function() {
    let timeInput = document.getElementById("timeInput");
    let timeForAnswer = timeInput.value * 1000;

    $("#welcomeLabel").hide();
    $("#headerTitle").hide();
    $("#userContainer").hide();
    $("#answersContainer").hide();

    const langCallback = function(obj){
        $("#welcomeLabel").html(obj.welcome + " " + localStorage.getItem("username"));
        $("#good").html(obj.good + ":");
        $("#bad").html(obj.bad + ":");
        $("#settingsTitle").html(obj.settings);
        $("#timeTitle").html(obj.time + "(s)");
        $("#saveSettings").html(obj.save);
        $("html").attr("lang", obj.lang);
    };

    changeLanguage(localStorage.getItem("lang"), langCallback);

    function initialize(){
        $("#headerTitle").addClass("appTitle");
        $("#headerTitle").fadeIn(500);

        $("#userContainer").fadeIn(500);
        $("#userContainer").css("display", "flex");

        $("#answersContainer").slideDown(500);
        $("#answersContainer").css("width", document.getElementById("userContainer").getBoundingClientRect().width);

        $("#settingsLabel").click(function(){
            $("#animatingBackground").stop();
            $("#settingsContainer").show();
            $("#settingsContainer").animate({width: "300px"});
        })

        $("#saveSettings").click(function(){
            $("#settingsContainer").animate({width: "0px"}, function(){
                timeForAnswer = timeInput.value * 1000;
                $(this).hide();
                fillButtons(timeForAnswer);
            });
        });

        $("#plLabel").click(() => {
            changeLanguage("pl", langCallback);
        })
    
        $("#enLabel").click(() => {
            changeLanguage("en", langCallback);
        })

        $("#timeValue").html(timeInput.value);

        timeInput.oninput = function(){
            $("#timeValue").html(this.value);
        }

        fillButtons(timeForAnswer);
    }

    $("#welcomeLabel").fadeIn(2000, function(){
        $(this).fadeOut(2000, initialize);
    });
});
