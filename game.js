var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(150).fadeIn(150);

  // play sound
  playSound(randomChosenColour);
}

function checkAnswer(lastIndex){
  if(userClickedPattern[lastIndex] !== gamePattern[lastIndex]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200
    );
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  else{
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000
      );
    }
  }
}

$( ".btn" ).click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  // play sound
  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length -1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $( "#"+currentColour ).addClass("pressed");
  setTimeout(function() {
    $( "#"+currentColour ).removeClass("pressed");
}, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
