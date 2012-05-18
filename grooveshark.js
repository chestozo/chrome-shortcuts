;(function() {

var Listener = window._______export.Listener;

var GrooveListener = function() {};

GrooveListener.prototype = new Listener();

GrooveListener.prototype.targetIsValid = function(evt) {
    var target = evt.target;

    if (!evt.metaKey) { // cmd key must be pressed
        return false;
    }

    // Call base check.
    return Listener.prototype.targetIsValid.call(this, evt);
};

// ----------------------------------------------------------------------------------------------------------------- //

// 74 == j
// 75 == k
var grooveListener = new GrooveListener().init({
    '74': 'grove:next',
    '75': 'grove:prev'
});

}());
