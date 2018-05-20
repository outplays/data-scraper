const cheerio = require('cheerio');

module.exports = async function (htmlContent){
    if(typeof htmlContent !== 'string') {
        throw new TypeError('Parse error: htmlContent not of type string');
    }


    const $ = cheerio.load(htmlContent);

    console.log($.html());
}