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

describe("Splitting evaluation", () => {
    it("canSplit is false with non-equal face cards", ()=>{
        let hand = new Hand()
        hand.addCard(new Card("king", "spades"))
        hand.addCard(new Card("queen", "diamonds"))
        expect(hand.canSplit()).toBe(false)
    })
    it("canSplit is true with equal face-valued face cards", ()=>{
        let hand = new Hand()
        hand.addCard(new Card("king", "spades"))
        hand.addCard(new Card("king", "diamonds"))
        expect(hand.canSplit()).toBe(true)
    })
})

describe("Hand evaluation", () => {
    let hand;
    beforeEach(() => { hand = new Hand() })

    //isBusted true
    it("isBusted when total is over 21.", ()=> {
        hand.addCard(new Card("ten", "spades"))
        hand.addCard(new Card("ten", "diamonds"))
        hand.addCard(new Card("ten", "hearts"))
        expect(hand.isBusted()).toBe(true)
    });
    //isBusted false
    it("!isBusted when total is not over 21.", ()=> {
        hand.addCard(new Card("ten", "spades"))
        hand.addCard(new Card("ace", "diamonds"))
        expect(hand.isBusted()).toBe(false)
    });
    //isBlackjack true
    it("isBlackjack when two cards are an ace and a value=10 card.", ()=> {
        hand.addCard(new Card("ten", "spades"))
        hand.addCard(new Card("ace", "diamonds"))
        expect(hand.isBlackjack()).toBe(true)
    });
    //isBlackjack false
    it("!isBlackjack when two cards are not ace and a value=10 card.", ()=> {
        hand.addCard(new Card("ten", "spades"))
        hand.addCard(new Card("nine", "diamonds"))
        expect(hand.isBlackjack()).toBe(false)
    });
    //isBlackjack false
    it("!isBlackjack when more than two cards.", ()=> {
        hand.addCard(new Card("ten", "spades"))
        hand.addCard(new Card("ace", "diamonds"))
        hand.addCard(new Card("ace", "hearts"))
        expect(hand.isBlackjack()).toBe(false)
    });
});