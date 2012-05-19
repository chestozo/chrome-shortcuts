;(function() {

var Listener = window._______export.Listener;

// 51 == #
// 67 == c
// 70 == f
// 82 == r
var yaMailListener = new Listener().init({
    '51': 'mail:remove',
    '67': 'mail:compose',
    '70': 'mail:flag',
    '82': 'mail:read'
});

}());