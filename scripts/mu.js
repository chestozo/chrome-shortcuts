;(function() {

var Listener = window._______export.Listener;

// 190 == .
var muListener = new Listener().init({
    '190': 'mu:login:open'
});

// Send signal to set focus on auth link.
setTimeout(function() { Listener.postMessage("mu:login:open"); }, 1000);

}());