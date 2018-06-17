const scraper = require('./src/scrape.js');
const parser = require('./src/parse.js');


async function run(){
    //console.log(process.argv[2]);
    // let p = await scraper(process.argv[2]).then(data =>{
    //     console.log(data.awayStats.title);
    // });    
    // console.log(p.awayStats.title);

    await parser.parse().then(() => {
        console.log('first promsie return');
    });
}
run().then(() => {
    console.log('fiusdpfoksdf');
});