let Card = require("./card").Card

class StandardDeck {
    constructor() {
        const SUITS = ["clubs", "diamonds", "hearts", "spades"];
        const FACE_VALUES = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];

        // const faceValues = {
        //     ACE: 1,
        //     TWO: 2,

        // }

        this.deck = [];

        for (let suit of SUITS) {
            for (let value of FACE_VALUES){
                this.deck.push(new Card(value, suit))
            }
        }
    }
}

exports.StandardDeck = StandardDeck;