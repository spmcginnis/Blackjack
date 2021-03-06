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
const processAIPlayerHand = (player, hand, stack, dealerShowing) => {
    
    const addCardWithMessage = () => {
        let card = stack.drawOne()
        hand.addCard(card)
        console.log(`${player.name} drew a card: ${card.toString()} New total: ${hand.getRunningTotal()}`)
    }

    // shouldDoubleDown(hand, dealerFaceCard)
    if (shouldDoubleDown(hand, dealerShowing) && (player.chips >= hand.ante)) 
    {
        // do the betting stuff
        player.chips -= hand.ante
        hand.bet += hand.ante

        console.log("Doubling Down.  New bet is " + hand.bet)
        addCardWithMessage()
    } else {
        while (hand.getRunningTotal() < 18) {
            addCardWithMessage()
        }
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

const round = (playerList, stack, ante = 1) => {
    let dealerHand = new Hand()
    let allHands = []
    let resultHands = []

    // filter players with no chips
    let activePlayers = playerList.filter(player => player.chips >= ante)
    let inactivePlayers = playerList.filter(player => !(player.chips >= ante))
    for (let player of inactivePlayers)
    {
        console.log(`${player.name} cannot afford the ante.`)
    }

    // Setting the table
    for (let player of activePlayers) {
        allHands.push(new Hand([], ante))
        player.chips -= ante
    }

    allHands.push(dealerHand)

    deal(allHands, stack)

    // Gameplay Loop
    // not a dealer
    for (let i=0; i<allHands.length -1; i++){

        let player = activePlayers[i]
        let playerHandArray = (allHands[i].canSplit() && player.chips >= ante) ?
            executeSplit(player, allHands[i], stack) :
            [allHands[i]]

        for (let hand of playerHandArray) {
        resultHands.push(
            {player: player, hand: processAIPlayerHand(player, hand, stack, dealerHand.cards[1])}
            )
        }
    }

    // dealer
    processDealerHand(dealerHand, stack)

    // End Score
    scoreHands(dealerHand, resultHands)
}
exports.round = round

const executeSplit = (player, hand, stack) => {
    console.log(`${player.name} has a split on ${hand.cards[0].faceValue}`)
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
        console.log(`${result.player.name} total is ${result.hand.getRunningTotal()}`)
    }

    if (!dealerHand.isBusted()) {
        let dealerTotal = dealerHand.getRunningTotal()
        console.log("Dealer stands with "  + dealerTotal)
    }

    for (let {player, hand} of resultHands) {
        let adjustment = resolveHand(player, hand, dealerHand)[0]
        player.chips += adjustment
        console.log(`${player.name} receives ${adjustment} chips. Total chips: ${player.chips}`)
    }
    
    let winners = [] // placeholder
    return winners
}
exports.scoreHands = scoreHands

const resolveHand = (player, hand, dealerHand) => {
    
    let winnings = hand.bet *2

    if (hand.isBusted()) {
        console.log(player.name + " has busted.")
        return [0, "busted"]
    }
    else if (hand.isBlackjack() && !dealerHand.isBlackjack()) {
        console.log(player.name  + " has won with a blackjack.")
        return [winnings * 1.5, "blackjack"]
    }
    else if (dealerHand.isBusted())
    {
        console.log(player.name  + " has won.")
        return [winnings, "won"]
    }
    else if (!hand.isBlackjack() && dealerHand.isBlackjack()) {
        console.log(player.name  + " has won with a blackjack.")
        return [0, "loss"]
    }
    else if (hand.getRunningTotal() > dealerHand.getRunningTotal()) {
        console.log(player.name  + " has won.")
        return [winnings, "won"]
    } 
    else if (hand.getRunningTotal() === dealerHand.getRunningTotal()) {
        console.log(player.name  + " has tied the dealer. Push to next game.")
        return [hand.bet, "push"]
    }
    else {
        console.log(player.name  + " has lost.")
        return [0, "loss"]
    }   
}
exports.resolveHand = resolveHand

const shouldDoubleDown = (hand, dealerFaceCard) => {
    // check the number of cards ... make sure there are only two

    let total = hand.getRunningTotal()
    let soft = hand.hasAces()
    let dealerShowing = dealerFaceCard.getValue()
    // case one: 9 and no ace, dealer has two to six
    if (total === 9 && !soft && (dealerShowing <= 6 && dealerShowing >= 2)) {
        return true
    }

    // case two: 10 or 11 no ace, dealer is showing less than this amount.
    if (!soft && (total === 10 || total === 11) && dealerShowing < total ) {
        return true
    }
    // case three: 16, 17, or 18 and one card is an ace, dealer has two to six
    if (soft && (total >= 16 && total <= 18) && (dealerShowing <= 6 && dealerShowing >= 2))
    {
        return true
    }
    
    return false
}
exports.shouldDoubleDown = shouldDoubleDown