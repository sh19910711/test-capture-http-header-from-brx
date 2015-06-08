# test-capture-http-header-from-brx
Test to extract a custom HTTP response header

### Tasks

* Chrome
  + [x] Get `X-Hello` from local app
    - Use `chrome.webRequest`
    - And set `responseHeaders` to `chrome.webRequest.onHeadersReceived.addListener`
* Firefox
  + [x] Get `X-Hello` from local app
    - Use `ObserverService`
    - Set listener to a `http-on-examine-response` event
    - Use `nsIHttpChannel` as query interface
