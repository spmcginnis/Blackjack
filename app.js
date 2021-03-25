let Stack = require("./stack").Stack
let Hand = require("./hand").Hand
let Card = require("./card").Card

let stack = new Stack()

for (let card of stack.deck) {
    console.log(card.toString())
}


// For testing // TODO move to testing suite
function handTotal (listOfValues) {
    let hand = new Hand();
    for (let value of listOfValues) {
        hand.addCard(new Card(value, "spades"))
    }
    return hand.getRunningTotal()
}

console.log("Value of sample hand K,2 is " + handTotal( ["king", "two"] ))
console.log("Value of sample hand 5,6 is " + handTotal( ["five", "six"] ))