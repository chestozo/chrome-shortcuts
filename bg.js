(function(){

var createClickScript = function(selector) {
    return "" +
        "var customEvent = document.createEvent('MouseEvent');" +
        "customEvent.initMouseEvent('click', true, true, null, null, 1, 1, 1, 1, false, false, false, false, 0);" +
        "document.querySelector('" + selector + "').dispatchEvent(customEvent);";
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
    'mail:remove':  '.b-toolbar__item_delete',
    'mail:compose': '.b-toolbar__item_compose',
    'mail:flag':    '.b-message-subject .b-ico_importance',
    'mail:read':    '.b-toolbar__item_mark-as-read:not(.g-hidden), .b-toolbar__item_mark-as-unread:not(.g-hidden)',

    // jira
    'jira:ticket:edit': '#editIssue',
    'jira:ticket:resolve': '#action_id_11',
    'jira:enter': '#issue-workflow-transition-submit',
    'jira:cancel': '.cancel:not(#issue-comment-add-cancel)'
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