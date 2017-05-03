// Created on January 5th, 2017

function newTask() {
    // Set the values for the title and note content boxes (in the modal) to empty
    document.getElementById("title").value = "";
    document.getElementById("datepicker").value = "";

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
    $('#newTask').css({
        "display": "block"
    });

    $('.todoDueDate').css({
        "display": "block"
    });
    $("#title").focus();
}

function hideNewTaskModal() {
    // Hide the modal
    $('#newTask').css({
        "display": "none"
    });

    $('.todoDueDate').css({
        "display": "none"
    });

    // Unblur the background
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(0px)",
        "-moz-filter": "blur(0px)",
        "-o-filter": "blur(0px)",
        "-ms-filter": "blur(0px)",
        "filter": "blur(0px)"
    });
}

function updateTasks() {
    $.jStorage.deleteKey("hdja938263SKFJGHafjhgfdYRWET");
    chrome.storage.sync.get('hideTasksDueDate', function(obj) {
        var yourTasksContent = "";
        var overdueTasksContent = "";
        var upcomingTasksContent = "";
        var yourTasksContentEmpty = '<img src="Images/moon.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif; text-align: center;">You don\'t have any tasks... Yet! To add tasks, press the plus button above.</p>';
        var overdueTasksContentEmpty = '<img src="Images/moon.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif; text-align: center;">Hooray! You don\'t have any overdue tasks! Overdue tasks will be listed here.</p>';
        var upcomingTasksContentEmpty = '<img src="Images/moon.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif; text-align: center;">You currently have no upcoming tasks. Make sure to check for any overdue tasks as well!</p>';
        var numberOfTasks = 0;
        var numberOfOverdueTasks = 0;
        var numberOfUpcomingTasks = 0;
        var allTasks = $.jStorage.index();
        allTasks = allTasks.reverse();
        var allTasksArrayLength = allTasks.length;
        var allTasksForSync = {};
        for (var i = 0; i < allTasksArrayLength; i++) {
            var dueDate = $.jStorage.get(allTasks[i]);
            var dueDateDiv = "";
            var hideDueDates = obj.hideTasksDueDate;
            allTasksForSync[allTasks[i]] = dueDate;
            if (hideDueDates == "not ") {
                if (dueDate.length != 0) {
                    dueDateDiv = '<div style="position: absolute; right: 10px; top: 0%; transform: translateY(-50%); z-index: 100; color: white; background-color: #D50000; padding: 2px 5px 2px 5px; border-radius: 20px;" id="taskDueDate" class="taskDueDate">' + dueDate + '</div>';
                }
            }
            var backgroundColor = "white darken-1";
            if (moment(dueDate).isSame(Date.now(), 'day') == true) {
                backgroundColor = "orange lighten-4";
                upcomingTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                numberOfUpcomingTasks += 1;
            } else if (Date.parse(dueDate)-Date.parse(new Date())<0 && dueDate.length != 0) {
                backgroundColor = "red accent-1";
                overdueTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                numberOfOverdueTasks += 1;
            } else {
                backgroundColor = "white darken-1";
                if (dueDate.length != 0 || dueDate != "") {
                    upcomingTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                    numberOfUpcomingTasks += 1;
                }
            }
            yourTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card ' + backgroundColor + ' singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
            numberOfTasks += 1;
        }
        chrome.storage.sync.set({
            'tasks': allTasksForSync
        }, function() {
            chrome.storage.sync.get('tasks', function(obj) {
                console.log(obj.tasks)
            });
        });
        if (numberOfTasks != 0) {
            $("#userTasksCard").html(yourTasksContent);
            $("#searchTasksResult").html(yourTasksContent);
        } else {
            $("#userTasksCard").html(yourTasksContentEmpty);
            $("#searchTasksResult").html('<p style="text-align: center;">You currently have no tasks. Press the blue button to create one!</p>');
        }
        if (numberOfOverdueTasks != 0) {
            $("#overdueTasksCard").html(overdueTasksContent);
        } else {
            $("#overdueTasksCard").html(overdueTasksContentEmpty);
        }
        if (numberOfUpcomingTasks != 0) {
            $("#upcomingTasksCard").html(upcomingTasksContent);
        } else {
            $("#upcomingTasksCard").html(upcomingTasksContentEmpty);
        }
    });
}

function updateTasksFirstTime() {
    $.jStorage.flush();

    chrome.storage.sync.get("tasks", function(result) {
        if (!chrome.runtime.error) {
            var allUserTasks = result.tasks;
            console.log(allUserTasks);
            Object.keys(allUserTasks).forEach(function(title) {
                var dueDate = allUserTasks[title];
                $.jStorage.set(title, dueDate);
            });

            $.jStorage.deleteKey("hdja938263SKFJGHafjhgfdYRWET");
            chrome.storage.sync.get('hideTasksDueDate', function(obj) {
                var yourTasksContent = "";
                var overdueTasksContent = "";
                var upcomingTasksContent = "";
                var yourTasksContentEmpty = '<img src="Images/moon.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif; text-align: center;">You don\'t have any tasks... Yet! To add tasks, press the plus button above.</p>';
                var overdueTasksContentEmpty = '<img src="Images/moon.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif; text-align: center;">Hooray! You don\'t have any overdue tasks! Overdue tasks will be listed here.</p>';
                var upcomingTasksContentEmpty = '<img src="Images/moon.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif; text-align: center;">You currently have no upcoming tasks. Make sure to check for any overdue tasks as well!</p>';
                var numberOfTasks = 0;
                var numberOfOverdueTasks = 0;
                var numberOfUpcomingTasks = 0;
                var allTasks = $.jStorage.index();
                allTasks = allTasks.reverse();
                var allTasksArrayLength = allTasks.length;
                var allTasksForSync = {};
                for (var i = 0; i < allTasksArrayLength; i++) {
                    var dueDate = $.jStorage.get(allTasks[i]);
                    var dueDateDiv = "";
                    var hideDueDates = obj.hideTasksDueDate;
                    allTasksForSync[allTasks[i]] = dueDate;
                    if (hideDueDates == "not ") {
                        if (dueDate.length != 0) {
                            dueDateDiv = '<div style="position: absolute; right: 10px; top: 0%; transform: translateY(-50%); z-index: 100; color: white; background-color: #D50000; padding: 2px 5px 2px 5px; border-radius: 20px;" id="taskDueDate" class="taskDueDate">' + dueDate + '</div>';
                        }
                    }
                    var backgroundColor = "white darken-1";
                    if (moment(dueDate).isSame(Date.now(), 'day') == true) {
                        backgroundColor = "orange lighten-4";
                        upcomingTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                        numberOfUpcomingTasks += 1;
                    } else if (Date.parse(dueDate)-Date.parse(new Date())<0 && dueDate.length != 0) {
                        backgroundColor = "red accent-1";
                        overdueTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                        numberOfOverdueTasks += 1;
                    } else {
                        backgroundColor = "white darken-1";
                        upcomingTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                        numberOfUpcomingTasks += 1;
                    }
                    yourTasksContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card ' + backgroundColor + ' singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text tasksCardContent" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                    numberOfTasks += 1;
                }
                if (numberOfTasks != 0) {
                    $("#userTasksCard").html(yourTasksContent);
                    $("#searchTasksResult").html(yourTasksContent);
                } else {
                    $("#userTasksCard").html(yourTasksContentEmpty);
                    $("#searchTasksResult").html('<p style="text-align: center;">You currently have no tasks. Press the blue button to create one!</p>');
                }
                if (numberOfOverdueTasks != 0) {
                    $("#overdueTasksCard").html(overdueTasksContent);
                } else {
                    $("#overdueTasksCard").html(overdueTasksContentEmpty);
                }
                if (numberOfUpcomingTasks != 0) {
                    $("#upcomingTasksCard").html(upcomingTasksContent);
                } else {
                    $("#upcomingTasksCard").html(upcomingTasksContentEmpty);
                }
            });
        }
    });
}

var newTaskStatusAlertTime = 2000;
var delayAfterClosingModal = 300;

// Copied from Stack Exchange
function longer(champ, contender) {
    return (contender.length > champ.length) ? contender: champ;
}

// Copied from Stack Exchange
function longestWordLength(str) {
    var words = str.split(' ');
    var longestWord = words.reduce(longer);
    return longestWord.length;
}

function saveNewTask() {
    var newTaskNameText = document.getElementById("title").value;
    var newTaskDate= document.getElementById("datepicker").value;

    if (newTaskNameText.trim().length == 0) { // If new note title is empty
        var $toastContentError = $("<span style='text-align: center; font-size: 135%;'>Please create a task with a valid name</span>");
        Materialize.toast($toastContentError, newTaskStatusAlertTime);
    } else {
        var duplicate = 0;
        var allTasks = $.jStorage.index();
        var allTasksArrayLength = allTasks.length;
        for (var i = 0; i < allTasksArrayLength; i++) {
            if (newTaskNameText == allTasks[i]) {
                duplicate = 1;
            }
        }
        if (duplicate == 0) {
            var longestWordInTaskTitleLength = longestWordLength(newTaskNameText);
            if (longestWordInTaskTitleLength > 30) {
                var $toastContentTooLong = $("<span style='text-align: center; font-size: 135%;'>Please make sure all words are less than 30<br>characters in length</span>");
                Materialize.toast($toastContentTooLong, newNoteStatusAlertTime);
            } else {
                if (Date.parse(newTaskDate)-Date.parse(new Date())<0 && newTaskDate.length != 0 && moment(newTaskDate).isSame(Date.now(), 'day') == false) {
                    var $toastContentDatePassed = $("<span style='text-align: center; font-size: 135%;'>The task's due date must not be in the past</span>");
                    Materialize.toast($toastContentDatePassed, 2000);
                } else {
                    $.jStorage.set(newTaskNameText, newTaskDate);
                    updateTasks();
                    window.setTimeout(hideNewTaskModal, delayAfterClosingModal);
                    var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The task '" + newTaskNameText + "' has been created</span>");
                    Materialize.toast($toastContent, 2000);
                }
            }
        } else {
            var $toastContentNoName = $("<span style='text-align: center; font-size: 135%;'>You already have a note called '" + newTaskNameText + "'</span>");
            Materialize.toast($toastContentNoName, newTaskStatusAlertTime);
        }
    }
}

function discardNewTask() {
    // Variable storing the new note's title
    var newTaskTitleText = document.getElementById("title").value;

    // An if statement if the new note title is empty when user discards the new note
    if (newTaskTitleText.trim().length == 0) {
        updateTasks();
        window.setTimeout(hideNewTaskModal, delayAfterClosingModal);
        var $toastContentEmpty = $("<span style='text-align: center; font-size: 135%;'>An empty task has been discarded</span>");
        Materialize.toast($toastContentEmpty, 2000);
    } else {
        swal({
            title: "Are you sure?",
            text: "You will not be able to retrieve the contents of this task later on!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(){
            updateTasks();
            window.setTimeout(hideNewTaskModal, delayAfterClosingModal);
            var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The task '" + newTaskTitleText + "' has been discarded</span>");
            Materialize.toast($toastContent, 2000);
        });
    }
}

function openTask(title) {
    document.getElementById("editTitle").value = title;
    document.getElementById("datepicker").value = $.jStorage.get(title);

    closeSearchModal();

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
    $('#editTask').css({
        "display": "block"
    });

    $('.todoDueDate').css({
        "display": "block"
    });
    $("#editTitle").focus();
}

function hideEditTaskModal() {
    // Hide the modal
    $('#editTask').css({
        "display": "none"
    });

    $('.todoDueDate').css({
        "display": "none"
    });

    // Unblur the background
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(0px)",
        "-moz-filter": "blur(0px)",
        "-o-filter": "blur(0px)",
        "-ms-filter": "blur(0px)",
        "filter": "blur(0px)"
    });
}

function saveTask() {
    var editTaskCurrentTitle = document.getElementById("editTitle").value;
    var editTaskDueDate = document.getElementById("datepicker").value;

    if (editTaskCurrentTitle.trim().length == 0) { // If task title is empty
        var $toastContentError = $("<span style='text-align: center; font-size: 135%;'>Please create a task with a valid title</span>");
        Materialize.toast($toastContentError, 2000);
    } else {
        chrome.storage.sync.get("editingTaskTitle", function(result) {
            if (!chrome.runtime.error) {
                var originalTaskTitle = result.editingTaskTitle;

                var duplicate = 0;
                var allTasks = $.jStorage.index();
                var allTasksArrayLength = allTasks.length;
                for (var i = 0; i < allTasksArrayLength; i++) {
                    if (editTaskCurrentTitle == allTasks[i]) {
                        if (allTasks[i] != originalTaskTitle) {
                            duplicate = 1;
                        }
                    }
                }

                if (duplicate != 0) {
                    var $toastContentNoName = $("<span style='text-align: center; font-size: 135%;'>You already have a task called '" + editTaskCurrentTitle + "'</span>");
                    Materialize.toast($toastContentNoName, 2000);
                } else {
                    var longestWordInTaskTitleLength = longestWordLength(editTaskCurrentTitle);
                    if (longestWordInTaskTitleLength > 30) {
                        var $toastContentTooLong = $("<span style='text-align: center; font-size: 135%;'>Please make sure all words are less than 30<br>characters in length</span>");
                        Materialize.toast($toastContentTooLong, newNoteStatusAlertTime);
                    } else {
                        $.jStorage.deleteKey(originalTaskTitle);
                        $.jStorage.set(editTaskCurrentTitle, editTaskDueDate);

                        updateTasks();
                        window.setTimeout(hideEditTaskModal, delayAfterClosingModal);
                        var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The task '" + editTaskCurrentTitle + "' has been saved</span>");
                        Materialize.toast($toastContent, 2000);
                    }
                }
            }
        });
    }
}

function dontSaveTask() {
    var taskName = document.getElementById("editTitle").value;

    chrome.storage.sync.get("editingTaskTitle", function (result) {
        if (!chrome.runtime.error) {
            var originalTaskTitle = result.editingTaskTitle;
            if (originalTaskTitle != taskName) {
                swal({
                    title: "Are you sure?",
                    text: "The changes you have made to this task cannot be recovered!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Continue",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function () {
                    updateTasks();
                    window.setTimeout(hideEditTaskModal, delayAfterClosingModal);
                    var $toastContent = $("<span style='text-align: center; font-size: 135%;'>Changes for '" + originalTaskTitle + "' have been discarded</span>");
                    Materialize.toast($toastContent, 2000);
                });
            } else {
                updateTasks();
                window.setTimeout(hideEditTaskModal, delayAfterClosingModal);
            }
        }
    });


    /*
    swal({
        title: "Are you sure?",
        text: "The changes you have made to this task cannot be recovered!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function() {
        chrome.storage.sync.get("editingTaskTitle", function (result) {
            if (!chrome.runtime.error) {
                var originalTaskTitle = result.editingTaskTitle;

                updateTasks();
                window.setTimeout(hideEditTaskModal, delayAfterClosingModal);
                var $toastContent = $("<span style='text-align: center; font-size: 135%;'>Changes for '" + originalTaskTitle + "' have been discarded</span>");
                Materialize.toast($toastContent, 2000);
            }
        });
    });
    */
}

function deleteTask() {
    swal({
        title: "Are you sure?",
        text: "This action cannot be undone, and you will not be able to recover the task!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function() {
        chrome.storage.sync.get("editingTaskTitle", function (result) {
            if (!chrome.runtime.error) {
                var originalTaskTitle = result.editingTaskTitle;
                $.jStorage.deleteKey(originalTaskTitle);

                updateTasks();
                window.setTimeout(hideEditTaskModal, delayAfterClosingModal);
                var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The task '" + originalTaskTitle + "' has been finished</span>");
                Materialize.toast($toastContent, 2000);
            }
        });
    });
}

function openSearchModal() {
    document.getElementById("searchQuery").value = "";

    updateTasks();

    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(5px)",
        "-moz-filter": "blur(5px)",
        "-o-filter": "blur(5px)",
        "-ms-filter": "blur(5px)",
        "filter": "blur(5px)"
    });

    // Show the modal (box where user writes their new note)
    $('#searchTasks').css({
        "display": "block"
    });
    $("#searchQuery").focus();
}

function closeSearchModal() {
    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(0px)",
        "-moz-filter": "blur(0px)",
        "-o-filter": "blur(0px)",
        "-ms-filter": "blur(0px)",
        "filter": "blur(0px)"
    });

    // Show the modal (box where user writes their new note)
    $('#searchTasks').css({
        "display": "none"
    });
}

function updateSearchResults() {

    chrome.storage.sync.get('hideTasksDueDate', function(obj) {
        var yourTasksSearchContent = "";
        var yourTasksSearchContentEmpty = '<p style="text-align: center;">You currently have no tasks. Press the blue button to create one!</p>';
        var numberOfTasksForSearch = 0;
        var searchQueryNotCapitalized = document.getElementById("searchQuery").value;
        var searchQuery = searchQueryNotCapitalized.toUpperCase();
        var allTasks = $.jStorage.index();
        var allTasksArrayLength = allTasks.length;
        var numberOfTasks = 0;
        allTasks = allTasks.reverse();
        for (var i = 0; i < allTasksArrayLength; i++) {
            var dueDate = $.jStorage.get(allTasks[i]);
            var dueDateDiv = "";
            var hideDueDates = obj.hideTasksDueDate;
            if (hideDueDates == "not ") {
                if (dueDate.length != 0) {
                    dueDateDiv = '<div style="position: absolute; right: 10px; top: 0%; transform: translateY(-50%); z-index: 100; color: white; background-color: #D50000; padding: 2px 5px 2px 5px; border-radius: 20px;" id="taskDueDate" class="taskDueDate">' + dueDate + '</div>';
                }
            }
            if (allTasks[i].toUpperCase().indexOf(searchQuery) > -1) {
                var backgroundColor = "white darken-1";
                if (moment(dueDate).isSame(Date.now(), 'day') == true) {
                    backgroundColor = "orange lighten-4";
                } else if (Date.parse(dueDate) - Date.parse(new Date()) < 0 && dueDate.length != 0) {
                    backgroundColor = "red accent-1";
                } else {
                    backgroundColor = "white darken-1";
                }
                    yourTasksSearchContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card ' + backgroundColor + ' singleNote" style="margin-bottom: 0; width: 280px;"><div class="card-content black-text" style="padding-top: 12px; padding-bottom: 12px; z-index: 99;"><p style="font-size: 15px;">' + allTasks[i] + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">check</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i>' + dueDateDiv + '<div></div></div></div></div></div></div></div>';
                    numberOfTasksForSearch += 1;
            }
            numberOfTasks += 1;
        }
        if (numberOfTasksForSearch != 0) {
            $("#searchTasksResult").html(yourTasksSearchContent);
        } else {
            if (numberOfTasks != 0) {
                $("#searchTasksResult").html('<p style="text-align: center;">There are no search results that can be found for \'' + searchQueryNotCapitalized + '\'</p>');
            } else {
                $("#searchTasksResult").html(yourTasksSearchContentEmpty);
            }
        }
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

function hideAllCards() {
    $('.all').css({
        "display": "none"
    });
    $('.overdue').css({
        "display": "none"
    });
    $('.upcoming').css({
        "display": "none"
    });
}

function dayDifference(d1, d2) {
    var m = moment(d1);
    var years = (m.diff(d2, 'years'));
    m.add(-years, 'years');
    var months = (m.diff(d2, 'months'));
    m.add(-months, 'months');
    var days = (m.diff(d2, 'days'));
    var fullDayString = "";
    var daysAgo = "";

    years = years * -1;
    if (years < 0) {
        years = years * -1;
        daysAgo = "ago";
    }
    if (years == 0) {
        years = "";
    } else if (years == 1) {
        years = "1 year ";
    } else {
        years = years + " years "
    }

    months = months * -1;
    if (months < 0) {
        months = months * -1;
        daysAgo = "ago";
    }
    if (months == 0) {
        months = "";
    } else if (months == 1) {
        months = "1 month ";
    } else {
        months = months + " months "
    }

    var wasDateInPast = "no";
    days = days * -1;
    if (days < 0) {
        days = days * -1;
        daysAgo = "ago";
        wasDateInPast = "yes";
    } else if (moment(d2).isSame(Date.now(), 'day') != true) {
        days += 1;
        if (days == 32) {
            days = 0;
            months += 1;
        }
        if (months == 12) {
            months = 1;
            years += 1;
        }
    }
    if (days == 0 && months == 0 && years == 0) {
        days = "Today";
    } else if (days == 0 && months != 0 || days == 0 && years != 0) {
        days = "";
    } else if (days == 1 && months == 0 && years == 0) {
        if (wasDateInPast == "no") {
            days = "Tomorrow";
        } else {
            days = "1 day "
        }
    } else if (days == 1) {
        days = "1 day ";
    } else {
        days = days + " days "
    }

    fullDayString = "Due: " + years + months + days + daysAgo;

    return fullDayString;
}

$(document).on('keypress', function(e) {
    var tag = e.target.tagName.toLowerCase();
    if (tag != 'input' && tag != 'textarea') {
        if (e.which === 110) {
            setTimeout(function () {
                newTask()
            }, 5);
        }
        if (e.which === 115) {
            setTimeout(function () {
                openSearchModal()
            }, 5);
        }
        if (e.which === 111) {
            setTimeout(function () {
                hideAllCards();
                $('.overdue').css({
                    "display": "block"
                });
            }, 5);
        }
        if (e.which === 97) {
            setTimeout(function () {
                hideAllCards();
                $('.all').css({
                    "display": "block"
                });
            }, 5);
        }
        if (e.which === 117) {
            setTimeout(function () {
                hideAllCards();
                $('.upcoming').css({
                    "display": "block"
                });
            }, 5);
        }
        if (e.which === 109) {
            document.getElementById('menu').click();
        }
        if (e.which === 49) {
            window.location = "home.html";
        }
        if (e.which === 51) {
            window.location = "help.html";
        }
        if (e.which === 52) {
            window.location = "settings.html";
        }
    }
});

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var selected = [];
$(document).ready(function() {
    updateTasksFirstTime();
    updateClock();
    setInterval(updateClock, 1000);
    chrome.storage.sync.get('taskSection', function(obj) {
        var taskSection = obj.taskSection;
        hideAllCards();
        if (taskSection == "all") {
            $('.all').css({
                "display": "block"
            });
        } else if (taskSection == "upcoming") {
            $('.upcoming').css({
                "display": "block"
            });
        } else {
            $('.overdue').css({
                "display": "block"
            });
        }
    });
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 5
    });
    $(".allTasks").click(function() {
        hideAllCards();
        $('.all').css({
            "display": "block"
        });
    });
    $(".overdueTasks").click(function() {
        hideAllCards();
        $('.overdue').css({
            "display": "block"
        });
    });
    $(".upcomingTasks").click(function() {
        hideAllCards();
        $('.upcoming').css({
            "display": "block"
        });
    });
    $(".addButton").click(function() {
        $(".normalOptions").css({"display" : "block"});
        $(".selectedOptions").css({"display" : "none"});
        updateTasks();
        selected = [];
        newTask();
    });
    $(".discardNewTask").click(function() {
        discardNewTask();
    });
    $(".createNewTask").click(function() {
        saveNewTask();
    });
    $(".saveTask").click(function() {
        saveTask();
    });
    $(".doNotSave").click(function() {
        dontSaveTask();
    });
    $(".deleteTask").click(function() {
        deleteTask();
    });
    $(".clearAll").click(function() {
        swal({
            title: "Are you sure?",
            text: "This action cannot be undone, and you will not be able to retrieve your tasks!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function() {
            $.jStorage.flush();
            updateTasks();
            var $toastContent = $("<span style='text-align: center; font-size: 135%;'>All tasks have been finished</span>");
            Materialize.toast($toastContent, 2000);
        });
    });
    $(document.body).on('click', '.deleteIcon', function(e) {
        e.stopPropagation();

        var taskTitleValueShortcut = $(this).parent().parent().text().toString();
        taskTitleValueShortcut = taskTitleValueShortcut.substring(0, taskTitleValueShortcut.indexOf('checkstar_border'));

        swal({
            title: "Are you sure?",
            text: "This action cannot be undone, and you will not be able to recover the task!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function() {
            $.jStorage.deleteKey(taskTitleValueShortcut);
            closeSearchModal();
            updateTasks();
            window.setTimeout(hideEditTaskModal, delayAfterClosingModal);
            var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The task '" + taskTitleValueShortcut + "' has been finished</span>");
            Materialize.toast($toastContent, 2000);
        });
    });
    $(document.body).on('click', '.singleNote', function() {
        $(".normalOptions").css({"display" : "block"});
        $(".selectedOptions").css({"display" : "none"});
        updateTasks();
        selected = [];
        var taskTitleValue = $(this).text().toString();
        taskTitleValue = taskTitleValue.substring(0, taskTitleValue.indexOf('checkstar_border'));
        openTask(taskTitleValue);
        chrome.storage.sync.set({
            editingTaskTitle: taskTitleValue
        });
    });
    $(document.body).on('click', '.select', function(e) {
        e.stopPropagation();
        var taskTitleValue = $(this).parent().parent().text().toString().replace("deletestar_border", "");
        if ($(this).css('background-color') == 'rgb(255, 255, 255)'){
            $(this).css('background-color', 'rgb(0, 0, 0)');
            $(this).parent().parent().css({'border': '2px solid black'});
            selected.push(taskTitleValue);
            $('.tasksCardContent').each(function(){
                var otherCards = $(this).text().toString().replace("deletestar_border", "");
                if (otherCards == taskTitleValue) {
                    $(this).find(".select").css({'background-color' : "rgb(0, 0, 0)"});
                    $(this).css({'border': '2px solid black'});
                }
            });
        } else {
            $('.tasksCardContent').each(function(){
                var otherCards = $(this).text().toString().replace("deletestar_border", "");
                if (otherCards == taskTitleValue) {
                    $(this).find(".select").css({'background-color' : "rgb(255, 255, 255)"});
                    $(this).css({'border': '2px solid transparent'});
                }
            });
            $(this).css('background-color', 'rgb(255, 255, 255)');
            $(this).parent().parent().css({'border': '2px solid transparent'});
            selected.remove(taskTitleValue);
        }

        if (selected.length > 0) {
            $(".normalOptions").css({"display" : "none"});
            $(".selectedOptions").css({"display" : "block"});
            document.getElementById("numberOfSelectedItems").innerHTML = selected.length;
        } else {
            $(".normalOptions").css({"display" : "block"});
            $(".selectedOptions").css({"display" : "none"});
            selected = [];
        }
    });
    $(".deleteSelected").click(function() {
        swal({
            title: "Are you sure?",
            text: "This action cannot be undone, and you will not be able to recover the selected notes!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(){
            for (var i = 0; i < selected.length; i++) {
                var selectedValue = selected[i].substring(0, selected[i].indexOf('checkstar_border'));
                $.jStorage.deleteKey(selectedValue);
            }
            $(".normalOptions").css({"display" : "block"});
            $(".selectedOptions").css({"display" : "none"});
            updateTasks();
            selected = [];
        });
    });
    $(document.body).on('mouseenter', '.tasksCardContent', function() {
        $(this).find(".select").css({"display" : "block"});
    });
    $(document.body).on('mouseleave', '.tasksCardContent', function() {
        $(this).find(".select").css({"display" : "none"});
    });
    $(".cancel").click(function() {
        $(".normalOptions").css({"display" : "block"});
        $(".selectedOptions").css({"display" : "none"});
        updateTasks();
        selected = [];
    });
    $(document.body).on('mouseenter', '.taskDueDate', function() {
        var dueDateShown = $(this).text();
        var parsedDueDate = Date.parse(dueDateShown);
        var month = parsedDueDate.getUTCMonth() + 1;
        var day = parsedDueDate.getUTCDate();
        var year = parsedDueDate.getUTCFullYear();
        var fullyParsedDueDate = (year + "-" + month + "-" + day);
        var eventDate = moment(fullyParsedDueDate);
        var today = moment();
        var daysRemaining = eventDate.diff(today, 'days');
        if (Date.parse(fullyParsedDueDate).toString() != Date.today().toString() && daysRemaining <= 0) {
            daysRemaining += 1;
        }

        var daysRemainingTwo = dayDifference(today, fullyParsedDueDate);
        console.log(daysRemainingTwo);

        $.jStorage.set("hdja938263SKFJGHafjhgfdYRWET", dueDateShown);
        $(this).html(daysRemainingTwo);
    });
    $(document.body).on('mouseout', '.taskDueDate', function() {
        var originalDueDate = $.jStorage.get("hdja938263SKFJGHafjhgfdYRWET");
        $(this).html(originalDueDate);
        $.jStorage.deleteKey("hdja938263SKFJGHafjhgfdYRWET");
    });
    $("#search").click(function() {
        openSearchModal();
    });
    $(".closeSearch").click(function() {
        closeSearchModal();
    });
    $("#searchQuery").on("input", function() {
        updateSearchResults();
    });
});