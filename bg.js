(function(){

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message, port) {
        // keys.js
        if (message && message.message === "pin-toggle") {
            // pin / unpin tab
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.update(tab.id, { pinned: !tab.pinned })
            });
        }

        // mu.js
        if (message && message.message === "login:open") {
            chrome.tabs.executeScript(null, {
                code: "var customEvent = document.createEvent('Event');customEvent.initEvent('click', true, true);document.querySelector('.js-login-form_open').dispatchEvent(customEvent);"
            });
        }
    });
});

})(document, window);
