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
console.log("Value of sample hand 5,6,A is " + handTotal( ["five", "six", "ace"]) + " (expect 12)" )
console.log("Value of sample hand A,6,A is " + handTotal( ["ace", "six", "ace"]) + " (expect 18)" )
console.log("Value of sample hand 10,A,2,10 is " + handTotal( ["ten", "ace", "two", "ten"]) + " (expect 23)" )
console.log("Value of sample hand K,A is " + handTotal( ["king", "ace"]) + " (expect 21)" )
console.log("Value of sample hand 5,6,A,A,A is " + handTotal( ["five", "six", "ace", "ace","ace"]) + " (expect 14)" )
console.log("Value of sample hand A,A is " + handTotal( ["ace", "ace"]) + " (expect 12)" )