let StandardDeck = require("./standardDeck").StandardDeck

class Stack {
    constructor() {
        this.deck = new StandardDeck().deck
    }

    shuffle() {
        let mappingArray = this.deck.map( (_card , cardNumber) => {
            return {n: cardNumber , value: Math.random()}
        })

        mappingArray.sort((a, b) => {
            if (a.value > b.value) {
                return 1
            }
            if (a.value < b.value) {
                return -1
            }
            return 0
        })

        this.deck = mappingArray.map( element => { return this.deck[element.n] })

        return this
    }
}

exports.Stack = Stack