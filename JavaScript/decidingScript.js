// Created on January 5th, 2017

function goToDefaultPage() {
    chrome.storage.sync.get('defaultPage', function(obj) {
        var defaultPage = obj.defaultPage;
        if (defaultPage == "task") {
            window.location = "todos.html";
        } else {
            window.location = "home.html";
        }
    });
}

$(document).ready(function() {
    chrome.storage.sync.get('firstTime', function(obj) {
        var userFirstTime = obj.firstTime;
        if (userFirstTime != "false") {
            chrome.storage.sync.set({
                'firstTime': "false"
            }, function() {
                chrome.storage.sync.set({
                    'hideTasksDueDate': "not "
                }, function() {
                    chrome.storage.sync.set({
                        'notes': ""
                    }, function() {
                        chrome.storage.sync.set({
                            'tasks': ""
                        }, function() {
                            chrome.storage.sync.set({
                                'taskSection': "all"
                            }, function() {
                                window.location = "welcome.html"
                            });
                        });
                    });
                });
            });
        } else {
            goToDefaultPage();
        }
    });
});