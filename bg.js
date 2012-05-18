(function(){

var clickOn = function(selector) {
    return "var customEvent = document.createEvent('MouseEvent'); \
            customEvent.initMouseEvent('click', true, true, null, null, 1, 1, 1, 1, false, false, false, false, 0); \
            document.querySelector('" + selector + "').dispatchEvent(customEvent);";
};

var map = {
    // mu.js
    'mu:login:open': '.js-login-form_open',

    // grooveshark
    'grove:next': '#player_next',
    'grove:prev': '#player_previous',

    // ya.mail
    'mail:remove':  '.b-toolbar__item_delete',
    'mail:compose': '.b-toolbar__item_compose',
    'mail:flag':    '.b-message-subject .b-ico_importance'
};

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message, port) {
        if (!message) {
            return;
        }

        // keys.js
        // Global events.
        if (message.message === "pin-toggle") {
            // pin / unpin tab
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.update(tab.id, { pinned: !tab.pinned });
            });
        }

        // Custom sites events.
        var clickTargetSelector = map[message.message];
        if (clickTargetSelector) {
            chrome.tabs.executeScript(null, {
                code: clickOn(clickTargetSelector)
            });
        }
    });
});

})(document, window);
