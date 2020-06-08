//humGuess and ask import
const lib = require('./ask')
//computer guesses number
async function startCompGuessNum() {
    //range
    let high = (process.argv[2] || 100)
    let low = 1
  
  
    console.log(`Let's play a game where you (human) think up a number and I (computer) try to guess it. \nPlease think of a number between 1 and ${high} (inclusive).`)
    let questionText = "What is your secret number?\nI won't peek, I promise...\n"
    let secretNumber = await lib.ask(questionText);
    console.log('You entered: ' + secretNumber);
  
    //start of game guess count
    let guessCount = 0
      //computer guess
    let computerGuess = Math.floor((high - low) / 2) + low
    //myAnswer is Y or N
    let myAnswer = await lib.ask(`Is it ${computerGuess}, yes (y) or no (n)?`)
    guessCount++
  
  
    //Cheat detector guessing above
    function highCheatTest(compGuess, limit) {
      if (compGuess >= limit) {
        console.log(`But you said it was lower than ${parseInt(limit + 1)}! I don't play with cheaters, goodbye!`)
        process.exit()
      } else {
        return true
      }
    }
      // Cheat detector guessing below 
    function lowCheatTest(compGuess, limit) {
      if (compGuess <= limit) {
        console.log(`But you said it was higher than ${parseInt(limit - 1)}! I don't play with cheaters, goodbye!`)
        process.exit()
      } else {
        return true
      }
    }
      //wrong guess answered
    while (myAnswer.toLowerCase() === 'n') {
      let highLow = await lib.ask('Is it higher (h) or lower (l)?')
      if (highLow.toLowerCase() === 'h' && highCheatTest(computerGuess, high)) {
        low = computerGuess + 1;
      } else if (highLow.toLowerCase() === 'l' && lowCheatTest(computerGuess, low)) {
        high = computerGuess - 1
      } else if (highLow.toLowerCase() !== 'h' && highLow.toLowerCase() !== 'l') {
        console.log("I'm sorry, what?!?!?")
      }
      computerGuess = Math.floor((high - low) / 2) + low
      myAnswer = await lib.ask(`Is it ${computerGuess}, yes (y) or no (n)?`)
      guessCount++
    }
    //correct guess answered
    if (myAnswer.toLowerCase() === 'y') {
      //console.log using ternary operator for correct tenses
      console.log(`Yes! I got you number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""} buddy! \n \n`)

  //begin Human guess game
      lib.newGame('hum')
    }
  
  }
//share file within project
  module.exports = {startCompGuessNum};