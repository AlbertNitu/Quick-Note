// Created on January 5th, 2017

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

function saveSettings() {
    var checkedOptionRaw = $("#notesOption").is(":checked");
    var checkedOption = "";
    var hideTasksDueDate = "";
    if (checkedOptionRaw) {
        checkedOption = "notes";
    } else {
        checkedOption = "task"
    }
    chrome.storage.sync.set({
        'defaultPage': checkedOption
    });
    if ($("#allTasks").is(":checked") == true) {
        chrome.storage.sync.set({
            'taskSection': "all"
        });
    } else if ($("#upcomingTasks").is(":checked") == true) {
        chrome.storage.sync.set({
            'taskSection': "upcoming"
        });
    } else {
        chrome.storage.sync.set({
            'taskSection': "overdue"
        });
    }
    if($("#hideTasksDueDates").is(':checked')) {
        hideTasksDueDate = "not "
    }
    chrome.storage.sync.set({
        'hideTasksDueDate': hideTasksDueDate
    }, function() {
        var $toastContent = $("<span style='text-align: center; font-size: 135%;'>Options have been saved.</span>");
        Materialize.toast($toastContent, 2000);
    });
}

function resetSettings() {
    $("#notesOption").prop("checked", true);
    $("#allTasks").prop("checked", true);
    $("#hideTasksDueDates").prop("checked", true);
    saveSettings();
}

function getPreferences() {
    chrome.storage.sync.get('defaultPage', function(obj) {
        var defaultPage = obj.defaultPage;
        if (defaultPage == "task") {
            $("#todosOption").prop("checked", true);
        }
    });
    chrome.storage.sync.get('taskSection', function(obj) {
        var taskSection = obj.taskSection;
        if (taskSection == "all") {
            $("#allTasks").prop("checked", true);
        } else if (taskSection == "upcoming") {
            $("#upcomingTasks").prop("checked", true);
        } else {
            $("#overdueTasks").prop("checked", true);
        }
    });
    chrome.storage.sync.get('hideTasksDueDate', function(obj) {
        var hideDueDates = obj.hideTasksDueDate;
        if (hideDueDates != "not ") {
            $("#hideTasksDueDates").prop("checked", false);
        }
    });
}

$(document).on('keypress', function(e) {
    var tag = e.target.tagName.toLowerCase();
    if (e.which === 114) {
        resetSettings();
    }
    if (e.which === 115) {
        saveSettings();
    }
    if (e.which === 109) {
        document.getElementById('menu').click();
    }
    if (e.which === 49) {
        window.location = "home.html";
    }
    if (e.which === 50) {
        window.location = "todos.html";
    }
    if (e.which === 51) {
        window.location = "help.html";
    }
});

$(document).ready(function() {
    updateClock();
    setInterval(updateClock, 1000);
    getPreferences();
    $("#saveSettings").click(function() {
        saveSettings();
    });
    $("#resetSettings").click(function() {
        resetSettings();
    });
});