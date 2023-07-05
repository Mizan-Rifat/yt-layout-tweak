console.log('bg')

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes('youtube.com/watch')) {
    console.log('hgghf')
    chrome.tabs.sendMessage(tabId, {})
  }
})

export {}
