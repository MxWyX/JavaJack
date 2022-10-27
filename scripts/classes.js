
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
    if (this.value() > 21 ) {
      return true;
    } else {
      return false;
    }
  }
}

class Human extends Player {
  constructor(name,balance) {
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
      this
    }
    this.bet(0);
  }
}

class Dealer extends Player {
  constructor(hand) {
    super(hand);
    this._handSize = this._hand.length;
    this._stick = false;
  }

  get handSize() {
    return this._handSize;
  }

  get stick() {
  return this._stick;
  }

  stick() {
    this._stick = true;
  }

  dealerTurn() {
    while (!this.stick) {
      if (this.value() >= 18 ){
        this.stick;
      } else {
        let card = game.deal();
        game.reveal('dealer',card);
        this.dealHand(card);
        if (this.bust()) {

        }
      }
    }
  }
}

//   choice() {
//   }
// }
// if (this.handSize = 2) {
//   this.first();
// } else if (this.handSize = 3 ) {
//   this.second();
// } else if (this.handSize = 4) {
//   this.third();
// } else {
//   this.stick;
// }
//   first() {

//   }

//   second() {

//   }

//   third() {

//   }


