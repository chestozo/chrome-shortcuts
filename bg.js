(function(){

var clickOn = function(selector) {
    return "var customEvent = document.createEvent('MouseEvent'); \
            customEvent.initMouseEvent('click', true, true, null, null, 1, 1, 1, 1, false, false, false, false, 0); \
            document.querySelector('" + selector + "').dispatchEvent(customEvent);";
};

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message, port) {
        if (!message) {
            return;
        }

        // keys.js
        if (message.message === "pin-toggle") {
            // pin / unpin tab
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.update(tab.id, { pinned: !tab.pinned })
            });
        }

        // mu.js
        if (message.message === "login:open") {
            chrome.tabs.executeScript(null, {
                code: clickOn('.js-login-form_open')
            });
        }

        // grooveshark
        if (message.message === "grove:next") {
            chrome.tabs.executeScript(null, {
                code: clickOn('#player_next')
            });
        } else
        if (message.message === "grove:prev") {
            chrome.tabs.executeScript(null, {
                code: clickOn('#player_previous')
            });
        }
    });
});

})(document, window);
