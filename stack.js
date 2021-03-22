let StandardDeck = require("./standardDeck").StandardDeck

class Stack {
    constructor() {
        this.deck = new StandardDeck().deck
    }

    // shuffle
}

exports.Stack = Stack