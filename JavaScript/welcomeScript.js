// Created on January 27th, 2017

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

$(document).ready(function() {
    updateClock();
    setInterval(updateClock, 1000);
    $(".nextIntro").click(function() {
        $('.tabs').tabs('select_tab', 'features');
    });
    $(".previousFeatures").click(function() {
        $('.tabs').tabs('select_tab', 'intro');
    });
    $(".nextFeatures").click(function() {
        $('.tabs').tabs('select_tab', 'advantages');
    });
    $(".previousAdvantages").click(function() {
        $('.tabs').tabs('select_tab', 'features');
    });
});