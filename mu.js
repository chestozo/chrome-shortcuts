;(function(doc) {

var rInputField = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i;

var postMessage = function(message) {
    var mes = (typeof message === "string")
        ? { message: message }
        : message;
    var port = chrome.extension.connect();
    port.postMessage(mes);
};

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
            postMessage("login:open");
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

// Send signal to set focus on auth link.
setTimeout(function() { postMessage("login:open"); }, 1000);

})(document);
