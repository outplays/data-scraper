const scrapeIt = require("scrape-it");
const fs = require('fs');
// const urlString = 'http://www.espn.com/nfl/boxscore?gameId=400951566';

async function scrape(url, callback){    
    scrapeIt(url,{
        awayStats: {
            listItem: "div.col.gamepackage-away-wrap",
            data: {
                title: "div.team-name",
                players: {
                    listItem: "tr",
                    data: {
                        name: {
                            selector: "td.name > a >span",
                            how: "html"
                        },
                        stats:{
                            listItem: "td",
                            data:{
                                key: {
                                    attr: "class"
                                },
                                value: {
                                    how: "html"
                                }
                                
                            }
                        }
                    }
                }
            }
        },
        homeStats: {
            listItem: "div.col.gamepackage-home-wrap",
            data: {
                title: "div.team-name",
                players: {
                    listItem: "tr",
                    data: {
                        name: {
                            selector: "td.name > a >span",
                            how: "html"
                        },
                        stats:{
                            listItem: "td",
                            data:{
                                key: {
                                    attr: "class"
                                },
                                value: {
                                    how: "html"
                                }
                                
                            }
                        }
                    }
                }
            }
        }
    }, (err, { data }) => {
        console.log(err || data)
        fs.writeFile('data.json', JSON.stringify(data), 'utf8', console.log('data,', data));
        return data;
    })

}

module.exports = scrape;