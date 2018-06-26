const pg = require('pg');
const login = require('../utils/postgresql.js');
const conString = ''.concat('postgres://',login.username,':',login.password,'@',login.hostname,':',login.port,'/',login.database);
const client = new pg.Client(conString);
client.connect();

const TEAMS = require('../utils/teamEnums.js');

/*CREATE TABLE passing (
    week        smallint NOT NULL,
    name        varchar(256) NOT NULL, 
    comp        smallint NOT NULL,
    att         smallint NOT NULL,
    yds         smallint NOT NULL,
    avg         real NOT NULL,
    td          smallint NOT NULL,
    int         smallint NOT NULL,
    sacks       smallint NOT NULL,
    slost       smallint NOT NULL,
    qbr         real NOT NULL,
    rtg         real NOT NULL
);*/

function parse(data, weekNum){
    let players = {};

    //console.log(data.awayStats);
    storeGameStatsByTeam(data.awayStats, weekNum);
    storeGameStatsByTeam(data.homeStats, weekNum);

    // client.query('SELECT * FROM passing').then((data)=>{
    //     console.log(data.rows);
    // });

    // let awayTeam = getTeamNameFromStat(data.awayStats[0].title);
    //     data.awayStats.forEach(function (stat){
    //     let delimited = stat.title.split(' ');
    //     let category = delimited[0]
    // });
    

}

function storeGameStatsByTeam(gameStats, weekNum){
    gameStats.forEach(function (playType){
        if(playType.title.endsWith('Passing')){
            playType.players.forEach(function (player){
                storePlayerData(player, playType.title, weekNum);
            })
        }
        else{
            return;
        }
    });
}

function storePlayerData(player, statName, weekNum){
    if(player.name === null || player.name === 'TEAM'){
        return;
    }
    let tableName = getStatFromTeamStat(statName)
    let generatedStr = generateInsertQuery(player, tableName, weekNum);
    client.query(generatedStr).then((pgResponse)=>{
        // client.query('SELECT * FROM passing').then((data)=>{
        // });
    });
}

/*
 * Given a scraped player object, will return INSERT query string for Postgres table
 */
function generateInsertQuery(player, tableName, weekNum){ 
    let baseStr = 'INSERT INTO '.concat(tableName);
    var statNames = 'week, name';
    var statValues = weekNum + ', \''+player.name+'\'';
    player.stats.forEach(function (stat){
        if(stat.key !== 'name'){        //already getting name from player.name
            let sStat = splitESPNCategory(stat.key, stat.value);
            sStat.newKeys.forEach(function (newKey){
                statNames = statNames.concat(', ', newKey);
            });
            sStat.newValues.forEach(function (newValue){
                statValues = statValues.concat(', ',  newValue);
            });
        }
    });
    return baseStr.concat(' (', statNames, ') VALUES (', statValues, ');');
}

function getStatFromTeamStat(statTitle){
    var statString = '';
    let words = statTitle.split(' ');
    if(words[words.length-1]==="Returns"){
        statString = words[words.length-2].concat(words[words.length-1]);
    }
    else{
        statString = words[words.length-1];
    }
    return statString.toLowerCase();
}

function splitESPNCategory(key,value){
    var newKeys, newValues;
    switch(key){
        case 'c-att':
            newKeys = ['comp','att'];
            newValues = [value.split('/')[0], value.split('/')[1]];
            break;
        case 'sacks':
            newKeys = ['sacks','slost'];
            newValues = [value.split('-')[0], value.split('-')[1]];
            break;
        case 'qb hits':
            newKeys = ['qbhits'];
            newValues = [value];
            break;
        case 'fg':
            newkeys = ['fgm, fga'];
            newValues = [value.split('/')[0], value.split('/')[1]];
            break;
        case 'xp':
            newkeys = ['xpm, xpa'];
            newValues = [value.split('/')[0], value.split('/')[1]];
            break;
        case 'in 20':
            newkeys = ['in20'];
            newValues = [value];
            break;
        default:      
            newKeys = [key];
            newValues = [value];
    }
    return {
        newKeys: newKeys,
        newValues: newValues
    };
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