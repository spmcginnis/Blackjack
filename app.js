let Stack = require("./stack").Stack

let stack = new Stack();

for (let card of stack.deck) {
    console.log(card.toString())
}