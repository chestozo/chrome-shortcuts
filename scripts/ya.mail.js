;(function() {

var Listener = window._______export.Listener;

// 51 == 3(#)
// 67 == c
// 70 == f
// 82 == r
// 69 == e
// 56 == 8(*)
var yaMailListener = new Listener().init({
    '51': { shift: true, message: 'mail:remove' },
    '67': 'mail:compose',
    '70': 'mail:flag',
    '82': 'mail:read',
    '69': 'mail:archive',
    '56': { shift: true, message: 'mail:select:all' }
});

}());
