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

processDealerHand(dealerHand, stack)
scoreHands(dealerHand, allHands)

// Blackjack detections
// Dealer
// Players

// Player logic here

// special behavior for blackjacks and aces


function processDealerHand(dealerHand, stack){
    // check total if total is less than 17, hit
    
    while (dealerHand.getRunningTotal() <= 17) { 
        let card = stack.drawOne()
        dealerHand.addCard(card)
        console.log("Dealer drew a card: " + card.toString())
        console.log("New running total: " + dealerHand.getRunningTotal())
        
        // TODO test this behavior for the aces special case
        // five ace ace
        // two four ace
        // six ace
        if (dealerHand.getRunningTotal() === 17 && dealerHand.hasAces()) {
            console.log("Dealer has 17 with at least one ace.")
            //check if it has an ace and if that ace's value is 11
            let firstAce = dealerHand.cards.find(card => card.faceValue === "ace")
            let tempHand = new Hand(Array.from(dealerHand.cards))
            tempHand.cards.splice(dealerHand.cards.indexOf(firstAce), 1)
            if (tempHand.getRunningTotal() === 6) {
                let card = stack.drawOne()
                dealerHand.addCard(card)
                console.log("Dealer drew a card: " + card.toString())
                console.log("New running total: " + dealerHand.getRunningTotal())
            }
        }
    }
    return dealerHand
}

// if dealer total is >= 17, then report total (could be stand or bust)
// busted case // stand case
function scoreHands(dealerHand, allHands){

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
    let winners = [] // placeholder
    return winners
}





