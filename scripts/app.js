// classes code
class Player {
  constructor() {
    this._hand = [];
  }

  get hand() {
    return this._hand;
  }

  resetHand() {
    this._hand;
  }

  dealHand(card) {
    this._hand.push(card[1]);
  }

  value() {
    let cardVal = hand.map((card) => {
      if (card > 10) {
        return 10;
      } else {
        return card;
      }
    });
    return cardVal.reduce((partialSum, a) => partialSum + a, 0) > 21;
  }

  bust() {
    if (this.value() > 21) {
      return true;
    } else {
      return false;
    }
  }
}

class Human extends Player {
  constructor(name, balance) {
    super();
    this._name = name;
    this._balance = balance;
    this._bet = 0;
  }

  get name() {
    return this._name;
  }

  get balance() {
    return this._balance;
  }

  get bet() {
    return this._bet;
  }
  // having issues with this bet for some reason
  set bet(amount) {
    this._bet = amount;
  }

  set balance(win) {
    if (win) {
      this._balance + this.bet;
    } else {
      this._balance - this.bet;
      this;
    }
    this.bet(0);
  }
}

class Dealer extends Player {
  constructor(hand) {
    super(hand);
    // this._handSize = this._hand.length;
    this._stick = false;
  }

  // get handSize() {
  //   return this._handSize;
  // }

  get stick() {
    return this._stick;
  }

  stick() {
    this._stick = true;
  }

  dealerTurn() {
    while (!this.stick) {
      if (this.value() >= 18) {
        this.stick;
      } else {
        let card = game.deal();
        game.reveal("dealer", card);
        this.dealHand(card);
        if (this.bust()) {
        }
      }
    }
  }
}
``;

/////////////////////////////////////////////////////////////////////////////////

// App code

const game = {
  // the cards list is ultimately uneccassary and proves that I could have done a random gen between 1/52 to get cards... Idiot. On second thought maybe not tbh, think new multi list way is best.
  // cards:[101,102,103,104,105,106,107,108,109,110,111,112,113,201,202,203,204,205,206,207,208,209,210,211,212,213,301,302,303,304,305,306,307,308,309,310,311,312,313,401,402,403,404,405,406,407,408,409,410,411,412,413],
  dealt: [[], [], [], []],
  deal() {
    // change function to output a card that hasnt been dealt yet so that can be added to the hand straight away.
    let inDealt = true;
    let card = [];
    // use a while loop that will break if the card hasn't already been dealt, if it has it will cycle until it finds one. There are better ways todo this.
    while (inDealt) {
      // Try to have 4 lists with all cards in to make card searching easier?
      card.push(Math.floor(Math.random() * 4));
      // Generate random numbers between 0-3 for suit and then a number between 1-13 for card value.
      card.push(Math.floor(Math.random() * 13 + 1));
      if (this.dealt[card[0]].includes(card[1]) === false) {
        // pass the deal card back out to be processed.
        this.dealt[card[0]].push(card[1]);
        return card;
      } else {
        card = [];
      }
    }
  },
  reveal(player, card) {
    // create the img element with the card ref as the source to append to the hand section of the page.
    let showCard = document.createElement("img");
    showCard.src = `./assets/img/${card[0]}/${card[1]}.png`;
    document.querySelector(`#${player}-hand`).appendChild(showCard);
    // add the card to the hand element of the player object to track the game.
  },
  gameOver(pVal, dVal) {
    if (dVal > pVal) {
      document.querySelector("#console").textContent = "Dealer wins.";
    } else {
      document.querySelector("#console").textContent = `${player.name} wins.`;
    }
    restartGame();
  },
  __init__() {
    const dealer = new Dealer();
    const player = createPlayer();
    document.querySelector("#balance").textContent =
      document.querySelector("#starting-bal").value;
    startGame(player, dealer);
  },
  createPlayer() {
    let bal = document.querySelector("#starting-bal").value;
    let name = document.querySelector("#player-name").value;
    return new Human(name, bal);
  },
  startGame(player, dealer) {
    let card = game.deal();
    game.reveal("player", card);
    player.dealHand(card);
    card = game.deal();
    game.reveal("player", card);
    player.dealHand(card);
    card = game.deal();
    game.reveal("dealer", card);
    dealer.dealHand(card);
  },
  twist(player) {
    let card = game.deal();
    game.reveal("player", card);
    player.dealHand(card);
    if (player.bust()) {
      player.balance(false);
      // restart function
    }
  },
  stick(player, dealer) {
    let card = game.deal();
    game.reveal("dealer", card);
    dealer.dealHand(card);
    dealer.dealerTurn();
    game.gameOver(player.value(), dealer.value());
  },
  restartGame() {
    for (let i = 1; i < player.hand.length; ++i) {
      document.querySelector("#player-hand").removeChild();
    }
    for (let i = 1; i < dealer.hand.length; ++i) {
      document.querySelector("#dealer-hand").removeChild();
    }
    player.resetHand();
    dealer.resetHand();
    game.dealt = [[], [], [], []];
    begin();
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Dynamic code

// Header start

// Mobile start menu start
// on click of burger menu, open start play menu
// Mobile start menu end

// Close menu on play
document.querySelector("#play").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".start-game").style.display = "none";
  document.querySelector(".restart-game").style.display = "block";
  document.querySelector(".start-bet").classList.toggle("hide");
  document.querySelector(".console").classList.toggle("hide");
});

document
  .querySelector("#restart")
  .addEventListener("click", (event, player, dealer) => {
    event.preventDefault();
    for (let i = 1; i < player.hand.length; ++i) {
      document.querySelector("#player-hand").removeChild();
    }
    for (let i = 1; i < dealer.hand.length; ++i) {
      document.querySelector("#dealer-hand").removeChild();
    }
    player.resetHand();
    dealer.resetHand();
    game.dealt = [[], [], [], []];
    document.querySelector(".start-game").style.display = "block";
    document.querySelector(".restart-game").style.display = "none";
    // And delete player name, bal
  });

// Header end

// Player area start

// Start game
document.querySelector("#play").addEventListener("click", (event) => {
  event.preventDefault();
  __init__();
});

// Twist
document.querySelector("#twist").addEventListener("click", (event, player) => {
  event.preventDefault();
  twist(player);
});

// Stick
document.querySelector("#stick").addEventListener("click", (event) => {
  event.preventDefault();
  stick(event, player, dealer);
});

// allow the player to start the game but placing a bet on their cards, then reveal the gameplay button options
document.querySelector("#start").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#bet").textContent = "";
  if (
    document.querySelector("#bet-start").value <=
    document.querySelector("#balance").textContent
  ) {
    document.querySelector("#bet").textContent =
      document.querySelector("#bet-start").value;
    begin();
  } else {
    document.querySelector("#winner").textContent = "bet too high";
    document.querySelector("#bet-start").value = "";
  }
});

const begin = () => {
  document.querySelector(".twist-stick").classList.toggle("hide");
  document.querySelector(".start-bet").classList.toggle("hide");
};

// dynamically update the "console" to show winnings, losings, bet amounts

// Reveal the cards? though this is set up in the app file as part of a function already

// Player area end

// Dealer area start

// This is obsolete now that the everything is through object methods
// flip one card, then flip them all on bust or stick

// Dealer area end
