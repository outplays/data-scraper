const scrapeIt = require("scrape-it");
const fs = require('fs');

const urlBase = "http://www.espn.com/nfl/boxscore?gameId=";

async function scrape(game){    
    return new Promise(function(resolve,reject){
        scrapeIt(urlBase + game.gameId,{
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
            if(err){
                reject(err);
            }
            else{
                fs.writeFile("".concat('./data/',game.away,'at',game.home,'.json'), JSON.stringify(data), 'utf8', (error) => {
                    if(err) console.log('Error: Failed to write JSON - ', err);
                });
                resolve(data);
            }
        });
    });
}

module.exports = scrape;