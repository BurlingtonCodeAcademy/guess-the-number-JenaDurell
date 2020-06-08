
//share files within project
const lib = require('./ask')
const humGuess = require('./humguess')
const compGuess = require('./compguess')
//choosing which game to play first

gameChoice()
async function gameChoice() {
  let userGameChoice = await lib.ask('Do you want to guess first or should I? \nPress "1" if you want to guess first and press "2" if you want me to guess first. \n')
    if (parseInt(userGameChoice) === 1) {
      humGuess.startHumGuessNum()
    } else if (parseInt(userGameChoice) === 2) {
      compGuess.startCompGuessNum()
    } else {
      console.log("Well that's not a choice at all! I guess you don't want to play any of my games :( Goodbye!")
      process.exit()
    }
    
    
}

