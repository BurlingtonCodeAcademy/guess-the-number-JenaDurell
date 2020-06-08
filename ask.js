const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const humGuess = require('./humguess')
const compGuess = require('./compguess')

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

function newGame(gameName)  {
    if (gameName === 'comp') {compGuess.startCompGuessNum()}
    if (gameName === 'hum') {humGuess.startHumGuessNum()}

}



//share file within project
module.exports = { ask, newGame }