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
//computer guesses number
startCompGuessNum();

async function startCompGuessNum() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  //range
  let high = 100
  let low = 1


  //start of game guess count
  let guessCount = 0

  //computer's guess
  // let computerGuess = randomNum(low, high)
  let computerGuess = Math.floor((high - low) / 2) + low
  //myAnswer is Y or N
  let myAnswer = await ask(`Is it ${computerGuess}, yes (y) or no (n)?`)
  guessCount++

//wrong guess answered
  while (myAnswer.toLowerCase() === 'n') {
    let highLow = await ask('Is it higher (h) or lower (l)?')
    if (highLow.toLowerCase() === 'h') {
      low = computerGuess + 1;
    } else if (highLow.toLowerCase() === 'l') {
      high = computerGuess - 1
    }
    computerGuess = Math.floor((high - low) / 2) + low
    myAnswer = await ask(`Is it ${computerGuess}, yes (y) or no (n)?`)
    guessCount++
  }
  //correct guess answered
  if (myAnswer.toLowerCase() === 'y') {
//console.log using ternary operator
    console.log(guessCount>1? `Yes! I got you number and it only took ${guessCount} guesses mothefucker!` : `Yes! I got you number and it only took ${guessCount} guess mothefucker!`)

    process.exit();

  }

}