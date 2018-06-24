const pg = require('pg');
const login = require('../utils/postgresql.js');
const conString = ''.concat('postgres://',login.username,':',login.password,'@',login.hostname,':',login.port,'/',login.database);
const client = new pg.Client(conString);
client.connect();

const TEAMS = require('../utils/teamEnums.js');

function parse(data){
    let players = {};

    
    
    //console.log(data.awayStats);
    storeGameStatsByTeam(data.awayStats);



    // client.query('SELECT * FROM passing').then((data)=>{
    //     console.log(data.rows);
    // });

    // let awayTeam = getTeamNameFromStat(data.awayStats[0].title);
    //     data.awayStats.forEach(function (stat){
    //     let delimited = stat.title.split(' ');
    //     let category = delimited[0]
    // });
    

}

function storeGameStatsByTeam(gameStats){
    gameStats.forEach(function (playType){
        if(playType.title.endsWith('Passing')){
            playType.players.forEach(function (player){
                storePlayerData(player);
            })
        }
        else{
            return;
        }
    });
}

function storePlayerData(player){
    if(player.name === null || player.name === 'TEAM'){
        return;
    }
    var generatedStr = ''.concat('INSERT INTO passing (name) VALUES (\'',player.name,'\');' );
    console.log(generatedStr);
    client.query(generatedStr).then((pgResponse)=>{
        console.log('FINISHED STORING! - ', pgResponse);
        client.query('SELECT * FROM passing').then((data)=>{
            console.log(data.rows);
        });
    })
}



//Statistic should be "Passing"
function getTeamNameFromStat(statTitle){
    if(typeof statTitle !== 'string'){
        console.log('Passed Statistic not of type string');
    }

    let statDelimited = statTitle.split(' ');
    if(statDelimited[statDelimited.length-1] !== 'Passing'){
        console.log('ERROR: Passed statistic is not \'Passing\'');
    }
    var teamName = '';
    if(statDelimited.length == 3){
        teamName = statDelimited[0] + ' ' +statDelimited[1];
    }
    else if(statDelimited.length == 2){
        teamName = statDelimited[0];
    }
    return teamName;
}
module.exports = parse;