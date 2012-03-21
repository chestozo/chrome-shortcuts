(function(doc, win){

var processKey = function(evt) {
    if (evt.metaKey && evt.which == 80) {
        // Send message to pin / unpin.
        var port = chrome.extension.connect();
        port.postMessage({ message: "pin-toggle" });
        
        evt.preventDefault(); // prevent print dialog
    }
    else if (evt.metaKey && evt.shiftKey && evt.which == 37) { // left
    }
    else if (evt.metaKey && evt.shiftKey && evt.which == 39) { // right
    }
};

doc.addEventListener("keydown", processKey, false);

})(document, window);