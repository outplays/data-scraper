const pg = require('pg');
const login = require('../utils/postgresql.js');
const conString = ''.concat('postgres://',login.username,':',login.password,'@',login.hostname,':',login.port,'/',login.database);
const client = new pg.Client(conString);
client.connect();

const TEAMS = require('../utils/teamEnums.js');

/*CREATE TABLE passing (
    name        varchar(256) NOT NULL, 
    catt       varchar(10) NOT NULL,
    yds         smallint NOT NULL,
    avg         real NOT NULL,
    td          smallint NOT NULL,
    int         smallint NOT NULL,
    sacks       varchar(10) NOT NULL,
    qbr         real NOT NULL,
    rtg         real NOT NULL
);*/

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
                storePlayerData(player, playType.title);
            })
        }
        else{
            return;
        }
    });
}

function storePlayerData(player, statName){
    if(player.name === null || player.name === 'TEAM'){
        return;
    }
    let tableName = getStatFromTeamStat(statName)
    let generatedStr = generateInsertQuery(player, tableName);
    console.log(generatedStr);
    //var generatedStr = ''.concat('INSERT INTO passing (name) VALUES (\'',player.name,'\');' );
    client.query(generatedStr).then((pgResponse)=>{
        client.query('SELECT * FROM passing').then((data)=>{
        });
    });
}

/*
 * Given a scraped player object, will return INSERT query string for Postgres table
 */
function generateInsertQuery(player, tableName){ 
    let baseStr = 'INSERT INTO '.concat(tableName);
    var statNames = 'name';
    var statValues = '\''+player.name+'\'';
    player.stats.forEach(function (stat){
        if(stat.key !== 'name'){
            if(statNames === ''){
                statNames = statNames.concat(removeCharFromString('-', stat.key));
                statValues = statValues.concat(stat.value);
            }
            else{ 
                statNames = statNames.concat(', ', removeCharFromString('-', stat.key));
                statValues = statValues.concat(', ', stat.value);
            }
        }
    });
    return baseStr.concat(' (', statNames, ') VALUES (', statValues, ');');
}

function removeCharFromString(ch, str){
    return str.replace(ch,'');
}

function getStatFromTeamStat(statTitle){
    var statString = '';
    let words = statTitle.split(' ');
    console.log(words);
    if(words[words.length-1]==="Returns"){
        statString = words[words.length-2].concat(' ', words[words.length-1]);
    }
    else{
        statString = words[words.length-1];
    }
    return statString.toLowerCase();
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