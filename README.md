A blackjack card game for practicing card games.

Setup:
```
npm install
```

To run:
```
node app.js
```

To run the tests:
```
npm test
```

# Gameplay Loop

1. Ante
2. Cards are dealt
    b. Insurance check -- happens after the intial deal, but before the player turns.
    c. Maybe skip ahead to 5.
3. Player Turns (for each...)
    a. Amended bet phase (double down or splitting)
    b. Player Turn Resolution
4. Dealer Turn
5. Round resolution


# Tasks
## TODO
Soon: Circle CI
AI choice/decision-making 

Betting and persistent scoring

Reporting

Insurance

## DONE
Set up testing suite
Splitting logic works but no AI choice
Blackjack handling
