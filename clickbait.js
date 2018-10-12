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
	generatePlatforms(14);
	// highscore(score)
	// ^^ Format for calling function to submit a potential high score.
});

var points = [];
//Fill an array with 20x20 points at random locations without overlap
function generatePoints(k) {
  var placed = 0,
      maxTrys = k*10;
  while(placed < k && maxTrys > 0) {
    var x = Math.floor(Math.random()*canvasWidth),
        y = Math.floor(Math.random()*canvasHeight),
        available = true;
    for(var point in points) {
      if(Math.sqrt(Math.pow((point.x-x),2) + Math.pow((point.y-y),2)) < (2 * radius)) {
        available = false;
        break;
      }
    }
    if(available) {
      platforms.push({
        x: x,
        y: y
      });
      placed = platforms + 1;
    }
    maxTrys = maxTrys - 1;
  }
}