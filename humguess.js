//comp guess and ask import
const lib = require('./ask')


//Human guess start game
async function startHumGuessNum() {
    //range
    let high = (process.argv[2] || 100)
    let low = 1
    console.log(`Let's play a game where I (computer) think up a number and you (human) try to guess it. \nI am thinking of a number between 1 and ${high} (inclusive).`)
    let secretNumber = randomNum(low, high)
    let questionText = "What do you think it could be?\n"
    let myGuess = await lib.ask(questionText)
    myGuess = parseInt(myGuess)

    //guess count
    let guessCount = 0
    guessCount++

    //correct guess answered
    if (myGuess === secretNumber) {
        myGuess = parseInt(myGuess)
        win()
    }

    while (myGuess != secretNumber) {
        //wrong guess answered and it's too high
        //wrong guess answered and it's too high
        if (myGuess > secretNumber) {
            console.log(`Nope! ${myGuess} is too high! `)
            myGuess = await lib.ask("what do you think it could be? ")
            myGuess = parseInt(myGuess)
            //wrong guess answered and it's too low        
        } else {
            console.log(`Nope! ${myGuess} is too low! `)
            myGuess = await lib.ask("What do you think it could be? ")
            myGuess = parseInt(myGuess)
        }
        guessCount++
    }
    win()
    

    function win() {
        //console.log using ternary operator for correct tenses
        console.log(`Yes! You got my number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""}! Strong work, Wise One!\n \n`);
       
        //Begin Computer guess game
        lib.newGame('comp')
    }
    //random number generator
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
     
      
      
}

//share file within project
module.exports = { startHumGuessNum }; 