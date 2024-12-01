const extensionConsoleTag = 'StatDownloader: '
console.log(extensionConsoleTag,'Content script ran....');
//we have access to the dom from the content script
let playerNameH1 = document.querySelector("h1 span");
let nameSplit = playerNameH1.textContent.split(" ");
let playerKey = "";
for (const part of nameSplit) {
    if (!isNaN(part[0])){//returns false if number value or string
        break;
    }
    playerKey += ' ' + part.toLowerCase();
}
console.log(extensionConsoleTag,playerKey);
/*  
    store in chrome 
    basketball-ref:
        available-table:
            name: playerKey
            table: data
    
    overwrite everytime
*/
