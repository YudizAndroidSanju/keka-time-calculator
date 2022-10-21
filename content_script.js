chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse({
        token: localStorage.access_token,
    });
});

chrome.storage.sync.set({ key: localStorage.access_token });
