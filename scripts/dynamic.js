// Header start

// Mobile start menu start
// on click of burger menu, open start play menu
document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".burger").classList.toggle("hide");
  document.querySelector(".start-game").classList.toggle("hide");
});

document.querySelector(".start-game").addEventListener("mouseleave", () => {
  document.querySelector(".burger").classList.toggle("hide");
  document.querySelector(".start-game").classList.toggle("hide");
});
// Mobile start menu end

// Close menu on play
document.querySelector("#play").addEventListener("click", () => {
  event.preventDefault();
  document.querySelector(".start-game").style.display = "none";
  document.querySelector(".restart-game").style.display = "block";
  document.querySelector(".start-bet").classList.toggle("hide");
});

document.querySelector("#restart").addEventListener("click", () => {
  event.preventDefault();
  document.querySelector(".start-game").style.display = "block";
  document.querySelector(".restart-game").style.display = "none";
  // And delete player name, bal
});

// Header end

// Player area start

// Start game
document.querySelector("#play").addEventListener("click", __init__);

// Twist
document.querySelector("#twist").addEventListener("click", (event) => {
  twist(event, "player");
});

// allow the player to start the game but placing a bet on their cards, then reveal the gameplay button options
document.querySelector("#start").addEventListener("click", (player) => {
  event.preventDefault();
  player.bet = document.querySelector("#bet").value;
  document.querySelector("#bet").textContent =
    document.querySelector("#bet-start").value;
  document.querySelector(".twist-stick").classList.toggle("hide");
  document.querySelector(".start-bet").classList.toggle("hide");
});

// dynamically update the "console" to show winnings, losings, bet amounts

// Reveal the cards? though this is set up in the app file as part of a function already

// Player area end

// Dealer area start

// flip one card, then flip them all on bust or stick

// Dealer area end
