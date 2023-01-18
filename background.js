chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // sendRequest(request.phoneNumber);
});

const sendRequest = (phone) => {
    try {
        const request = new XMLHttpRequest();
        const url = 'http://127.0.0.1:3000';

        request.open('POST', `${url}?phone=${phone}`, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', `Basic UG9seWNvbTo5NjM=`);
        request.onerror = function (e) {
            console.log(e.message);
        };
        request.send(`phone=${phone}`);
    } catch (error) {
        console.log(error);
    }

}

chrome.webRequest.onCompleted.addListener(
    async function (details) {
        if (details.url.startsWith("https://power.dat.com/search/matches/sort/?direction")) {
            chrome.tabs.sendMessage(details.tabId, { message: "contactsReceived" })
        }
    },
    { urls: ["https://power.dat.com/search/matches/sort/?direction*"] },
    ["responseHeaders"]
);