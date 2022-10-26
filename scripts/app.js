// const cards = [101,102,103,104,105,106,107,108,109,110,111,112,113,201,202,203,204,205,206,207,208,209,210,211,212,213,301,302,303,304,305,306,307,308,309,310,311,312,313,401,402,403,404,405,406,407,408,409,410,411,412,413];
// [[1,2,3,4,5,6,7,8,9,10,11,12,13][1,2,3,4,5,6,7,8,9,10,11,12,13][1,2,3,4,5,6,7,8,9,10,11,12,13][1,2,3,4,5,6,7,8,9,10,11,12,13]]
// [[][][][]]

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
        console.log(card);
        console.log(this.dealt);
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
    // player.dealHand(card[1]);
    // add the card to the hand element of the player object to track the game.
  },
  gameOver(pVal, dVal) {
    if (dVal > pVal) {
      // dealer wins
    } else {
      // player wins
    }
  },
};

class Player {
  constructor(name, balance) {
    this._name = name;
    this._balance = balance;
    this._bet = 0;
    this._hand = [];
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

  get hand() {
    return this._hand;
  }

  set bet(amount) {
    this._bet = amount;
  }

  dealHand(card) {
    this._hand.push(card);
  }

  value() {
    return hand.map((card) => {
      if (card > 10) {
        return 10;
      } else {
        return card;
      }
    });
  }

  bust() {
    if (player.value().reduce((partialSum, a) => partialSum + a, 0) > 21) {
      return true;
    } else {
      return false;
    }
  }
}

function __init__() {
  event.preventDefault();
  const dealer = new Player("dealer", 9999999);
  const player = createPlayer();
  document.querySelector("#balance").textContent =
    document.querySelector("#starting-bal").value;
  // storeData(dealer);
  // storeData(player);
  console.log(player);
  console.log(dealer);
  startGame();
}

const storeData = (player) => {
  let playerStore = JSON.stringify(player);
  sessionStorage.setItem(player.name, playerStore);
};

const createPlayer = () => {
  let bal = document.querySelector("#starting-bal").value;
  let name = document.querySelector("#player-name").value;
  return new Player(name, bal);
};

const startGame = () => {
  game.reveal("player", game.deal());
  game.reveal("player", game.deal());
  game.reveal("dealer", game.deal());
};

const twist = (player) => {
  event.preventDefault();
  game.reveal(player, game.deal());
  // Run deal function that will gen card and check if dealt already
  // Add card to players hand list
  // reveal card to player
  // check if player is bust or not
  if (player.bust()) {
    // player loses the game, start dealer turn.
  }
  // if not lost then allow another twist or stick.
};

const stick = () => {
  // this should just trigger the dealer to start to take cards.
  // a separate function for dealer or try to reuse player? nnot sure how to dynamically target different objects as the player and dealer?
};
