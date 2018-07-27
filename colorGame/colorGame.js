var colors = generateRandColor(numOfSquares);

var squares = document.querySelectorAll(".square");
var pickedColor = pickRandColor();
var colorDisp = document.getElementById("colorDisp");
var msgDisp = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var numOfSquares = 6;

easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numOfSquares = 3;
	colors = generateRandColor(numOfSquares);
	pickedColor = pickRandColor();
	colorDisp.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
})
hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	numOfSquares = 6;
	colors = generateRandColor(numOfSquares);
	pickedColor = pickRandColor();
	colorDisp.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";		
	}
})

resetBtn.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandColor(numOfSquares);
	//pick a new random color from array
	pickedColor = pickRandColor();
	//change colorDisp to match picked color
	colorDisp.textContent = pickedColor;
	msgDisp.textContent = "";
	resetBtn.textContent = "new colors";
	//change colors of squares
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
})
colorDisp.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
	//add initial color to squares
	squares[i].style.backgroundColor = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//compare color to picked color
		if (clickedColor === pickedColor) {
			msgDisp.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetBtn.textContent = "Play Again?";
		} else {
			this.style.backgroundColor = "#232323";
			msgDisp.textContent = "Try Again";
		}
	})
}

function changeColors(color) {
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickRandColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandColor(num) {
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {
		//get random color and push into arr
		//pick red, green, blue from 0 - 255
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		arr[i] = "rgb(" + r + ", " + g + ", " + b + ")";
	}
	//return that array
	return arr;
}