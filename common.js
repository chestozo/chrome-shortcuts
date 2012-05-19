;(function() {

var postMessage = function(message) {
    var mes = (typeof message === "string") ? { message: message } : message;
    var port = chrome.extension.connect();
    port.postMessage(mes);
};

// ----------------------------------------------------------------------------------------------------------------- //

var Listener = function(rInput) {
    this.rInput = rInput || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i;
};

// Static method.
Listener.postMessage = postMessage;

// Bind to keydown event.
Listener.prototype.init = function(map) {
    var that = this;

    this.map = map;

    document.addEventListener("keydown", function(evt) {
        if (!that.targetIsValid(evt)) {
            return;
        }

        if (that.handleShortcut(evt)) {
            // prevent default action. For example it will prevent standart Chrome print dialog.
            evt.preventDefault();
            evt.stopPropagation();
        }
    }, false);

    return this;
};

// Если кнопка нажата в поле ввода - не пытаемся обработать shortcut.
Listener.prototype.targetIsValid = function(evt) {
    var target = evt.target;

    if (target.nodeName) {
        if (this.rInput.test(target.nodeName)) {
            return false;
        }
    }

    return true;
};

/**
 *
 * @param evt keydown event instance.
 * @return {Boolean} true in case shortcut was triggered.
 */
Listener.prototype.handleShortcut = function(evt) {
    var which = evt.which || 0;
    var message = this.map[which];
    if (message) {
        // Normalize message to object if string is specified.
        if (typeof message === 'string') {
            message = { message: message };
        }

        // Checks for special keys.
        // NOTE: if special key is not mandatory, but it was pressend - check fails.
        var checked =
            ((!message.meta && !evt.metaKey) || (message.meta && evt.metaKey)) &&
            ((!message.shift && !evt.shiftKey) || (message.shift && evt.shiftKey)) &&
            ((!message.ctrl && !evt.ctrlKey) || (message.ctrl && evt.ctrlKey));

        if (checked) {
            postMessage(message.message);
            return true;
        }
    }
};

// Export.
window._______export = {};
window._______export.Listener = Listener;

}());
