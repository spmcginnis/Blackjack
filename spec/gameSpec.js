const Game = require("../game")
const { Stack } = require("../stack")
const { Hand } = require("../hand")
const { Card } = require("../card")
const { Player } = require("../player")

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

describe("Split handling", () => {
    it("correctly splits when there are two equal face-values of six", () => {
        let player = new Player("testname")
        let hand = new Hand()
        let stack = new Stack([
            new Card("ten", "diamonds"),
            new Card("five", "diamonds")
        ])
        hand.addCard(new Card("six", "spades"))
        hand.addCard(new Card("six", "hearts"))

        let splitHands= Game.executeSplit(player, hand, stack)

        expect(splitHands[0].getRunningTotal()).toEqual(11)
        expect(splitHands[1].getRunningTotal()).toEqual(16)
    })
})

describe("Hand resolution", ()=> {
    let player = new Player("testname")

    it("accounts for player busts", ()=> {
        let dealerHand = new Hand([new Card("ten", "spades"), new Card("eight", "spades")])
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("eight", "spades")]
            )

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("busted")
    })

    it("player hand beats dealer hand but is not a blackjack", ()=> {
        let dealerHand = new Hand([new Card("ten", "spades"), new Card("eight", "spades")])
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("four", "spades")]
            )

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("won")
    })

    it("if dealer and player both have a blackjack the result is a push", ()=> {
        let dealerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])
        let playerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("push")
    })

    it("dealer has non-blackjack 21 and player has blackjack -- player wins", ()=> {
        let dealerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("six", "spades")])
        let playerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("blackjack")
    })

    it("player has non-blackjack 21 and dealer has blackjack -- player loses", ()=> {
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("six", "spades")])
        let dealerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("loss")
    })

    
    it("dealer has blackjack and player has less than 21-- player loses", ()=> {
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("four", "spades")])
        let dealerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("loss")
    })

    it("player and dealer both bust with same amount -- still a player loss", ()=> {
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("seven", "spades")]
            )
        let dealerHand = playerHand

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("busted")
    })

    it("player has blackjack and dealer busts", ()=>{
        let playerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])
        let dealerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("seven", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("blackjack")
    })

    it("player has blackjack and dealer has less than 21", ()=>{
        let playerHand = new Hand([new Card("ten", "spades"), new Card("ace", "spades")])
        let dealerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("four", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("blackjack")
    })

    it("player has less than blackjack dealer busts", ()=>{
        let playerHand = new Hand([new Card("ten", "spades"), new Card("eight", "spades")])
        let dealerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("seven", "spades")])

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("won")
    })

    it("player and dealer both stand with same amount but not blackjack -- push", ()=> {
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("four", "spades")]
            )
        let dealerHand = playerHand

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("push")
    })

    it("player and dealer both stand and player has less -- player loss", ()=> {
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("four", "spades")]
            )
        let dealerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades"),
            new Card("five", "spades")]
            )

        expect(Game.resolveHand(player, playerHand, dealerHand)[1]).toEqual("loss")
    })

})

describe ("Double Down Trigger", ()=> {
    it ("Should not double down", ()=> {
        let playerHand = new Hand(
            [new Card("ten", "spades"),
            new Card("five", "spades")]
        )
        let dealerShowing = new Card("six", "hearts")

        expect(Game.shouldDoubleDown(playerHand, dealerShowing)).toBe(false)
    })
    it ("case one: 9 and no ace, dealer has two to six", ()=> {
        let playerHand = new Hand(
            [new Card("four", "spades"),
            new Card("five", "spades")]
        )
        let dealerShowing = new Card("six", "hearts")

        expect(Game.shouldDoubleDown(playerHand, dealerShowing)).toBe(true)
    })
    it ("case two: 10 or 11 no ace, dealer is showing less than this amount.", ()=> {
        let playerHand = new Hand(
            [new Card("six", "spades"),
            new Card("five", "spades")]
        )
        let dealerShowing = new Card("king", "hearts")

        expect(Game.shouldDoubleDown(playerHand, dealerShowing)).toBe(true)
    })
    it ("case three: 16, 17, or 18 and one card is an ace, dealer has two to six", ()=> {
        let playerHand = new Hand(
            [new Card("ace", "spades"),
            new Card("five", "spades")]
        )
        let dealerShowing = new Card("six", "hearts")

        expect(Game.shouldDoubleDown(playerHand, dealerShowing)).toBe(true)
    })
})