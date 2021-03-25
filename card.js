class Card {
    constructor(faceValue, suit) {
        this.faceValue = faceValue;
        this.suit = suit;
    }

    toString() {
        return (`${this.faceValue} of ${this.suit}, worth ${this.getValue()} points.`)
    }

    getValue() {
        return this.cardValueLookup()[this.faceValue]
    }

    cardValueLookup() {
        return {
            "ace": 1, // TODO
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9,
            "ten": 10,
            "jack": 10,
            "queen": 10,
            "king": 10
        }
    }
}

exports.Card = Card