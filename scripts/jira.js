;(function() {

var Listener = window._______export.Listener;

// 82 == r
// 13 == Enter
// 90 == z
var jiraListener = new Listener(/^(INPUT|BUTTON)$/i).init({
    '82': { shift: true, meta: true, message: 'jira:ticket:resolve' },
    '13': { meta: true, message: 'jira:enter' },
    '90': { ctrl: true, message: 'jira:cancel' }
});

}());
