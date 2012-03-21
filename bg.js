(function(){

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
                code: "var customEvent = document.createEvent('MouseEvent'); \
                       customEvent.initMouseEvent('click', true, true, null, null, 1, 1, 1, 1, false, false, false, false, 0); \
                       document.querySelector('.js-login-form_open').dispatchEvent(customEvent);"
            });
        }
    });
});

})(document, window);
