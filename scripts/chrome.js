;(function() {

var Listener = window._______export.Listener;

// 80 == p
var chromeListener = new Listener().init({
    '80': { meta: true, message: 'chrome:tab:pin:toggle' }
});

}());