;(function() {

var rInputField = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i;

var postMessage = function(message) {
    var mes = (typeof message === "string")
        ? { message: message }
        : message;
    var port = chrome.extension.connect();
    port.postMessage(mes);
};

// ----------------------------------------------------------------------------------------------------------------- //

var Listener = function() {};

// Static method.
Listener.postMessage = postMessage;

// Bind to keypress event.
Listener.prototype.init = function(map) {
    var that = this;

    this.map = map;

    document.addEventListener("keydown", function(evt) {
        if (!that.targetIsValid(evt)) {
            return;
        }

        that.listenToKeyboard(evt.which || 0);
    }, false);

    return this;
};

Listener.prototype.targetIsValid = function(evt) {
    var target = evt.target;
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

}());
