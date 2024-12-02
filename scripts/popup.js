// console.log('popup.js ran!')


const messenger = new ServiceWorkerMessenger();
const consoleOutputText = document.querySelector(".console-output");
const consoleClearBtn = document.querySelector(".console-clear");

const basketBallRefName = document.querySelector(".player-name");

consoleClearBtn.addEventListener("click",(event)=>{
    consoleOutputText.textContent='';
});

function log(...args){
    for (const arg of args) {
        const msg = typeof arg === "object" ? JSON.stringify(arg) : String(arg);
        let element = document.createElement('div');
        element.textContent = msg;
        consoleOutputText.appendChild(element);
    }
}


document.querySelectorAll(".pull-btn").forEach((element) => {
    element.addEventListener("click",(event)=>{
        messenger.send({message:'hello'},(response) => {
            log(response);
        });
    });
});
let keys = [];
let data = null;
//read from storage
// .then((dataMap) => {
//     log(dataMap);
//     keys = dataMap['keys'];
// });
async function queryData(){
    const result = await chrome.storage.local.get('keys');
    keys = result.keys;
    // log(keys);
    // await chrome.storage.local.get('');
    const mostRecentBRefData = await chrome.storage.local.get(keys[0]);
    if (mostRecentBRefData != null){
        let currentData = mostRecentBRefData[keys[0]];
        basketBallRefName.textContent = currentData.name;
        data = currentData;
        log(data);
    }
}
queryData();
