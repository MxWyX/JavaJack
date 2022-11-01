// Player and dealer classes

class Player {
  constructor() {
    this._hand = [];
  }

  get hand() {
    return this._hand;
  }

  resetHand() {
    this._hand = [];
  }

  dealHand(card) {
    this._hand.push(card[1]);
  }

  value() {
    let cardVal = this.hand.map((card) => {
      if (card > 10) {
        return 10;
      } else {
        return card;
      }
    });
    return cardVal.reduce((partialSum, a) => partialSum + a, 0);
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
  bet(amount) {
    this._bet = Number(amount);
  }

  balanceChange(win) {
    // console.log(this.player.balance);
    if (win) {
      Number(this._balance) = + Number(this.bet);
    } else {
      Number(this._balance) = - Number(this.bet);
    }
    document.querySelector("#balance").textContent = Number(this.balance);
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
    let card = game.deal();
    game.reveal("dealer", card);
    this.dealHand(card);
    while (this.value() <= 18) {
      let card = game.deal();
      game.reveal("dealer", card);
      this.dealHand(card);
      if (this.value() > 21) {
        game.gameOver(1, 0);
      }
    }
    this.stick;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Game logic

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
    document.querySelector("#bet").textContent = "";
    if (dVal > pVal || dVal == pVal) {
      document.querySelector("#winner").textContent = "Dealer wins.";
      this.player.balanceChange(false);
      document.querySelector(".twist-stick").style.display = "none";
    } else {
      document.querySelector(
        "#winner"
      ).textContent = `${this.player.name} wins.`;
      this.player.balanceChange(true);
      document.querySelector(".twist-stick").style.display = "none";
    }
    if (Number(this.player.balance) > 0) {
      this.restartGame();
      this.startGame(this.player, this.dealer);
    } else {
      document.querySelector("#winner").textContent = "Game Over.";
      document.querySelector(".twist-stick").style.display = "none";
    }
    document.querySelector('#winner').textContent = '';
  },
  dealer: new Dealer(),
  player: {},
  __init__() {
    this.player = new Human(
      document.querySelector("#player-name").value,
      Number(document.querySelector("#starting-bal").value)
    );
    this.startGame(this.player, this.dealer);
  },
  startGame(player, dealer) {
    let card = this.deal();
    this.reveal("player", card);
    player.dealHand(card);
    card = this.deal();
    this.reveal("player", card);
    player.dealHand(card);
    card = this.deal();
    this.reveal("dealer", card);
    dealer.dealHand(card);
  },
  twist() {
    let card = game.deal();
    game.reveal("player", card);
    this.player.dealHand(card);
    if (this.player.value() > 21) {
      this.gameOver(0, 1);
    }
  },
  stick() {
    let card = this.deal();
    this.reveal("dealer", card);
    this.dealer.dealHand(card);
    this.dealer.dealerTurn();
    this.gameOver(this.player.value(), this.dealer.value());
  },
  restartGame() {
    document.querySelector("#bet").textContent = "";
    let hand = document.querySelector("#dealer-hand");
    while (hand.firstChild) {
      hand.removeChild(hand.firstChild);
    }
    hand = document.querySelector("#player-hand");
    while (hand.firstChild) {
      hand.removeChild(hand.firstChild);
    }
    this.player.resetHand();
    this.player.bet("");
    this.dealer.resetHand();
    this.dealt = [[], [], [], []];
    // document.querySelector(".start-game").style.display = "block";
    // document.querySelector(".restart-game").style.display = "none";
    this.begin();
  },
  begin() {
    this.player.bet(Number(document.querySelector("#bet-start").value));
    document.querySelector("#bet-start").value = "";
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Dynamic code

// Header start

// Close menu on play
document.querySelector("#restart").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".start-game").style.display = "block";
  document.querySelector(".restart-game").style.display = "none";
  document.querySelector(".start-bet").style.display = "none";
  document.querySelector(".twist-stick").style.display = "none";
  document.querySelector(".console").style.display = "none";
  game.restartGame(event);
  // for (let i = 1; i < game.player.hand.length; ++i) {
  //   document.querySelector("#player-hand").removeChild();
  // }
  // for (let i = 1; i < game.dealer.hand.length; ++i) {
  //   document.querySelector("#dealer-hand").removeChild();
  // }
  // player.resetHand();
  // dealer.resetHand();
  // game.dealt = [[], [], [], []];
  // document.querySelector(".start-game").style.display = "block";
  // document.querySelector(".restart-game").style.display = "none";
  // // And delete player name, bal
});

// Header end

// Player area start

// Start game
document.querySelector("#play").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".start-game").style.display = "none";
  document.querySelector(".restart-game").style.display = "block";
  document.querySelector(".start-bet").style.display = "block";
  document.querySelector(".console").style.display = "block";
  document.querySelector("#balance").textContent =
    document.querySelector("#starting-bal").value;
  game.__init__();
  document.querySelector("#player-name").value = "";
  document.querySelector("#starting-bal").value = "";
});

// Twist
document.querySelector("#twist").addEventListener("click", (event) => {
  event.preventDefault();
  game.twist();
});

// Stick
document.querySelector("#stick").addEventListener("click", (event) => {
  event.preventDefault();
  game.stick(event);
});

// allow the player to start the game but placing a bet on their cards, then reveal the gameplay button options
document.querySelector("#start").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#bet").textContent = "";
  if (
    Number(document.querySelector("#bet-start").value) >
      document.querySelector("#balance").textContent ||
    document.querySelector("#bet-start").value === ""
  ) {
    document.querySelector("#winner").textContent = "Can't bet that";
    document.querySelector("#bet-start").value = "";
  } else {
    document.querySelector("#bet").textContent =
      document.querySelector("#bet-start").value;
    document.querySelector(".start-bet").style.display = "none";
    document.querySelector(".twist-stick").style.display = "block";
    game.begin();
  }
});
