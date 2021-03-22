class Card {
    constructor(faceValue, suit) {
        this.faceValue = faceValue;
        this.suit = suit;
    }

    toString() {
        return (`${this.faceValue} of ${this.suit}`)
    }
}

exports.Card = Card;