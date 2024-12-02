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
const table = document.querySelector("table.row_summable");
const rows = [];
table.querySelectorAll("tr").forEach((rowElement,index) => {
    //each row has a th and td with all data
    //check element has id
    // console.log(extensionConsoleTag,rowElement);
    if (!rowElement.hasAttribute('id') || index == 0){//means player did not play in this game
        return;
    }
    /*
        game_season
        date_game
        age
        team_id
        game_location
        opp_id
        game_result
        
        after game_result all stats
        GS	MP	FG	FGA	FG%	3P	3PA	3P%	FT	FTA	FT%	ORB	DRB	TRB	AST	STL	BLK	TOV	PF	PTS	GmSc +/-
        
    */
   
    const rowData = [];
    rowElement.querySelectorAll("td").forEach((td) => {   
        if (td.children.length == 0){
            rowData.push(td.textContent);
        }else{
            rowData.push(td.children[0].textContent);
        } 
    });
    rows.push(rowData);
});

function storeTable(storageKey,rows){
    //save the rows or send to background?
    // basketball-ref:
    //     available-table:
    //         name: playerKey
    //         table: data
    chrome.storage.local.set({
        'basketball-ref':{
            name: playerKey,
            table:rows,
        }
    });
}

const statNames = "GS,MP,FG,FGA,FG%,3P,3PA,3P%,FT,FTA,FT%,ORB,DRB,TRB,AST,STL,BLK,TOV,PF,PTS,GmSc,+/-".split(",");
console.log(extensionConsoleTag,rows);


storeTable('basketball-ref',rows);


