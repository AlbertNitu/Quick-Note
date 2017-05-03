// Created on January 5th, 2017

var opened = false;
var quickNoteWindow = 0;

function displayOverdueTasks() {
    chrome.storage.sync.get("tasks", function(result) {
        if (!chrome.runtime.error) {
            var allUserTasks = result.tasks;
            var dueDate = [];
            Object.keys(allUserTasks).forEach(function(title) {
                dueDate.push(allUserTasks[title]);
            });
            var overdueTasks = 0;

            var i;
            for (i = 0; i < dueDate.length; i++) {
                var oneDueDate = dueDate[i];
                if (moment(oneDueDate).isSame(Date.now(), 'day') == true) {
                    overdueTasks += 1;
                } else if (Date.parse(oneDueDate) - Date.parse(new Date()) < 0 && oneDueDate.length != 0) {
                    overdueTasks += 1;
                }
            }
            overdueTasks = overdueTasks.toString();
            chrome.browserAction.setBadgeBackgroundColor({color: "#000000"});
            if (overdueTasks != 0) {
                chrome.browserAction.setBadgeText({text: overdueTasks});
            } else {
                chrome.browserAction.setBadgeText({text: ""});
            }
        }
    });
}

function reloadEveryMidnight() {
    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000;
        displayOverdueTasks();
    }
    setTimeout(function(){displayOverdueTasks()}, millisTill10);
}

chrome.browserAction.onClicked.addListener(function() {
    // window.open("deciding.html", "extension_popup", "type=panel, width=366, height=640, status=no, scrollbars=yes, resizable=no");
    /* chrome.windows.create({'url': 'deciding.html', 'type': 'popup'}, function(window) {
    }); */
    if (opened === false) {
        opened = true;
        chrome.windows.create({
                url: "deciding.html",
                type: "panel",
                focused: true,
                width: 366,
                height: 640
            },
            function(window) {quickNoteWindow = window.id}
        )}
    else if (opened === true) {
        chrome.windows.update(quickNoteWindow, {focused: true})
    }
    chrome.windows.onRemoved.addListener(function(windowId) {
        if (windowId == quickNoteWindow) {
            panel = 0;
            opened = false
        }});
    displayOverdueTasks();
});

chrome.storage.onChanged.addListener(function() {
    displayOverdueTasks();
});

chrome.commands.onCommand.addListener(function(command) {
    if (command == "notes") {
        chrome.windows.create({
                url: "home.html",
                type: "panel",
                focused: true,
                width: 366,
                height: 640
            },
            function(window) {quickNoteWindow = window.id}
        )
    } else if (command == "tasks") {
        chrome.windows.create({
                url: "todos.html",
                type: "panel",
                focused: true,
                width: 366,
                height: 640
            },
            function(window) {quickNoteWindow = window.id}
        )
    }
    displayOverdueTasks();
});

displayOverdueTasks();
reloadEveryMidnight();