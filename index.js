const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const humGuess = require('./humguess')
//choosing which game to play first

gameChoice()
async function gameChoice() {
  let userGameChoice = await ask('Do you want to guess first or should I? \nPress "1" if you want to guess first and press "2" if you want me to guess first. \n')
    if (parseInt(userGameChoice) === 1) {
      startCompGuessNum()
    } else if (parseInt(userGameChoice) === 2) {
      startHumGuessNum()
    } else {
      console.log("Well that's not a choice at all! I guess you don't want to play any of my games :( Goodbye!")
      process.exit()
    }
}

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

