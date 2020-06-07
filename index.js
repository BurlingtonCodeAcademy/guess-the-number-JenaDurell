const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//random number generator
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

userChooser()
//Deciding which game to play
async function userChooser() {
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

//computer guesses number
async function startCompGuessNum() {
  //range
  let high = (process.argv[2] || 100)
  let low = 1


  console.log("Let's play a game where you (human) think up a number and I (computer) try to guess it.")
  console.log(`Please think of a number between 1 and ${high} (inclusive).`)
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  //start of game guess count
  let guessCount = 0

  //computer's guess
  // let computerGuess = randomNum(low, high)
  let computerGuess = Math.floor((high - low) / 2) + low
  //myAnswer is Y or N
  let myAnswer = await ask(`Is it ${computerGuess}, yes (y) or no (n)?`)
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
    let highLow = await ask('Is it higher (h) or lower (l)?')
    if (highLow.toLowerCase() === 'h' && highCheatTest(computerGuess, high)) {
      low = computerGuess + 1;
    } else if (highLow.toLowerCase() === 'l' && lowCheatTest(computerGuess, low)) {
      high = computerGuess - 1
    } else if (highLow.toLowerCase() !== 'h' && highLow.toLowerCase() !== 'l') {
      console.log("I'm sorry, what?!?!?")
    }
    computerGuess = Math.floor((high - low) / 2) + low
    myAnswer = await ask(`Is it ${computerGuess}, yes (y) or no (n)?`)
    guessCount++
  }
  //correct guess answered
  if (myAnswer.toLowerCase() === 'y') {
    //console.log using ternary operator for correct tenses
    console.log(`Yes! I got you number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""} buddy!`)

    process.exit();

  }

}