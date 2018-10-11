function getRandX() {
    return Math.floor((Math.random() * 275 ) + 15)
}

function getRandY() {
    return Math.floor((Math.random() * 135 ) + 15)
}

function drawBadTarget() {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(getRandX(), getRandY(), 15, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function drawGoodTarget() {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(getRandX(), getRandY(), 15, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke(); 
}

function drawTarget() {
    var r = Math.random();
    if (r <= .50){
        drawBadTarget()
    } else {
        drawGoodTarget();
    }
}

$(document).ready(function() {
    $("#gameCanvas").click(function(){
        drawTarget();
    }); 
    
	update_scores(); // Call this on page load to update high-scores list.
	
	// Pick a random click-bait-y splash text
	// If anyone thinks of anything else you want to add, feel free. Just make sure to alter the hard-coded values for the random selection below.
	splashTextA = ["Top 10 Scores", "These 8 Gameplay Photos", "12 Most Shocking Dots"];
	splashTextB = [" That You Won't Believe", " That Professor Paone Doesn't Want You To Know About", " Too Ridiculous To Be True"];
	splashTextC = [" Will Shock You!", ": Number 5 Will Surprise You!", " Will Blow Your Mind!", " Will Change Your Life!"];
	
	// -- Compile Random Splash --
	splashString = splashTextA[Math.floor(Math.random() * 3)] + splashTextB[Math.floor(Math.random() * 3)] + splashTextC[Math.floor(Math.random() * splashTextC.length)];
	
	$("#splashText").text(splashString);
	
	// highscore(score)
	// ^^ Format for calling function to submit a potential high score.
});