;(function(doc) {

var rInputField = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i;

var postMessage = function(message) {
    var mes = (typeof message === "string")
        ? { message: message }
        : message;
    var port = chrome.extension.connect();
    port.postMessage(mes);
};

var targetIsValid = function(evt) {
    var target = evt.target;

    if (!evt.metaKey) { // cmd key must be pressed
        return false;
    }

    if (target.nodeName) {
        if (rInputField.test(target.nodeName)) {
            return false;
        }
    }

    return true;
};

var listenToKeyboard = function(keyCode) {
    switch (keyCode) {
        case 74: // 'j'
            postMessage("grove:next");
            break;
        case 75: // 'k'
            postMessage("grove:prev");
            break;
    }
};

// Bind to keypress event.
doc.addEventListener("keydown", function(evt) {
    if (!targetIsValid(evt)) {
        return;
    }

    listenToKeyboard(evt.which);
}, false);

})(document);
