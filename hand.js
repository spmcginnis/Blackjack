let Card = require("./card").Card

class Hand {
    constructor(cards=[]) {
        this.cards = cards
    }

    addCard(card) {
        this.cards.push(card)
    }

    getRunningTotal() {
        let total = 0
        for (let card of this.cards) {
            total += card.getValue()
        }
        return total
    }

}

exports.Hand = Hand