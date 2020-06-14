const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);


function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}





//share file within project
module.exports = { ask }