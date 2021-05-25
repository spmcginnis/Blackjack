const { Stack } = require("./stack")
const { Player } = require("./player")
const Game = require("./game")
const readline = require('readline');
// https://nodejs.org/api/readline.html#readline_event_line



let stack = new Stack().shuffle()
// TODO implement multiple decks in a 'shoe'
// const cut = 75
// TODO implement reshuffle at the cut boundary
let playerList = [
    new Player("Bob", 100),
    new Player("Susan", 100),
    new Player("Terry", 100)]

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
    for (let i=0; i<maxRounds; i++)
    {   
        console.log("Loop has run ")
        let input = await prompt()
        
        if (input === "Y")
        {
            console.log('Round ' + round++)
            Game.round(playerList, stack)
            //check stack
            if (stack.deck.length < 20)
            {
                stack = new Stack().shuffle()
                console.log("we have shuffled a new deck")
            }
        } else {
            console.log("Process exited")
            process.exit(0)
        }
    }
}

mainLoop()


// Blackjack detections
// Dealer
// Players

// Player logic here

// special behavior for blackjacks and aces











