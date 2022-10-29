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
document.querySelector("#twist").addEventListener("click", (event) => {
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
  if (document.querySelector("#bet-start").value <= document.querySelector('#balance').textContent) {
    document.querySelector("#bet").textContent = document.querySelector("#bet-start").value;
    begin();
  } else {
    document.querySelector("#winner").textContent = "bet too high";
    document.querySelector("#bet-start").textContent = "";
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
