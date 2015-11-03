var PLAYER_LOOT = 100;

var onClickStart = function() {
  $("#playerloot").text(PLAYER_LOOT + " coins left");
  $("#message").text( "Place a bet between 5 and 10 coins" );
  $("#start").replaceWith(["<input type='number' id='coins' />" , "<br clear='left'/> ","<button id='placedbet' class='pure-button'>BET!</button>"]);
  getBet();
};

$( "#start" ).click(onClickStart);

function getBet(){
  $( "#placedbet" ).click(function() {
    var coins = $('#coins').val();
    var pot = coins;
    $("#playerloot").text(PLAYER_LOOT + " coins left");
    $("#message").text( "guess a number between 1 and 10, " + pot + ' in the pot.' );
    $("#coins").replaceWith("<input type='number' id='guess'/>");
    $("#placedbet").replaceWith("<button id='guesssubmit' >GUESS!</button>");
    getGuess(coins)
  });
}

function getGuess(coins) {
  $( "#guesssubmit" ).click(function() {
    var guess = $("#guess").val();
    var solution = Math.floor(Math.random() * 10) + 1;
    checkGuess(guess, coins, solution);
  });
}

function checkGuess(guess, coins, solution) {
  $("#guess").remove();
  $("#guesssubmit").remove();
  var num_guess = parseInt(guess);
  var coins = parseInt(coins);
  if (num_guess === solution) {
    $("#message").text( 'YOU WIN!!! DOUBLE YO COINS !!!! '+ (coins+coins) + ' COINSSS!!!');
    PLAYER_LOOT += (coins+coins);
    $("#playerloot").text(PLAYER_LOOT + " coins left");
  } else if (num_guess === solution-1 || num_guess === solution+1) { 
    $("#message").text( "Close enough... the number was "+solution+" but you choose "+guess+"... coins returned.");
    $("#playerloot").text(PLAYER_LOOT + " coins left");
  } else {
    $("#message").text( "YOU LOSE. the number is "+solution+"... you picked "+guess+"... PAY "+coins+" coins" );
    PLAYER_LOOT -= coins;
    $("#playerloot").text(PLAYER_LOOT + " coins left");
  }
  var $play = $("<button id='start' class='pure-button'>REPLAY!</button>");
  $play.appendTo($("#playarea"));
  $play.click(onClickStart);
};
