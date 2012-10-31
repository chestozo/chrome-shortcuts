(function(){

var createClickScript = function(selector) {
    return "" +
        "var customEvent = document.createEvent('MouseEvent');" +
        "customEvent.initMouseEvent('click', true, true, null, null, 1, 1, 1, 1, false, false, false, false, 0);" +
        "(!!window.jQuery ? jQuery('" + selector + "')[0] : document.querySelector('" + selector + "')).dispatchEvent(customEvent);";
};

var toggleTabPinned = function() {
    // Get tab not only for id, but for pinned state too.
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.update(tab.id, { pinned: !tab.pinned });
    });
};

// If value is string: it is a selector and we execute click on that element within a page.
// If value is a function: we execute it in background page context.
var map = {
    // chrome.js: global chrome shortcuts
    'chrome:tab:pin:toggle': toggleTabPinned,

    // mu.js
    'mu:login:open': '.js-login-form_open',

    // grooveshark
    'grove:next': '#player_next',
    'grove:prev': '#player_previous',

    // ya.mail
    'mail:remove':      '.b-toolbar__item_delete',
    'mail:compose':     '.b-toolbar__item_compose',
    'mail:flag':        '.b-message-subject .b-ico_importance:visible',
    'mail:read':        '.b-toolbar__item_mark-as-read:visible, .b-toolbar__item_mark-as-unread:visible',
    'mail:select:all':  '.b-messages-head__checkbox:visible',
    'mail:thread:prev': '.b-grid-item_current:visible\').next(\'.b-grid-item_table:visible', // HACK!
    'mail:thread:next': '.b-grid-item_current:visible\').prev(\'.b-grid-item_table:visible', // HACK!
    'mail:goto:inbox':  '.b-folders__folder:visible:first a',
    'mail:archive':     '.daria-action[title=archive][data-action=move]',
    'mail:markAs:done': '.unlabel-2080000000204310141:not(.g-hidden) .daria-action, .label-2080000000204310141:not(.g-hidden) .daria-action', // This same selector is used to mark and unmark letter.

    // jira
    'jira:ticket:edit':    '#editIssue',
    'jira:ticket:resolve': '#action_id_11',
    'jira:enter':          '#issue-workflow-transition-submit,#issue-comment-add-submit',
    'jira:cancel':         '.cancel:not(#issue-comment-add-cancel)'
};

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message, port) {
        if (!message) {
            return;
        }

        var action = map[message.message];
        if (!action) {
            return;
        }

        if (typeof action === 'function') {
            action.call(null);
        } else {
            chrome.tabs.executeScript(null, {
                code: createClickScript(action)
            });
        }
    });
});

}());
