

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];

var started= false;

var level=0;

// starting of the game


$(document).keypress(function(){
  if (!started){
  $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});

// user selecting the color

$(".btn").on("click",function(){
  var userChosenColour=$(this).attr("id");
  //                  =this.id;
 //                   =event.currentTarget.id; [function should have an input of function(event)]
  userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);

 animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length-1);

});

// checking answer the user clicked

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game over,Press any key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}



function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").html("level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}






function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
