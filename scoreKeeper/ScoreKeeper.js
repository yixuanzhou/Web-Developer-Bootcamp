var p1Btn = document.querySelector("#p1");
var p2Btn = document.querySelector("#p2");
var resetBtn = document.querySelector("#reset");
var p1ScoreDisp = document.querySelector("#p1Disp");
var p2ScoreDisp = document.querySelector("#p2Disp");
var numInput = document.querySelector("input");
var p = document.querySelector("p span");
var p1Score = 0;
var p2Score = 0;
var gameover = false;
var winningScore = 5;

p1Btn.addEventListener("click", function(){
	if (!gameover) {
		p1Score++;
		if (p1Score === winningScore) {
			gameover = true;
			p1ScoreDisp.classList.add("winner");
		}
		p1ScoreDisp.textContent = p1Score;
	}
	
});

p2Btn.addEventListener("click", function(){
	if (!gameover) {
		p2Score++;
		if (p2Score === winningScore) {
			gameover = true;
			p2ScoreDisp.classList.add("winner");
		}
		p2ScoreDisp.textContent = p2Score;
	}
});

resetBtn.addEventListener("click", function(){reset();});

function reset() {
	gameover = false;
	p1Score = 0;
	p2Score = 0;
	p1ScoreDisp.textContent = p1Score;
	p2ScoreDisp.textContent = p2Score;
	p1ScoreDisp.classList.remove("winner");
	p2ScoreDisp.classList.remove("winner");
}

numInput.addEventListener("change", function(){
	winningScore = Number(numInput.value);
	p.textContent = winningScore;
	reset();
})
