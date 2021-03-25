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
        let aces = 0

        for (let card of this.cards) {
            if (card.faceValue === "ace") {aces++}
            total += card.getValue()
        }

        if (aces > 0) {
            for (let i = 0; i<aces; i++) {
                if (total + 10 <= 21) {total += 10}
            }
        }

        return total
    }

}

exports.Hand = Hand