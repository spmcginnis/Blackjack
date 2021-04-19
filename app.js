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
for (let i = 0; i<players; i++) {
    let hand = new Hand()
    allHands.push(hand)
}
allHands.push(dealerHand)

for (let hand of allHands){
    let card = stack.drawOne()
    hand.addCard(card)
}
for (let hand of allHands){
    let card = stack.drawOne()
    hand.addCard(card)
}

for (let i=0; i<allHands.length; i++){
    let handHolder = (i < allHands.length - 1) ? `player ${i+1}` : "dealer"
    console.log(`${handHolder} total is ${allHands[i].getRunningTotal()}`)
}

Game.processDealerHand(dealerHand, stack)
Game.scoreHands(dealerHand, allHands)

// Blackjack detections
// Dealer
// Players

// Player logic here

// special behavior for blackjacks and aces











