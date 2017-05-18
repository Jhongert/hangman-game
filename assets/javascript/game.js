var game = {
	started: false,
	currentWord: "",
	wins: 0, 
	losses: 0,
	lives: 8,
	previousGuesses: [],
	lettersToGuess: 0,
	words: ["background", "background-attachment", "background-color", "background-image",
	"background-position", "background-repeat", "background-size", "border-color", 
	"border-radius", "border-style", "border-width", "box-shadow", "margin-bottom",
	"max-height", "min-width", "padding-bottom", "padding-top", "padding-left", "padding-right",
	"vertical-align", "letter-spacing", "align-content", "justify-content", "overflow-wrap",
	"line-height", "text-align", "text-transform", "text-decoration", "text-shadow",
	"font-family", "font-size", "text-orientation", "list-style-image", "animation",
	"animation-duration", "transform-style", "image-orientation", "border-bottom-style",
	"margin-right", "padding-left", "z-index", "width", "visibility", "transition",
	"transition-delay", "transition-duration", "transform", "perspective", "overflow-x",
	"overflow-y", "outline-style", "margin-top", "marging-left", "list-style-position",
	"float", "font", "height", "display", "direction", "clear", "bottom", "clip", "border"],


	//Display on screen the random word replacing each letter with "_"
	display: function(){
		
		//select a randon word from words array and store the value on currentWord variable
		this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
		
		//select ul(id=pattern from html) and delete all <li> 
		var ul = document.getElementById("pattern");
		ul.innerHTML = "";

		//create the list 
		for(var i = 0; i < this.currentWord.length; i++){
			var li = document.createElement("li");
			if(this.currentWord[i] != "-"){
				li.innerHTML = "_";
				this.lettersToGuess++;
			} else{
				li.innerHTML = "-";
			}
			ul.appendChild(li);
		}
		this.createBtn(); //add buttons
	},


	//This function check if the chosen letter is inside the current word
	search: function (letter){
		//if the chosen letter is not on previousGuesses array
		if(this.previousGuesses.indexOf(letter) == -1){
			this.previousGuesses.push(letter); //insert new letter in array
			
			var ul = document.getElementById("pattern");
			var list = ul.getElementsByTagName("li"); //select all <li> from ul pattern
			var found = false;
			for(var i = 0; i < this.currentWord.length; i++){
				if(this.currentWord[i] === letter){
					list[i].textContent = letter; //replace "_" in li with new letter
					this.lettersToGuess --;
					found = true;
				}
			}

			//select the button with the letter and disable it
			var btn = document.getElementById(letter);
			btn.className += " disabled";

			//if the letter is in the word call function rightAnswer else call wrongAnswer
			//and asign a class to the button
			if(found){
				this.rightAnswer();
				btn.className += " right";
			}else{
				this.wrongAnswer();
				btn.className += " wrong";
			}
		}
	},

	//when the chosen letter is not inside the word
	wrongAnswer: function(){
		//update lives
		this.lives --;
		document.getElementById("lives").innerHTML = this.lives;

		//if lives = 0. show a message with the right answer, update losses and start a new game
		if(this.lives == 0){
 		 	this.msg('You LOST. The word was "' +  this.currentWord +'"', "#ee5f5b");
			this.losses ++;
			var losses = document.getElementById("losses");
			losses.innerHTML = this.losses;
			this.newGame();
		}
	},

	//when the chosen letter is inside the word
	rightAnswer: function(){
		//if not more letters to guess, show a message, update wins and start a new game
		if(this.lettersToGuess == 0){
 		 	this.msg("Good work, You WON!", "#62c462");
			this.wins ++;
			var wins = document.getElementById("wins");
			wins.innerHTML = this.wins;
			this.newGame();
		}
	},

	//reset variables, recreate buttons and call display function 
	newGame: function (){
		this.lives = 8;
		this.lettersToGuess = 0;
		this.previousGuesses = [];
		this.createBtn();
		document.getElementById("lives").innerHTML = this.lives;
		this.display();
	},

	//show a message with a different background color when user win or loss
	msg: function(msg, bgColor){
		document.getElementById("msg").innerHTML = msg;
		var msgC = document.getElementById("msgContainer");
		msgC.style.backgroundColor = bgColor;
		msgC.style.display = "block";
	 	msgC.style.height = "64px";

	 	//hidde the message after 3 sec
	 	window.setTimeout(function(){
	 		msgC.style.height = 0;
	 	}, 3000);
	},

	//when user press play or press any key to start the game
	start: function(){
		//hidde the intro div and show the game div
		document.getElementById("intro").style.display = "none";
		document.getElementById("game").style.display = "block";

		this.started = true;
		this.display();
	},


	createBtn: function() {
		var el = "";

		var letters = {row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
					   row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
				       row3: ["z", "x", "c", "v", "b", "n", "m"]};

		for(var key in letters){
			el += '<div class="btn-group">';
			for(var i = 0; i < letters[key].length; i++){
				 el += '<span id="' + letters[key][i] + '" class="btn btn-default">' + 
				 letters[key][i] + '</span>'
			}
			el += '</div>'
		}
		document.getElementById("keys").innerHTML = el;
	},


}; //end of object

//key press event
document.onkeyup = function(event) {
	//if the user press a key to start the game call start function
	if(!game.started){
		game.start();
	} else{ //if the user press a key to play
		if(event.keyCode > 64 && event.keyCode < 91){ //if key is a-z or A-Z
			var input = String.fromCharCode(event.keyCode).toLowerCase();
			game.search(input);
		}
	}
};

//button play click event
document.getElementById("play").onclick = function(){
	game.start();
};

//add click event to buttons keyboard
var btns = document.getElementById("keys");
btns.addEventListener("click",function(e){
	if (e.target !== e.currentTarget){
		var input = e.target.id;
		this.onclick = null;
		game.search(input);
	}
	e.stopPropagation();
},false);