const { Stack } = require("./stack")
const { Player } = require("./player")
const Game = require("./game")

let stack = new Stack().shuffle()
// TODO implement multiple decks in a 'shoe'
// const cut = 75
// TODO implement reshuffle at the cut boundary
let playerList = [
    new Player("Bob", 100),
    new Player("Susan", 100),
    new Player("Terry", 100)]

// Move set the table here?

Game.round(playerList, stack)

// Blackjack detections
// Dealer
// Players

// Player logic here

// special behavior for blackjacks and aces











