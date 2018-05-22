const scraper = require('./src/scrape.js');
const parser = require('./src/parse.js');


function run(){
    console.log(process.argv[2]);
    scraper(process.argv[2]);
    
    // scraper('www.google.com').then( (data)=>{
    //     return new Promise(function(resolve, reject) {
    //         fs.writeFile('data.json', JSON.parse(data), 'utf8', function(err){
    //             if(err) reject(err);
    //             else resolve(data);
    //         });
    //     });
    // }).then(function(data){
    //     console.log("results are ", data);
    // }).catch(function(err){
    //     console.log("Error: ", err);
    // });
}
run();