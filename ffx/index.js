var self = require('sdk/self');

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

// Test tabs APIs
var tabs = require('sdk/tabs');
var tabUtils = require('sdk/tabs/utils');
var viewCore = require('sdk/view/core')
var viewFor = viewCore.viewFor;
function getBrowserTest(tab) {
  var lowLevelTab = viewFor(tab);
  var browser = tabUtils.getBrowserForTab(lowLevelTab);
  console.log(browser);
}
tabs.on("ready", getBrowserTest);

exports.dummy = dummy;
