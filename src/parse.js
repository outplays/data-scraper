const fs = require('fs');
const TEAMS = require('../utils/teamEnums.js');

function parse(data){
    let players = {};

    let awayTeam = getTeamNameFromStat(data.awayStats[0].title);
    data.awayStats.forEach(function (stat){
        let delimited = stat.title.split(' ');
        let category = delimited[0]
    });
    

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