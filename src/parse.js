const fs = require('fs');

async function parse(){
    // console.log(dataObj.awayStats.title);  

    fs.readFile('./data.json','utf-8', function(err, data){
        if(err) throw err;
        var dataObject = JSON.parse(data);
        console.log(dataObject.awayStats.title);
    });
    //var dataObject = JSON.parse(fs.readFileSync('./data.json','utf8'));
    
}
module.exports = parse;