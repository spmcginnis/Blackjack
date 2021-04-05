let Stack = require("./stack").Stack
let Hand = require("./hand").Hand
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

// Blackjack detections
// Dealer
// Players

// Player logic here

// Dealer logic here
// check total if total is less than 17, hit
while (dealerHand.getRunningTotal() < 17) {    
    let card = stack.drawOne()
    dealerHand.addCard(card)
    console.log("Dealer drew a card: " + card.toString())
    console.log("New running total: " + dealerHand.getRunningTotal())
}

// busted case // stand case
if (dealerHand.isBusted()) {
    console.log("Dealer has busted.")
    for (let i=0; i<allHands.length; i++) {
        if (!allHands[i].isBusted()) {
            console.log("Player " + i + " has won.")
        }
    }
} else {
    let dealerTotal = dealerHand.getRunningTotal()
    console.log("Dealer stands with "  + dealerTotal)
    
    for (let i=0; i<allHands.length - 1; i++) {
        if (allHands[i].isBusted()) {
            console.log("Player " + i + " has busted.")
        }
        else if (allHands[i].getRunningTotal() > dealerTotal) {
            console.log("Player " + i + " has won.")
        } 
        else if (allHands[i].getRunningTotal() === dealerTotal) {
            console.log("Player " + i + " has tied the dealer. Push to next game.")
        }
        else {
            console.log("Player " + i + " has lost.")
        }
    }
}



// if total is >= 17, then report total (could be stand or bust)
// special behavior for blackjacks and aces
// dealerHand.hasAces()

    // special behavior for blackjacks and aces
    // dealerHand.hasAces()