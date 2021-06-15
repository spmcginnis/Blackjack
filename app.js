const { Stack } = require("./stack")
const { Player } = require("./player")
const Game = require("./game")
const readline = require('readline');
// https://nodejs.org/api/readline.html#readline_event_line



let stack = new Stack().shuffle()
// TODO implement multiple decks in a 'shoe'
// const cut = 75
// TODO implement reshuffle at the cut boundary
let startingCash = 4
let playerList = [
    new Player("Bob", startingCash),
    new Player("Susan", startingCash),
    new Player("Terry", startingCash)]

// Move set the table here?
let round = 1
let maxRounds = 10

function prompt() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question('Play a round? Y/N ', (input) => {
            rl.close()
            resolve(input)
        })
    })
}

async function mainLoop () {
    while ((await prompt()).match(/y/i) && round <= maxRounds)
    {   
        console.log(`Round ${round++} \n------------------` )
        Game.round(playerList, stack, 2)
        //check stack
        if (stack.deck.length < 20)
        {
            stack = new Stack().shuffle()
            console.log("we have shuffled a new deck")
        }
    }
}

mainLoop()


// Blackjack detections
// Dealer
// Players

// Player logic here

// special behavior for blackjacks and aces











