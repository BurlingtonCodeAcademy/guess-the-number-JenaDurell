//random number generator
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Human guess start game
async function startHumGuessNum() {
    //range
    let high = (process.argv[2] || 100)
    let low = 1
    console.log(`Let's play a game where I (computer) think up a number and you (human) try to guess it. \nI am thinking of a number between 1 and ${high} (inclusive).`)
    let secretNumber = randomNum(low, high)
    let questionText = "What do you think it could be?\n"
    let myGuess = await ask(questionText)
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
        if (myGuess > secretNumber) {
            wrongAnswerReply('high')
            //wrong guess answered and it's too low        
        } else {
            wrongAnswerReply('low')
        }
        guessCount++
    }
    win()
    function wrongAnswerReply(answerType) {
        console.log(`NOPE! ${myGuess} is too ${answerType}! `)
        myGuess = await ask("What do you think it could be? ")
        myGuess = parseInt(myGuess)
    }

    function win() {
        //console.log using ternary operator for correct tenses
        console.log(`Yes! You got my number and it only took ${guessCount} guess${guessCount > 1 ? "es" : ""}! Strong work, Wise One!\n \n`);
        //Begin Computer guess game
        startCompGuessNum();
    }
}

//allow index to acess file
module.exports = { randomNum,startHumGuessNum };