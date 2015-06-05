console.log "define listener"

chrome.webRequest.onHeadersReceived.addListener(
  # callback
  (details)->
    console.log "#{details.method}: #{details.url}"
    details.responseHeaders.forEach (header)->
      console.log "#{header.name} = #{header.value}"
    undefined

  # filter
  {
    # match urls
    urls: ["http://*/*", "https://*/*"]
    # only main frame (not fired on loading images and etc)
    types: ["main_frame"]
  }

  # enable headers
  ["responseHeaders"]
)
