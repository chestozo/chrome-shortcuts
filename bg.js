(function(){

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message, port) {
        if (message && message.message === "pin-toggle") {
            // pin / unpin tab
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.update(tab.id, { pinned: !tab.pinned })
            });
        }
    });
});

})(document, window);
