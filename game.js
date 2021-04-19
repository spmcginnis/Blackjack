let Hand = require("./hand").Hand

exports.processDealerHand = (dealerHand, stack) => {
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