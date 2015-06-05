response = (details)->
  # {name: "", value: ""} => obj[name] = value
  reduceFunc = (obj, info)->
    obj[info.name] = info.value
    obj

  {
    method: details.method
    url: details.url
    header: details.responseHeaders.reduce(reduceFunc, new Object)
  }

callback = (details)->
  res = response(details)
  if customHeader = res.header["X-Hello"]
    console.log customHeader
  undefined

filter =
  # match urls
  urls: ["http://localhost:*/*", "https://localhost:*/*"]
  # only main frame (not fired on loading images and etc)
  types: ["main_frame"]

extOpts = [
  "responseHeaders" # to get headers
]

chrome.webRequest.onHeadersReceived.addListener(
  callback
  filter
  extOpts
)

