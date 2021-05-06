const Game = require("../game")
const { Stack } = require("../stack")
const { Hand } = require("../hand")
const { Card } = require("../card")


describe("Dealer hit test", () => {
    it("should not try to draw a card", () => {
        let hand = new Hand()
        let stack = new Stack([])
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("seven", "spades"))
        Game.processDealerHand(hand, stack)

        expect(hand.cards.length).toEqual(3)
        expect(hand.getRunningTotal()).toEqual(17)
    })

    it("should stand with 17", () => {
        let hand = new Hand()
        let stack = new Stack([new Card("ten", "diamonds")])
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("seven", "spades"))
        Game.processDealerHand(hand, stack)

        expect(hand.cards.length).toEqual(3)
        expect(hand.getRunningTotal()).toEqual(17)
    })

    it("should hit with 15", () => {
        let hand = new Hand()
        let stack = new Stack([new Card("ten", "diamonds")])
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("five", "spades"))
        Game.processDealerHand(hand, stack)

        expect(hand.cards.length).toEqual(4)
        expect(hand.getRunningTotal()).toEqual(25)
    })
})

// TODO test this behavior for the aces special case
// five ace ace
// two four ace
// six ace
// This is called a "soft 17" ... some casinos use this rule.
// Seven aces edge case? Prob not needed
describe("Soft 17 handling", () => {
    it("checks a dealer hand with a value of 17 to see if there is an ace of value 11 and hits if necessary", () => {
        let hand = new Hand()
        let stack = new Stack([new Card("ten", "diamonds")])
        hand.addCard(new Card("five", "spades"))
        hand.addCard(new Card("ace", "spades"))
        hand.addCard(new Card("ace", "spades"))
        expect(hand.cards.length).toEqual(3)
        expect(hand.getRunningTotal()).toEqual(17)

        Game.processDealerHand(hand, stack)

        expect(hand.cards.length).toEqual(4)
        expect(hand.getRunningTotal()).toEqual(17)
    })

    it("checks a dealer hand with a value of 17 to see if there is an ace of value 11 and hits if necessary", () => {
        let hand = new Hand()
        let stack = new Stack([new Card("ten", "diamonds")])
        hand.addCard(new Card("two", "spades"))
        hand.addCard(new Card("four", "spades"))
        hand.addCard(new Card("ace", "spades"))
        expect(hand.cards.length).toEqual(3)
        expect(hand.getRunningTotal()).toEqual(17)

        Game.processDealerHand(hand, stack)

        expect(hand.cards.length).toEqual(4)
        expect(hand.getRunningTotal()).toEqual(17)
    })

    it("checks a dealer hand with a value of 17 to see if there is an ace of value 11 and hits if necessary", () => {
        let hand = new Hand()
        let stack = new Stack([new Card("ten", "diamonds")])
        hand.addCard(new Card("six", "spades"))
        hand.addCard(new Card("ace", "spades"))
        expect(hand.cards.length).toEqual(2)
        expect(hand.getRunningTotal()).toEqual(17)

        Game.processDealerHand(hand, stack)

        expect(hand.cards.length).toEqual(3)
        expect(hand.getRunningTotal()).toEqual(17)
    })
})
