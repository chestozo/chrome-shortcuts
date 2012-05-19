# Chrome-shortcuts
Chrome extension with usefull keyboard navigation shortcuts that I use.

### Add another site support
1. You need to specify site mask in the `manifest.json` file (like others).
2. You need to create one more file in the `scripts` dir for the site.
   There you can specify keys, that will be handled on this site.
For example:

```js

// scripts/jira.js: define keyboard shortcuts here
;(function() {

// NOTE: _______export is a global object, created in common.js file. All we need is the Listener constructor, that is defined there.
var Listener = window._______export.Listener;

// NOTE: This are used key codes for keydown event handler.
// 82 == r
// 13 == Enter
// 90 == z

// NOTE: keydown event will be processed only when focus on the page is not within some input field.
var jiraListener = new Listener(/^(INPUT|TEXTAREA|BUTTON)$/i).init({
    '82': 'jira:ticket:resolve', // NOTE: Simple case: pressing 'r' we are posting this message to the extension background page.
    '13': { meta: true, message: 'jira:enter' }, NOTE: // Here we also are specifing that meta key must be pressed (Cmd for Mac).
    '90': { ctrl: true, message: 'jira:cancel' } // NOTE: ctrl and shift are also supported.
});

// NOTE: that's it. So: when user press some of this keys - we will send (post) a message to the extension background page.

// bg.js: extension background page script.
// Take a look at map object. There you can define your handlers: trigger click event on some element on the page or do some other stuff. 

```