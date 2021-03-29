const { StandardDeck } = require("../standardDeck");

describe("Standard Deck", function() {
    it("Constructs an array of 52 cards", ()=>{
        expect(new StandardDeck().deck.length).toEqual(52);
    });
});