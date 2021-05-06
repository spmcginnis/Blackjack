const { Hand } = require("./hand")

const processDealerHand = (dealerHand, stack) => {
    // check total if total is less than 17, hit
    
    while (dealerHand.getRunningTotal() < 17 || softAceCheck(dealerHand)) {
        let card = stack.drawOne()
        dealerHand.addCard(card)
        console.log("Dealer drew a card: " + card.toString())
        console.log("New running total: " + dealerHand.getRunningTotal())
    }
    return dealerHand
}
exports.processDealerHand = processDealerHand


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
    return hand
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

const round = (playerList, stack) => {
    let dealerHand = new Hand()
    let allHands = []
    let players = playerList.length
    let resultHands = []


    // Setting the table
    for (let i = 0; i<players; i++) {
        let hand = new Hand()
        allHands.push(hand)
    }
    allHands.push(dealerHand)

    deal(allHands, stack)

    // Gameplay Loop
    // not a dealer
    for (let i=0; i<allHands.length -1; i++){
        let name = playerList[i]
        let playerHand = allHands[i]

        // handle the split here
        if (playerHand.canSplit())
        {
            console.log(`${name} has a split on ${playerHand.cards[0].faceValue}`)
            // splitting logic
            
            for (let splitCard of playerHand.cards)
            {
                let newHand = new Hand()
                newHand.addCard(splitCard)
                newHand.addCard(stack.drawOne())
                resultHands.push(
                    {name: name, hand: processAIPlayerHand(name, newHand, stack)}
                    )
            }

        } else {
            resultHands.push(
                {name: name, hand: processAIPlayerHand(name, allHands[i], stack)}
                )
        }



    }



    // dealer
    processDealerHand(dealerHand, stack)

    // Debugging
    for (let i=0; i<allHands.length; i++){
        let handHolder = (i < allHands.length - 1) ? playerList[i] : "dealer"
        console.log(`${handHolder} total is ${allHands[i].getRunningTotal()}`)
    }
    
    // End Score
    scoreHands(dealerHand, resultHands)
}
exports.round = round


// if dealer total is >= 17, then report total (could be stand or bust)
// busted case // stand case
const scoreHands = (dealerHand, resultHands) => {

    if (dealerHand.isBusted()) {
        console.log("Dealer has busted.")
        for (let i=0; i<resultHands.length; i++) {
            if (!resultHands[i].hand.isBusted()) {
                console.log(resultHands[i].name  + " has won.")
            }
            // TODO report players that busted when the dealer also busted
        }
    } else {
        let dealerTotal = dealerHand.getRunningTotal()
        console.log("Dealer stands with "  + dealerTotal)
        
        for (let i=0; i<resultHands.length; i++) {
            let {name, hand} = resultHands[i]
            if (hand.isBusted()) {
                console.log(name + " has busted.")
            }
            else if (hand.getRunningTotal() > dealerTotal) {
                console.log(name  + " has won.")
            } 
            else if (hand.getRunningTotal() === dealerTotal) {
                console.log(name  + " has tied the dealer. Push to next game.")
            }
            else {
                console.log(name  + " has lost.")
            }
        }
    }
    let winners = [] // placeholder
    return winners
}
exports.scoreHands = scoreHands