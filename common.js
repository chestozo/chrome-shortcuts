;(function(doc) {

var rInputField = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i;

var postMessage = function(message) {
    var mes = (typeof message === "string")
        ? { message: message }
        : message;
    var port = chrome.extension.connect();
    port.postMessage(mes);
};

// ----------------------------------------------------------------------------------------------------------------- //

var Listener = function(map) {
    this.map = map;
    this.init();
};

// Static method.
Listener.postMessage = postMessage;

// Bind to keypress event.
Listener.prototype.init = function() {
    var that = this;
    doc.addEventListener("keypress", function(evt) {
        if (!that.targetIsValid(evt.target)) {
            return;
        }

        that.listenToKeyboard(evt.charCode || 0);
    }, false);
};

Listener.prototype.targetIsValid = function(target) {
    if (target.nodeName) {
        if (rInputField.test(target.nodeName)) {
            return false;
        }
    }
    return true;
};

Listener.prototype.listenToKeyboard = function(charCode) {
    var message = this.map[charCode];
    if (message) {
        postMessage(message);
    }
};

// Export.
window._______export = {};
window._______export.Listener = Listener;

})(document);
