let StandardDeck = require("./standardDeck").StandardDeck

let standardDeck = new StandardDeck();

for (let card of standardDeck.deck) {
    console.log(card.toString())
}