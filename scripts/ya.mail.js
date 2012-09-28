;(function() {

var Listener = window._______export.Listener;

// 51 == 3(#)
// 67 == c
// 70 == f
// 82 == r
// 69 == e
// 56 == 8(*)
// 74 == j
// 75 == k
// 73 == i
var yaMailListener = new Listener().init({
    '51': { shift: true, message: 'mail:remove' },
    '67': 'mail:compose',
    '70': 'mail:flag',
    '82': 'mail:read',
    '69': 'mail:archive',
    '56': { shift: true, message: 'mail:select:all' },
    '74': 'mail:thread:prev',
    '75': 'mail:thread:next',
    '73': 'mail:goto:inbox'
});

}());
