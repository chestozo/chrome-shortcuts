;(function(doc) {

var rInputField = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i;

var targetIsValid = function(target) {
    if (target.nodeName) {
        if (rInputField.test(target.nodeName)) {
            return false;
        }
    }
    return true;
};

var listenToKeyboard = function(charCode) {
    switch (charCode) {
        case 46:
            var port = chrome.extension.connect();
            port.postMessage({ message: "login:open" });
            break;
    }
};

// Bind to keypress event.
doc.addEventListener("keypress", function(evt) {
    if (!targetIsValid(evt.target)) {
        return;
    }

    listenToKeyboard(evt.charCode || 0);
}, false);

})(document);
