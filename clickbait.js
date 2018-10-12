var clickX, clickY, // the last clicked x and y positions within the canvas
score = 0, // user score (should be incremented)
levelNum = 1,
numTargets = [12, 18, 24, 30, 36], // number of targets per level
points = [],
goodTargets = [],
badTargets = [];

$(document).ready(function() {
	update_scores(); // Call this on page load to update high-scores list.
	
	// Pick a random click-bait-y splash text
	// If anyone thinks of anything else you want to add, feel free. Just make sure to alter the hard-coded values for the random selection below.
	splashTextA = ["Top 10 Scores", "These 8 Gameplay Photos", "12 Most Shocking Dots"];
	splashTextB = [" That You Won't Believe", " That Professor Paone Doesn't Want You To Know About", " Too Ridiculous To Be True"];
	splashTextC = [" Will Shock You!", ": Number 5 Will Surprise You!", " Will Blow Your Mind!", " Will Change Your Life!"];
	
	// -- Compile Random Splash --
	splashString = splashTextA[Math.floor(Math.random() * 3)] + splashTextB[Math.floor(Math.random() * 3)] + splashTextC[Math.floor(Math.random() * splashTextC.length)];
	
  $("#splashText").text(splashString);
 
  run();
  
  // TODO: i'm assuming that if a user has a high score, then we need to get their name 
	// TODO: highscore(score)
	// ^^ Format for calling function to submit a potential high score.
});

function run() {
  alert("made it ");
  alert("level num: " + levelNum);
  $("#startButton").click(function(){
    alert("start button clicked"); 
    runLevel(levelNum);
    levelNum++;
    });
}

function runLevel(n) {
  // when start button is clicked
    alert("start button clicked   level num: " + n);
    $("#levelIndicator").html("Level: " + n);// displays current level
    generatePoints(numTargets[n - 1]); // generates non-overlapping origins
    
    // TODO: loop through points array and randomly pick point to be good or bad target
        // if good -> add to goodTargets array ... else -> add to bad...
        
    // TODO: for all points in both good/bad arrays draw circles with appropriate color

    // TODO: need to start timer here (also need to display timer or progress bar) 

    // TODO: while timer > 0 -> check for clicks (done below) 

      // this gets the user's mouse click coordinates
      $('#gameCanvas').click(function (e) { //Offset mouse Position
        posX = $(this).offset().left,
        posY = $(this).offset().top;
        alert((e.pageX - posX) + ' , ' + (e.pageY - posY)); // alert for testing click position
      
        // TODO: check if click within good target
            // TODO: increment score
            // TODO: remove target from canvas
        targetCounter = 0;
        for(target in goodTargets) {
            if(Math.sqrt(Math.pow((target.x-posX),2) + Math.pow((target.y-posY),2)) < (targetRadius)){
               score = score + 5;
               break;
            }
            targetCounter = targetCounter + 1;
        }
        
        // TODO: check if click within bad target
            // TODO: decrement score
            // TODO: remove target from canvas
    });
            // TODO: if timeleft <= 0 -> clear the canvas 
}


function generatePoints(k) {

  var canvasWidth = parseFloat($("#gameCanvas").css("width")),
  canvasHeight = parseFloat($("#gameCanvas").css("height"));
  alert("canvas width: " + canvasWidth + "canvas height: " + canvasHeight); 

  alert("entered point gnerator");
  var placed = 0,
      maxTrys = k*10; // should we have a max tries?
  while(placed < k && maxTrys > 0) {
    alert("entered while loop");
    alert("canvas width: " + canvasWidth + "canvas height: " + canvasHeight); 
    var x = Math.floor(Math.random()*canvasWidth),
        y = Math.floor(Math.random()*canvasHeight),
        available = true;
        alert("generated x: " + x + "generated y: " + y);
    for(var point in points) {
      if(Math.sqrt(Math.pow((point.x-x),2) + Math.pow((point.y-y),2)) < (2 * radius)) {
        available = false;
        break;
      }
    }
    if(available) {
      points.push({
        x: x,
        y: y
      });
      alert("points[0]: " + points[0]); 
      placed = points + 1;
    }
    maxTrys = maxTrys - 1;
  }
}
