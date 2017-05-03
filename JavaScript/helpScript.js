// Created on January 5th, 2017

function openOurGoal() {
    // Blur the background
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(5px)",
        "-moz-filter": "blur(5px)",
        "-o-filter": "blur(5px)",
        "-ms-filter": "blur(5px)",
        "filter": "blur(5px)"
    });

    // Show the modal (box where user writes their new note)
    $('#ourGoalModal').css({
        "display": "block"
    });
}

function closeOurGoal() {
    // Blur the background
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(0px)",
        "-moz-filter": "blur(0px)",
        "-o-filter": "blur(0px)",
        "-ms-filter": "blur(0px)",
        "filter": "blur(0px)"
    });

    // Show the modal (box where user writes their new note)
    $('#ourGoalModal').css({
        "display": "none"
    });
}

function openCredits() {
    // Blur the background
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(5px)",
        "-moz-filter": "blur(5px)",
        "-o-filter": "blur(5px)",
        "-ms-filter": "blur(5px)",
        "filter": "blur(5px)"
    });

    // Show the modal (box where user writes their new note)
    $('#creditsModal').css({
        "display": "block"
    });
}

function closeCredits() {
    // Blur the background
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(0px)",
        "-moz-filter": "blur(0px)",
        "-o-filter": "blur(0px)",
        "-ms-filter": "blur(0px)",
        "filter": "blur(0px)"
    });

    // Show the modal (box where user writes their new note)
    $('#creditsModal').css({
        "display": "none"
    });
}

function updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();

    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours == 0) ? 12 : currentHours;

    document.getElementById("time").innerHTML = currentHours + ":" + currentMinutes + " " + timeOfDay;
}

$(document).on('keypress', function(e) {
    var tag = e.target.tagName.toLowerCase();
    if (e.which === 109) {
        document.getElementById('menu').click();
    }
    if (e.which === 49) {
        window.location = "home.html";
    }
    if (e.which === 50) {
        window.location = "todos.html";
    }
    if (e.which === 52) {
        window.location = "settings.html";
    }
});

$(document).ready(function() {
    updateClock();
    setInterval(updateClock, 1000);
    $(".ourGoal").click(function() {
        openOurGoal();
    });
    $(".closeOurGoal").click(function() {
        closeOurGoal();
    });
    $(".creditsAcknowledgements").click(function() {
        openCredits();
    });
    $(".closeCredits").click(function() {
        closeCredits();
    });
});