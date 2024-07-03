chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js']
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url && message.filename) {
    chrome.downloads.download({
      url: message.url,
      filename: message.filename
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  }

  if (message.textContent && message.filename) {
    const blob = new Blob([message.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: message.filename
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
      URL.revokeObjectURL(url); // Clean up the URL.createObjectURL reference.
    });
  }

  if (message.cssContent && message.filename) {
    const blob = new Blob([message.cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: message.filename
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
      URL.revokeObjectURL(url); // Clean up the URL.createObjectURL reference.
    });
  }
});
