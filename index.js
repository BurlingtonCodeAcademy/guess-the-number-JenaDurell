//share files within project
const {ask} = require('./ask');
const {startHumGuessNum} = require('./humGuessNum');
const {startCompGuessNum} = require('./compGuessNum');

let lastGamePlayed = 'x'



//choosing which game to play first
gameChoice();

async function gameChoice() {
  let userGameChoice = '';
  if (lastGamePlayed = 'x') {
    userGameChoice = await ask('Do you want to guess first or should I? \nPress "1" if you want to guess first and press "2" if you want me to guess first. \n')
  } else if ( lastGamePlayed === 1) {
    userGameChoice = 2
  } else if (lastGamePlayed === 2) {
    userGameChoice = 1
  
  };



  if (parseInt(userGameChoice) === 1) {
    await startHumGuessNum()
    lastGamePlayed = 1
    gameChoice();

  } else if (parseInt(userGameChoice) === 2) {
    await startCompGuessNum()
    lastGamePlayed = 2
    gameChoice();

  } else {
    console.log("Well that's not a choice at all! I guess you don't want to play any of my games :( Goodbye!");
    gameChoice();
  };


};



