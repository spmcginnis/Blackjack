const { Hand } = require("./hand")

exports.processDealerHand = (dealerHand, stack) => {
    // check total if total is less than 17, hit
    
    while (dealerHand.getRunningTotal() < 17 || softAceCheck(dealerHand)) {
        let card = stack.drawOne()
        dealerHand.addCard(card)
        console.log("Dealer drew a card: " + card.toString())
        console.log("New running total: " + dealerHand.getRunningTotal())
    }
    return dealerHand
}

function softAceCheck(dealerHand) {
    //check if it has an ace and if that ace's value is 11
    if (dealerHand.getRunningTotal() === 17 && dealerHand.hasAces()) {
        //count the aces and store
        let aceCount = dealerHand.cards.filter(card => card.faceValue === "ace").length
        //remove the aces
        let tempHand = new Hand(dealerHand.cards.filter(card => card.faceValue !== "ace"))
        // compare the remaining cards plus the number of aces to 7
        return tempHand.getRunningTotal() + aceCount === 7
    }
    return false
    
}

exports.softAceCheck = softAceCheck

// AI Player Hand
const processAIPlayerHand = (name = "AI", hand, stack) => {
    while (hand.getRunningTotal() < 18) {
        let card = stack.drawOne()
        hand.addCard(card)
        console.log(`${name} drew a card: ${card.toString()}`)
        console.log("New running total: " + hand.getRunningTotal())
    }
}
exports.processAIPlayerHand = processAIPlayerHand

const deal = (allHands, stack) => {
    for (let hand of allHands){
        let card = stack.drawOne()
        hand.addCard(card)
    }
    for (let hand of allHands){
        let card = stack.drawOne()
        hand.addCard(card)
    }
}
exports.deal = deal

// if dealer total is >= 17, then report total (could be stand or bust)
// busted case // stand case
exports.scoreHands = (dealerHand, allHands) => {

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