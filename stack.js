let StandardDeck = require("./standardDeck").StandardDeck

class Stack {
    constructor() {
        this.deck = new StandardDeck().deck
    }

    shuffle() {
        let placholderArray = this.deck.map( (_card , cardNumber) => {
            
            let t = { n: cardNumber , value: Math.random() }
            return t
        })

        placholderArray.sort((a, b) => {
            console.log(a.n  + ", " + b.n)
            if (a.value > b.value) {
                return 1
            }
            if (a.value < b.value) {
                return -1
            }
            return 0
        })

        this.deck = placholderArray.map( element => { return this.deck[element.n] })

        return this
    }
}

exports.Stack = Stack