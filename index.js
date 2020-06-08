//share files within project
const lib = require('./ask');

//choosing which game to play first
gameChoice();
async function gameChoice() {
  let userGameChoice = await lib.ask('Do you want to guess first or should I? \nPress "1" if you want to guess first and press "2" if you want me to guess first. \n')
  if (parseInt(userGameChoice) === 1) {
    startHumGuessNum();
  } else if (parseInt(userGameChoice) === 2) {
    startCompGuessNum();
  } else {
    console.log("Well that's not a choice at all! I guess you don't want to play any of my games :( Goodbye!");
    process.exit();
  };


};

//computer guesses number
async function startCompGuessNum() {
  //range
  let high = (process.argv[2] || 100);
  let low = 1;

  console.log(`Let's play a game where you (human) think up a number and I (computer) try to guess it. \nPlease think of a number between 1 and ${high} (inclusive).`);
  let questionText = "What is your secret number?\nI won't peek, I promise...\n";
  let secretNumber = await lib.ask(questionText);
  console.log('You entered: ' + secretNumber);

  //start of game guess count
  let guessCount = 0;
  //computer guess
  let computerGuess = Math.floor((high - low) / 2) + low;
  //myAnswer is Y or N
  let myAnswer = await lib.ask(`Is it ${computerGuess}, yes (y) or no (n)?`);
  guessCount++


  //Cheat detector guessing above
  function highCheatTest(compGuess, limit) {
    if (compGuess >= limit) {
      console.log(`But you said it was lower than ${parseInt(limit + 1)}! I don't play with cheaters, goodbye!`);
      process.exit();
    } else {
      return true
    }
  };
  // Cheat detector guessing below 
  function lowCheatTest(compGuess, limit) {
    if (compGuess <= limit) {
      console.log(`But you said it was higher than ${parseInt(limit - 1)}! I don't play with cheaters, goodbye!`);
      process.exit();
    } else {
      return true
    }
  };
  //wrong guess answered
  while (myAnswer.toLowerCase() === 'n') {
    let highLow = await lib.ask('Is it higher (h) or lower (l)?')
    if (highLow.toLowerCase() === 'h' && highCheatTest(computerGuess, high)) {
      low = computerGuess + 1;
    } else if (highLow.toLowerCase() === 'l' && lowCheatTest(computerGuess, low)) {
      high = computerGuess - 1;
    } else if (highLow.toLowerCase() !== 'h' && highLow.toLowerCase() !== 'l') {
      console.log("I'm sorry, what?!?!?")
    }
    computerGuess = Math.floor((high - low) / 2) + low;
    myAnswer = await lib.ask(`Is it ${computerGuess}, yes (y) or no (n)?`);
    guessCount++
  }
  //correct guess answered
  if (myAnswer.toLowerCase() === 'y') {
    //console.log using ternary operator for correct tenses
    console.log(`Yes! I got you number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""} buddy! \n \n`);

    //begin Human guess game
    startHumGuessNum();
  }

}
//Human guess start game
async function startHumGuessNum() {
  //range
  let high = (process.argv[2] || 100);
  let low = 1;

  console.log(`Let's play a game where I (computer) think up a number and you (human) try to guess it. \nI am thinking of a number between 1 and ${high} (inclusive).`);
  let secretNumber = randomNum(low, high);
  let questionText = "What do you think it could be?\n";
  let myGuess = await lib.ask(questionText);
  myGuess = parseInt(myGuess);

  //guess count
  let guessCount = 0;
  guessCount++

  //correct guess answered
  if (myGuess === secretNumber) {
    myGuess = parseInt(myGuess);
    win();
  }

  while (myGuess != secretNumber) {
    //wrong guess answered and it's too high
    if (myGuess > secretNumber) {
      console.log(`Nope! ${myGuess} is too high! `);
      myGuess = await lib.ask("what do you think it could be? ");
      myGuess = parseInt(myGuess);
      //wrong guess answered and it's too low        
    } else {
      console.log(`Nope! ${myGuess} is too low! `);
      myGuess = await lib.ask("What do you think it could be? ");
      myGuess = parseInt(myGuess);
    }
    guessCount++
  }
  win();


  function win() {
    //console.log using ternary operator for correct tenses
    console.log(`Yes! You got my number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""}! Strong work, Wise One!\n \n`);

    //Begin Computer guess game
    startCompGuessNum();
  }
  //random number generator
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}