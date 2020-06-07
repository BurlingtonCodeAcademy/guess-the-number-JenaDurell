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
//human guesses number
startHumGuessNum();

async function startHumGuessNum() {
    //range
    let high = (process.argv[2] || 100)
    let low = 1

    console.log("Let's play a game where I (computer) think up a number and you (human) try to guess it.")
    console.log(`I will think of a number between 1 and ${high} (inclusive).`)
    let secretNumber = randomNum(low, high)

    console.log(secretNumber)

    //start of game guess count
    let guessCount = 0

    let myGuess = await ask("What do you think it could be? ")
    myGuess = parseInt(myGuess)
    guessCount++

    //correct guess answered

    if (myGuess == secretNumber) {
        myGuess = parseInt(myGuess)
        //console.log using ternary operator for correct tenses
        console.log(`Yes! You got my number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""}! Strong work, Wise One!`)
    }

    while (myGuess != secretNumber) {
        //wrong guess answered and it's too high
        if (myGuess > secretNumber) {
            console.log(`Nope! ${myGuess} is too high! `)
            myGuess = await ask("what do you think it could be? ")
            myGuess = parseInt(myGuess)
            //wrong guess answered and it's too low        
        } else {
            console.log(`Nope! ${myGuess} is too low! `)
            myGuess = await ask("What do you think it could be? ")
            myGuess = parseInt(myGuess)
        }
        guessCount++
    }
    console.log(`Yes! You got my number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""}! Strong work, Wise One!`)
    process.exit()
}
