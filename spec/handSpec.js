const { Hand } = require("../hand");
const { Card } = require("../card");

// Calculates a value for the hand
function handTotal (listOfValues) {
    let hand = new Hand();
    for (let value of listOfValues) {
        hand.addCard(new Card(value, "spades"))
    }
    return hand.getRunningTotal()
}

describe("Hand Totaling", () => {
    let testCases = [
        [["king","two"], 12],
        [["five","six", "ace"], 12],
        [["ace","six", "ace"], 18],
        [["ten","ace","two","ten"], 23],
        [["king","ace"], 21],
        [["five","six","ace","ace","ace"], 14],
        [["ace","ace"], 12]        
    ]
    for (let eachCase of testCases)
    {
        it(`Hand total ${eachCase[0]} is ${eachCase[1]}`, () => {
            expect(handTotal( eachCase[0] )).toEqual(eachCase[1]);
        });
    }
});