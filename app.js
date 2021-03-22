let Stack = require("./stack").Stack

let stack = new Stack().shuffle();

for (let card of stack.deck) {
    console.log(card.toString())
}