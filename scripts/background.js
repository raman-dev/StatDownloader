const DATA_KEYS = [
    'basketball-ref',
    'nba-stats',
];

chrome.runtime.onInstalled.addListener(() => {
    //set a the keys
    chrome.storage.local.set({'keys':DATA_KEYS});
});


chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
    console.log('message received in service_worker',message);
    sendResponse({reply:'Hello form service_worker'});
    //return true if response will be sent asynchronously
    return false;
}); 

