let Stack = require("./stack").Stack
let Hand = require("./hand").Hand
const Game = require("./game")
// let Card = require("./card").Card

let stack = new Stack().shuffle()

// for (let card of stack.deck) {
//     console.log(card.toString())
// }

// TEMP Dealer and Player Hands 
let dealerHand = new Hand()
let allHands = []
let players = 3

// Setting the table
for (let i = 0; i<players; i++) {
    let hand = new Hand()
    allHands.push(hand)
}
allHands.push(dealerHand)

Game.deal(allHands, stack)

// Gameplay Loop
// not a dealer
for (let i=0; i<allHands.length -1; i++){
    let name = `player ${i+1}`
    Game.processAIPlayerHand(name, allHands[i], stack)
}

// dealer
Game.processDealerHand(dealerHand, stack)

for (let i=0; i<allHands.length; i++){
    let handHolder = (i < allHands.length - 1) ? `player ${i+1}` : "dealer"
    console.log(`${handHolder} total is ${allHands[i].getRunningTotal()}`)
}

// End Score
Game.scoreHands(dealerHand, allHands)

// Blackjack detections
// Dealer
// Players

// Player logic here

// special behavior for blackjacks and aces











