(function(doc, win){

var processKey = function(evt) {
    if (evt.metaKey && evt.which == 80) {
        // Send message to pin / unpin.
        var port = chrome.extension.connect();
        port.postMessage({ message: "chrome:tab:pin:toggle" });

        evt.preventDefault(); // prevent print dialog
    }
};

doc.addEventListener("keydown", processKey, false);

})(document, window);
