const scraper = require('./src/scrape.js');
const parser = require('./src/parse.js');
const fs = require('fs');


const NUM_WEEKS = 17;       //Number of weeks per NFL season

async function run(){
    fs.readFile('./input_2017.json','utf8', function(err,data){
        if(err){
            console.log('Error: Failed to read data JSON');
        }
        let seasonData = JSON.parse(data);

        Object.keys(seasonData).forEach(function(field){
            if(field.startsWith('week')){
                seasonData[field].forEach(function(game){
                    //let data = await scraper(game);
                    scraper(game).then((data) => {
                        parser(data);
                    });
                    
                })
            }
        });




        // Array(NUM_WEEKS).fill().map((_, i) => { //iterates through indices 0 - NUM_WEEKS-1
        //     if(i == 0){ //temporary: to limit scope to week 1 
        //         let weeknum = 'week' + (i+1).toString();
        //         console.log(seasonData.1);
        //         seasonData.i.toString().forEach(function (game){
        //             console.log(game.home);
        //             //let data = await scraper(game);
        //             //parser(data);
        //         });
        //     }
        // });
    });


    
}

run();

// await run().then(() => {
//     console.log('run() callback -- then statement');
// });