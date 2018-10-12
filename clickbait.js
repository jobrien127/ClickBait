// TODO: need to remove debugging alerts
var clickX, clickY, // the last clicked x and y positions within the canvas
score = 0, // user score (should be incremented)
levelNum = 1,
targetRadius = 5, // TODO: might need to be adjusted / calculated
numTargets = [12, 18, 24, 30, 36], // number of targets per level
points = [],
goodTargets = [],
badTargets = [];

$(document).ready(function() {
	$("#endGameCard").hide();
	
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
	// ^^ Format for calling function to submit a potential high score.
});

function run() {
    score = 0;
    $("#startButton").click(function(){
		runLevel(levelNum);
		levelNum++;
    });
	$("#endGameCard").dblclick(function() {
		$(this).slideUp();
		highscore(score);
		
		score = 0, // user score (should be incremented)
		levelNum = 1,
		points = [],
		goodTargets = [],
		badTargets = [];
	});
}

function runLevel(n) {
  $("#startButton").hide();

  // when start button is clicked
    $("#levelIndicator").html("Level: " + n);// displays current level
    generatePoints(numTargets[n - 1]); // generates non-overlapping origins
    
    // TODO: for all points in both good/bad arrays draw circles with appropriate color
    drawTargets();

    var timeLeft = 15000;
    setTimeout(endOfLevel, timeLeft); 
      // this gets the user's mouse click coordinates
      $('#gameCanvas').click(function (e) { //Offset mouse Position
        var posX = $(this).offset().left,
            posY = $(this).offset().top;
            clickX = e.pageX - posX;
            clickY = e.pageY - posY;
      
        targetCounter = 0;

        for(i = 0; i < goodTargets.length; i++) {
            if(Math.sqrt(Math.pow((goodTargets[i].x-clickX),2) + Math.pow((goodTargets[i].y-clickY),2)) < (targetRadius)){
               score = score + 5;
               drawClicked(goodTargets[i].x, goodTargets[i].y);
               break;
            }
            targetCounter = targetCounter + 1;
        }
        goodTargets.splice(targetCounter, 1)
        targetCounter = 0;

        for(i = 0; i < badTargets.length; i++) {
            if(Math.sqrt(Math.pow((badTargets[i].x-clickX),2) + Math.pow((badTargets[i].y-clickY),2)) < (targetRadius)){
               score = score - 5;
               drawClicked(badTargets[i].x, badTargets[i].y);
               break;
            }
            targetCounter = targetCounter + 1;
        }
        badTargets.splice(targetCounter, 1);
    });
}

function endOfLevel() {
  if (levelNum > 5) {
		$("#endGameCard").show();
		$("#endGameCard").text("Congratulations! Your final score is: " + score + "(Double-click to continue)");
  } else {
	  alert("END OF LEVEL...Your Score is Now: " + score);
	  var canvas = document.getElementById("gameCanvas");
	  var ctx = canvas.getContext('2d');
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  $("#startButton").show();
  }
}

function generatePoints(k) {

  var canvasWidth = parseFloat($("#gameCanvas").css("width")),
  canvasHeight = parseFloat($("#gameCanvas").css("height"));

  var placed = 0,
      maxTrys = k*10;
  while(placed < k && maxTrys > 0) {
    var x = Math.floor(Math.random()*(canvasWidth - 2*targetRadius)) + targetRadius,
        y = Math.floor(Math.random()*(canvasHeight - 2*targetRadius)) + targetRadius,
        available = true;

    for(i = 0; i < points.length; i++) {
      if(Math.sqrt(Math.pow((points[i].x-x),2) + Math.pow((points[i].y-y),2)) < (2 * targetRadius)) {
        available = false;
        break;
      }
    }
    if(available) {
      points.push({
        x: x,
        y: y
      });

      placed = placed + 1;
    }
    maxTrys = maxTrys - 1;
  }

  while(points.length != 0){
      if(points.length != 0){
          goodTargets.push(points[0]);
          points.shift();
      }
      if(points.length != 0){
          badTargets.push(points[0]);
          points.shift();
      }
  }
}

function drawGood(xVal, yVal) {
  var c = document.getElementById("gameCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(xVal, yVal, targetRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.stroke(); 
}

function drawBad(xVal, yVal) {
  var c = document.getElementById("gameCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(xVal, yVal, targetRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

function drawClicked(xVal, yVal) {
  var c = document.getElementById("gameCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(xVal, yVal, targetRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.stroke();
}

function drawTargets() {

  for (i = 0; i < goodTargets.length; i ++) {
    drawGood(goodTargets[i].x, goodTargets[i].y);

  }
  for (i = 0; i < badTargets.length; i++) {
    drawBad(badTargets[i].x, badTargets[i].y);
  }
}

