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
        allHands.push(new Hand())
    }
    allHands.push(dealerHand)

    deal(allHands, stack)

    // Gameplay Loop
    // not a dealer
    for (let i=0; i<allHands.length -1; i++){
        let name = playerList[i]
        let playerHandArray = (allHands[i].canSplit()) ?
            executeSplit(name, allHands[i], stack) :
            [allHands[i]]

        for (let hand of playerHandArray) {
        resultHands.push(
            {name: name, hand: processAIPlayerHand(name, hand, stack)}
            )
        }
    }

    // dealer
    processDealerHand(dealerHand, stack)

    // End Score
    scoreHands(dealerHand, resultHands)
}
exports.round = round

const executeSplit = (name, hand, stack) => {
    console.log(`${name} has a split on ${hand.cards[0].faceValue}`)
    let splitHands = []
    
    for (let splitCard of hand.cards)
    {
        let newHand = new Hand()
        newHand.addCard(splitCard)
        let newCard = stack.drawOne()
        console.log(newCard.toString())
        newHand.addCard(newCard)
        splitHands.push(newHand)
    }
    
    return splitHands
}
exports.executeSplit = executeSplit

// if dealer total is >= 17, then report total (could be stand or bust)
// busted case // stand case
const scoreHands = (dealerHand, resultHands) => {
    // Logging the total scores
    for (let result of resultHands){ 
        console.log(`${result.name} total is ${result.hand.getRunningTotal()}`)
    }

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