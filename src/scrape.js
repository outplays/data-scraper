// const puppeteer = require('puppeteer');
const scrapeIt = require("scrape-it");
const fs = require('fs');
// const urlString = 'www.google.com';

async function scrape(url){    
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

    // Callback interface
    //scrapeIt("https://ionicabizau.net/", {
        // Fetch the articles
        // articles: {
        //     listItem: ".article", 
        //     data: {
        //         // Get the article date and convert it into a Date object
        //         createdAt: {
        //             selector: ".date", 
        //             convert: x => new Date(x)
        //         },
        //         // Get the title
        //         title: "a.article-title",
        //         // Nested list
        //         tags: {
        //             listItem: ".tags > span"
        //         },
        //         // Get the content
        //         content: {
        //             selector: ".article-content",
        //             how: "html"
        //         },
        //         // Get attribute value of root listItem by omitting the selector
        //         classes: {
        //             attr: "class"
        //         }
        //     }
        // },
        // Fetch the blog pages
        // pages: {
        //     listItem: "li.page",
        //     name: "pages",
        //     data: {
        //         title: "a",
        //         url: {
        //             selector: "a",
        //             attr: "href"
        //         }
        //     }
        // }
    // }, (err, { data }) => {
    //     console.log(err || data)
    // })

}

module.exports = scrape;