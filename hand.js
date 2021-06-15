let Card = require("./card").Card

class Hand {
    constructor(cards=[], ante = 0) {
        this.cards = cards
        this.ante = ante // this is not being used
        this.bet = ante
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

    isBusted() {
        return (this.getRunningTotal() > 21);
    }

    isBlackjack() {
        return (
            this.cards.length === 2 &&
            this.cards.some(card => card.faceValue === "ace") &&
            this.cards.some(card => card.cardValueLookup()[card.faceValue] === 10)
        ) 
    }

    hasAces() {
        let aces = this.cards.filter(card => card.faceValue === "ace")
        return aces.length > 0
    }


    copy() {
        return new Hand(Array.from(this.cards))
    }

    canSplit() {
        return this.cards[0].faceValue === this.cards[1].faceValue
    }

}

exports.Hand = Hand