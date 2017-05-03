// Created on January 5th, 2017

function newNote() {
    // Set the values for the title and note content boxes (in the modal) to empty
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

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
    $('#newNote').css({
        "display": "block"
    });
    $("#title").focus();
}

function openNote(title, content) {
    // Set the values for the title and note content boxes (in the modal) to the title and content of the selected note
    document.getElementById("titleEditNote").value = title;
    document.getElementById("contentEditNote").value = content;

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
    $('#editNote').css({
        "display": "block"
    });
    $("#titleEditNote").focus();
}

// Function that hides the new note modal (and unblurs background)
function hideNewNoteModal() {
    // Hide the modal
    $('#newNote').css({
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

function hideEditNoteModal() {
    // Hide the modal
    $('#editNote').css({
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

// Variable (in milliseconds) of the amount of delay to do before closing the modal (to allow the user to see the colorful button "waves")
var delayAfterClosingModal = 300;
// Variable (in milliseconds) of the amount of time the "alert" that notifies user about the new note status stays visible
newNoteStatusAlertTime = 2000;

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

// Function that saves the new note that the user created. It stores the note's title and content in the Chrome Extension storage.
function saveNewNote() {
    // Variable storing the new note's title
    var newNoteTitleText = document.getElementById("title").value;
    // Variable storing the new note's content
    var newNoteContentText = document.getElementById("content").value;

    // An if statement if the new note title is empty when user creates the new note
    if (newNoteTitleText.trim().length == 0) { // If new note title is empty
        var $toastContentError = $("<span style='text-align: center; font-size: 135%;'>Please create a note with a valid title</span>");
        Materialize.toast($toastContentError, newNoteStatusAlertTime);
    } else { // If new note title isn't empty
        var duplicate = 0;
        store.forEach(function(key, val) {
            if (key == newNoteTitleText) {
                duplicate = 1;
            }
        });
        if (duplicate == 0) {
            var longestWordInNoteTitleLength = longestWordLength(newNoteTitleText);
            if (longestWordInNoteTitleLength > 30) {
                var $toastContentTooLong = $("<span style='text-align: center; font-size: 135%;'>Please make sure all words are less than 30<br>characters in length</span>");
                Materialize.toast($toastContentTooLong, newNoteStatusAlertTime);
            } else {
                store.set(newNoteTitleText, newNoteContentText);
                updateNotes();
                window.setTimeout(hideNewNoteModal, delayAfterClosingModal);
                var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The note '" + newNoteTitleText + "' has been created</span>");
                Materialize.toast($toastContent, newNoteStatusAlertTime);
            }
        } else {
            var $toastContentNoName = $("<span style='text-align: center; font-size: 135%;'>You already have a note called '" + newNoteTitleText + "'</span>");
            Materialize.toast($toastContentNoName, newNoteStatusAlertTime);
        }
    }
}

function saveNote() {
    var editNoteCurrentTitle = document.getElementById("titleEditNote").value;
    var editNoteCurrentContent = document.getElementById("contentEditNote").value;

    if (editNoteCurrentTitle.trim().length == 0) { // If new note title is empty
        var $toastContentError = $("<span style='text-align: center; font-size: 135%;'>Please create a note with a valid title</span>");
        Materialize.toast($toastContentError, newNoteStatusAlertTime);
    } else {
        chrome.storage.sync.get("editingNoteTitle", function(result) {
            if (!chrome.runtime.error) {
                var originalNoteTitle = result.editingNoteTitle;

                var duplicate = 0;
                store.forEach(function(key, val) {
                    if (key == editNoteCurrentTitle) {
                        if (key != originalNoteTitle) {
                            duplicate = 1;
                        }
                    }
                });
                if (duplicate != 0) {
                    var $toastContentNoName = $("<span style='text-align: center; font-size: 135%;'>You already have a note called '" + editNoteCurrentTitle + "'</span>");
                    Materialize.toast($toastContentNoName, newNoteStatusAlertTime);
                } else {
                    var longestWordInNoteTitleLength = longestWordLength(editNoteCurrentTitle);
                    if (longestWordInNoteTitleLength > 30) {
                        var $toastContentTooLong = $("<span style='text-align: center; font-size: 135%;'>Please make sure all words are less than 30<br>characters in length</span>");
                        Materialize.toast($toastContentTooLong, newNoteStatusAlertTime);
                    } else {
                        store.remove(originalNoteTitle);
                        store.set(editNoteCurrentTitle, editNoteCurrentContent);

                        updateNotes();
                        window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
                        var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The note '" + editNoteCurrentTitle + "' has been saved</span>");
                        Materialize.toast($toastContent, newNoteStatusAlertTime);
                    }
                }
            }
        });
    }
}

function discardNewNote() {
    // Variable storing the new note's title
    var newNoteTitleText = document.getElementById("title").value;
    var newNoteContentText = document.getElementById("content").value;

    // An if statement if the new note title is empty when user discards the new note
    if (newNoteTitleText.trim().length == 0 && newNoteContentText.trim().length == 0) {
        updateNotes();
        window.setTimeout(hideNewNoteModal, delayAfterClosingModal);
        var $toastContentEmpty = $("<span style='text-align: center; font-size: 135%;'>An empty note has been discarded</span>");
        Materialize.toast($toastContentEmpty, newNoteStatusAlertTime);
    } else {
        swal({
            title: "Are you sure?",
            text: "You will not be able to retrieve the contents of this note later on!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(){
            updateNotes();
            window.setTimeout(hideNewNoteModal, delayAfterClosingModal);
            var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The note '" + newNoteTitleText + "' has been discarded</span>");
            Materialize.toast($toastContent, newNoteStatusAlertTime);
        });
    }
}

function dontSaveNote() {
    var noteTitle = document.getElementById("titleEditNote").value;
    var noteContent = document.getElementById("contentEditNote").value;

    chrome.storage.sync.get("editingNoteTitle", function(result) {
        if (!chrome.runtime.error) {
            var originalNoteTitle = result.editingNoteTitle;
            if (originalNoteTitle != noteTitle) {
                swal({
                    title: "Are you sure?",
                    text: "The changes you have made to this note cannot be recovered!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Continue",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function(){
                        updateNotes();
                        window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
                        var $toastContent = $("<span style='text-align: center; font-size: 135%;'>Changes for '" + originalNoteTitle + "' have been discarded</span>");
                        Materialize.toast($toastContent, newNoteStatusAlertTime);
                });
            } else {
                chrome.storage.sync.get("editingNoteContent", function(result2) {
                    if (!chrome.runtime.error) {
                        var originalNoteContent = result2.editingNoteContent;
                        if (originalNoteContent != noteContent) {
                            swal({
                                    title: "Are you sure?",
                                    text: "The changes you have made to this note cannot be recovered!",
                                    type: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Continue",
                                    cancelButtonText: "Cancel",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                                },
                                function(){
                                    updateNotes();
                                    window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
                                    var $toastContent = $("<span style='text-align: center; font-size: 135%;'>Changes for '" + originalNoteTitle + "' have been discarded</span>");
                                    Materialize.toast($toastContent, newNoteStatusAlertTime);
                                });
                        } else {
                            updateNotes();
                            window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
                        }
                    }
                });
            }
        }
    });
    /*
    swal({
        title: "Are you sure?",
        text: "The changes you have made to this note cannot be recovered!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(){
        chrome.storage.sync.get("editingNoteTitle", function(result) {
            if (!chrome.runtime.error) {
                var originalNoteTitle = result.editingNoteTitle;

                updateNotes();
                window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
                var $toastContent = $("<span style='text-align: center; font-size: 135%;'>Changes for '" + originalNoteTitle + "' have been discarded</span>");
                Materialize.toast($toastContent, newNoteStatusAlertTime);
            }
        });
    });
    */
}

function deleteNote() {

    swal({
        title: "Are you sure?",
        text: "This action cannot be undone, and you will not be able to recover the note!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(){
        chrome.storage.sync.get("editingNoteTitle", function(result) {
            if (!chrome.runtime.error) {
                var originalNoteTitle = result.editingNoteTitle;
                store.remove(originalNoteTitle);

                updateNotes();
                window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
                var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The note '" + originalNoteTitle + "' has been deleted</span>");
                Materialize.toast($toastContent, newNoteStatusAlertTime);
            }
        });
    });

}

function updateNotes() {

    var yourNotesContent = "";
    var yourNotesContentEmpty = '<img src="Images/sun.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="text-align: center; font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif">You don\'t have any notes... Yet! To add notes, press the plus button above.</p>';
    var numberOfNotes = 0;
    var allNotes = {};
    store.forEach(function(key, val) {
        if (key != "jStorage" && key != "jStorage_update") {
            yourNotesContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="notesCardContent card-content black-text" style="padding-top: 12px; padding-bottom: 12px; z-index: 99; text-overflow: clip; border: 2px solid transparent; border-radius: 2px;"><p style="font-size: 15px;">' + key + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">delete</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div></div></div></div></div></div></div>';
            numberOfNotes += 1;
            allNotes[key] = val;
        }
    });
    chrome.storage.sync.set({
        'notes': allNotes
    }, function() {
    });
    if (numberOfNotes != 0) {
        $("#userNotesCard").html(yourNotesContent);
        $("#searchNotesResult").html(yourNotesContent);
    } else {
        $("#userNotesCard").html(yourNotesContentEmpty);
        $("#searchNotesResult").html('<p style="text-align: center;">You currently have no notes. Press the red button to create one!</p>');
    }
}

function updateNotesFirstTime() {

    var keysForNotes = [];
    store.forEach(function(key, val) {
        if (key != "jStorage" && key != "jStorage_update") {
            keysForNotes.push(key);
        }
    });
    var notesArrayLength = keysForNotes.length;
    for (var i = 0; i < notesArrayLength; i++) {
        store.remove(keysForNotes[i]);
    }

    chrome.storage.sync.get("notes", function(result) {
        if (!chrome.runtime.error) {
            var allUserNotes = result.notes;
            Object.keys(allUserNotes).forEach(function(title) {
                var content = allUserNotes[title];
                store.set(title, content);
            });

            var yourNotesContent = "";
            var yourNotesContentEmpty = '<img src="Images/sun.png" width="150px" height="150px" style="display: block; margin: 0 auto;"><br><br><p style="text-align: center; font-size: 15px; padding-bottom: 20px; font-family: \'Raleway\', sans-serif">You don\'t have any notes... Yet! To add notes, press the plus button above.</p>';
            var numberOfNotes = 0;
            store.forEach(function(key, val) {
                if (key != "jStorage" && key != "jStorage_update") {
                    yourNotesContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote" style="margin-bottom: 0; width: 280px;"><div class="notesCardContent card-content black-text" style="padding-top: 12px; padding-bottom: 12px; z-index: 99; text-overflow: clip; border: 2px solid transparent; border-radius: 2px;"><p style="font-size: 15px;">' + key + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">delete</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i><div class="select pointer" style="width: 15px; height: 15px; background-color: white; border-radius: 50px; border: 2px solid black; position: absolute; left: -7px; top: 50%; transform: translateY(-50%); z-index: 100;"></div></div></div></div></div></div></div>';
                    numberOfNotes += 1;
                    console.log(key + "\n" + val);
                }
            });
            if (numberOfNotes != 0) {
                $("#userNotesCard").html(yourNotesContent);
                $("#searchNotesResult").html(yourNotesContent);
            } else {
                $("#userNotesCard").html(yourNotesContentEmpty);
                $("#searchNotesResult").html('<p style="text-align: center;">You currently have no notes. Press the red button to create one!</p>');
            }
        }
    });
}

function deleteAllNotes() {
    swal({
            title: "Are you sure?",
            text: "This action cannot be undone, and you will not be able to retrieve your notes!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(){
            var keysForNotes = [];
            store.forEach(function(key, val) {
                if (key != "jStorage" && key != "jStorage_update") {
                    keysForNotes.push(key);
                }
            });
            console.log(keysForNotes);
            var notesArrayLength = keysForNotes.length;
            for (var i = 0; i < notesArrayLength; i++) {
                store.remove(keysForNotes[i]);
            }
            updateNotes();
            var $toastContent = $("<span style='text-align: center; font-size: 135%;'>All notes have been deleted</span>");
            Materialize.toast($toastContent, 2000);
        });
}

function openSearchModal() {
    document.getElementById("searchQuery").value = "";

    updateNotes();

    $('.blurredContent').css({
        "transition": "1s",
        "-webkit-filter": "blur(5px)",
        "-moz-filter": "blur(5px)",
        "-o-filter": "blur(5px)",
        "-ms-filter": "blur(5px)",
        "filter": "blur(5px)"
    });

    // Show the modal (box where user writes their new note)
    $('#searchNotes').css({
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
    $('#searchNotes').css({
        "display": "none"
    });
}

function updateSearchResults() {

    var yourNotesSearchContent = "";
    var yourNotesSearchContentEmpty = '<p style="text-align: center;">You currently have no notes. Press the red button to create one!</p>';
    var numberOfNotesForSearch = 0;
    var searchQueryNotCapitalized = document.getElementById("searchQuery").value;
    var searchQuery = searchQueryNotCapitalized.toUpperCase();

    store.forEach(function(key, val) {
        if (key != "jStorage" && key != "jStorage_update") {
            if (key.toUpperCase().indexOf(searchQuery) > -1) {
                yourNotesSearchContent += '<div class="yourNotes"><div class="row" style="margin-bottom: 10px;"><div class="col s12 m16"><div id="singleNote" class="card white darken-1 singleNote singleSearchNote" style="margin-bottom: 0px; width: 280px;"><div class="card-content black-text" style="padding-top: 12px; padding-bottom: 12px; z-index: 99; text-overflow: ellipsis;"><p style="font-size: 15px;">' + key + '</p><div style="z-index: 100;" class="quickCommands"><i class="material-icons deleteIcon deleteSearchIcon" style="position: absolute; right: 14px; top: 40%; transform: translateY(-50%); z-index: 100;">delete</i><i style="position: absolute; right: 51px; top: 40%; transform: translateY(-50%); z-index: 100; visibility: hidden;">star_border</i></div></div></div></div></div></div>';
                numberOfNotesForSearch += 1;
            }
        }
    });
    if (numberOfNotesForSearch != 0) {
        $("#searchNotesResult").html(yourNotesSearchContent);
    } else {
        var numberOfNotes = 0;
        store.forEach(function(key, val) {
            numberOfNotes += 1;
        });
        if (numberOfNotes != 0) {
            $("#searchNotesResult").html('<p style="text-align: center;">There are no search results that can be found for \'' + searchQueryNotCapitalized + '\'</p>');
        } else {
            $("#searchNotesResult").html(yourNotesSearchContentEmpty);
        }
    }
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
    if (tag != 'input' && tag != 'textarea') {
        if (e.which === 110) {
            setTimeout(function () {
                newNote()
            }, 5);
        }
        if (e.which === 115) {
            setTimeout(function () {
                openSearchModal()
            }, 5);
        }
        if (e.which === 109) {
            document.getElementById('menu').click();
        }
        if (e.which === 50) {
            window.location = "todos.html";
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

$(document).ready(function() {
    updateNotesFirstTime();
    updateClock();
    setInterval(updateClock, 1000);
    $(".addButton").click(function() {
        newNote();
    });
    $(".createNewNote").click(function() {
        saveNewNote();
    });
    $(".discardNewNote").click(function() {
        discardNewNote();
    });
    $(".saveNote").click(function() {
        saveNote();
    });
    $(".doNotSave").click(function() {
        dontSaveNote();
    });
    $(".deleteNote").click(function() {
        deleteNote();
    });
    $(".clearAll").click(function() {
        deleteAllNotes();
    });
    $(document.body).on('click', '.deleteIcon', function(e) {
        e.stopPropagation();

        var noteTitleValueShortcut = $(this).parent().parent().text().toString().replace("deletestar_border", "");

        swal({
            title: "Are you sure?",
            text: "This action cannot be undone, and you will not be able to recover the note!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(){
            store.remove(noteTitleValueShortcut);

            updateNotes();
            closeSearchModal();
            window.setTimeout(hideEditNoteModal, delayAfterClosingModal);
            var $toastContent = $("<span style='text-align: center; font-size: 135%;'>The note '" + noteTitleValueShortcut + "' has been deleted</span>");
            Materialize.toast($toastContent, newNoteStatusAlertTime);
        });
    });
    $(document.body).on('click', '.singleNote', function() {
        var noteTitleValue = $(this).text().toString().replace("deletestar_border", "");
        var noteContentValue = store.get(noteTitleValue);
        openNote(noteTitleValue, noteContentValue);
        chrome.storage.sync.set({
            editingNoteTitle: noteTitleValue,
            editingNoteContent: noteContentValue
        });
    });
    var selected = [];
    $(document.body).on('click', '.select', function(e) {
        e.stopPropagation();
        var noteTitleValue = $(this).parent().parent().text().toString().replace("deletestar_border", "");
        if ($(this).css('background-color') == 'rgb(255, 255, 255)'){
            $(this).css('background-color', 'rgb(0, 0, 0)');
            $(this).parent().parent().css({'border': '2px solid black'});
            selected.push(noteTitleValue);
        } else {
            $(this).css('background-color', 'rgb(255, 255, 255)');
            $(this).parent().parent().css({'border': '2px solid transparent'});
            selected.remove(noteTitleValue);
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
                store.remove(selected[i]);
            }
            $(".normalOptions").css({"display" : "block"});
            $(".selectedOptions").css({"display" : "none"});
            updateNotes();
            selected = [];
        });
    });
    $(document.body).on('mouseenter', '.notesCardContent', function() {
        $(this).find(".select").css({"display" : "block"});
    });
    $(document.body).on('mouseleave', '.notesCardContent', function() {
        $(this).find(".select").css({"display" : "none"});
    });
    $(".cancel").click(function() {
        $(".normalOptions").css({"display" : "block"});
        $(".selectedOptions").css({"display" : "none"});
        updateNotes();
        selected = [];
    });
    $("#search").click(function() {
        openSearchModal();
    });
    $(".closeSearch").click(function() {
        closeSearchModal();
    });
    $("#searchQuery").on("input", function() {
        updateSearchResults();
    })
});