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

// Test observerService
var { Cc, Ci } = require("chrome");
var observerService = Cc["@mozilla.org/observer-service;1"]
                      .getService(Ci.nsIObserverService);

// ref: http://www.softwareishard.com/blog/firebug/nsitraceablechannel-intercept-http-traffic/
function TracingListener() {
  this.originalListener = null;
}
TracingListener.prototype = {
  onDataAvailable: function(request, context, inputStream, offset, count) {
    console.log("TracingListener#onDataAvailable: called");
    this.originalListener.onDataAvailable(request, context, inputStream, offset, count);
  },

  onStartRequest: function(request, context) {
    console.log("TracingListener#onStartRequest: called");
    this.originalListener.onStartRequest(request, context);
  },

  onStopRequest: function(request, context, statusCode) {
    console.log("TracingListener#onStopRequest: called");
    this.originalListener.onStopRequest(request, context, statusCode);
  },

  QueryInterface: function (aIID) {
    if (aIID.equals(Ci.nsIStreamListener) ||
      aIID.equals(Ci.nsISupports)) {
      return this;
    }
    throw Components.results.NS_NOINTERFACE;
  }
};

var httpListener = {
  observe: function(subject, topic, data) {
    var listener = new TracingListener();
    subject.QueryInterface(Ci.nsITraceableChannel);
    listener.originalListener = subject.setNewListener(listener);
  }
};

observerService.addObserver(httpListener, "http-on-examine-response", false);

exports.dummy = dummy;
