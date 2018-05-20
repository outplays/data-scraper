const scraper = require('./src/scrape.js');
const parser = require('./src/parse.js');


function run(){
    scraper('www.google.com');
}
run();