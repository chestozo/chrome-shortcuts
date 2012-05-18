;(function() {

var Listener = window._______export.Listener;

// 190 == .
var muListener = new Listener().init({
    '190': 'login:open'
});

// Send signal to set focus on auth link.
setTimeout(function() { Listener.postMessage("login:open"); }, 1000);

}());
