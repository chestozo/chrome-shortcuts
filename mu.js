;(function(doc) {

var Listener = window._______export.Listener;

// 46 == .
var muListener = new Listener({
    '46': 'login:open'
});

// Send signal to set focus on auth link.
setTimeout(function() { Listener.postMessage("login:open"); }, 1000);

})(document);
