var game = {
	started: false,
	currentWord: "",
	wins: 0, 
	losses: 0,
	lives: 10,
	previousGuesses: [],
	lettersToGuess: 0,
	words: ["background", "background-attachment", "background-color", "background-image",
	"background-position", "background-repeat", "background-size", "border-color", 
	"border-radius", "border-style", "border-width", "box-shadow", "margin-bottom",
	"max-height", "min-width", "padding-bottom", "vertical-align", "letter-spacing",
	"line-height", "text-align", "text-transform", "text-decoration", "text-shadow",
	"font-family", "font-size", "text-orientation", "list-style-image", "animation",
	"animation-duration", "transform-style", "image-orientation", "border-bottom-style",
	"margin-right", "padding-left"],


	display: function(){
		
		//select a randon word from words array and store the value on currentWord variable
		this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
		
		var char;
		var list = "";

		for(var i = 0; i < this.currentWord.length; i++){
			char = "_";
			if(this.currentWord[i] != "-"){
				this.lettersToGuess ++;
			}else{
				char = "-";
			}
			list += "<li>" + char + "</li>";
		}
		var ul = document.getElementById("pattern");
		ul.innerHTML = list;
		this.createBtn();
	},


	//This function check if the letter typed is inside the current word and return true or false
	search: function (char){
		var ul = document.getElementById("pattern");
		var list = ul.getElementsByTagName("li");
		var found = false;
		for(var i = 0; i < this.currentWord.length; i++){
			if(this.currentWord[i] === char){
				list[i].textContent = char;
				this.lettersToGuess --;
				found = true;
			}
		}
		var btn = document.getElementById(char);
		btn.className += " disabled";

		if(found){
			btn.className += " right";
		}else{
			btn.className += " wrong";
		}
		return found;
	},

	wrongAnswer: function(){
		this.lives --;
		document.getElementById("lives").innerHTML = this.lives;
		if(this.lives == 0){
			

 		 	this.msg("Sorry, you LOST", "#ee5f5b");

			this.losses ++;
			var losses = document.getElementById("losses");
			losses.innerHTML = this.losses;
			this.newGame();
		}
	},

	rightAnswer: function(){
		console.log(this.lettersToGuess);
		if(this.lettersToGuess == 0){
			
 		 	this.msg("Good work, You WON!", "#62c462");

			this.wins ++;
			var wins = document.getElementById("wins");
			wins.innerHTML = this.wins;
			this.newGame();
		}
	},

	newGame: function (){
		this.lives = 10;
		this.lettersToGuess = 0;
		this.previousGuesses = [];

		this.createBtn();

		document.getElementById("lives").innerHTML = this.lives;
		document.getElementById("guessed").innerHTML = "";
		this.display();
	},

	msg: function(msg, bgColor){
		document.getElementById("msg").innerHTML = msg;
		document.getElementById("msgContainer").style.backgroundColor = bgColor;
	 	document.getElementById("msgContainer").style.height = "80px";

	 	window.setTimeout(function(){
	 		document.getElementById("msgContainer").style.height = 0;
	 	}, 3000);
	},

	start: function(){
		document.getElementById("msgContainer").style.height = 0;
		document.getElementById("playArea").style.display = "block";
		document.getElementById("keys").style.display = "block";
		window.setTimeout(function(){
			document.getElementById("play").style.display = "none"}, 3000);

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
				//el += '<a href="#" id="' + letters[key][i] + '" class="btn btn-primary">' + 
				//letters[key][i] + '</a>'
				 el += '<span id="' + letters[key][i] + '" class="btn btn-primary">' + 
				 letters[key][i] + '</span>'
			}
			el += '</div>'
		}
		document.getElementById("keys").innerHTML = el;
	}
};


document.onkeyup = function(event) {
	if(!game.started){
		game.start();
	} else{
		if(event.keyCode > 64 && event.keyCode < 91){
			var input = String.fromCharCode(event.keyCode).toLowerCase();
			if(game.previousGuesses.indexOf(input) == -1){
				game.previousGuesses.push(input);
				document.getElementById("guessed").innerHTML = game.previousGuesses.join(", ");

				if(!game.search(input)){
					game.wrongAnswer();			
				} else{
					game.rightAnswer();
				}
			}
		}
	}
};

document.getElementById("play").onclick = function(){
	game.start();
};

var btns = document.getElementById("keys");
btns.addEventListener("click",function(e){
	if (e.target !== e.currentTarget){

		 var input = e.target.id;
		 this.onclick = null;
		
		
		if(game.previousGuesses.indexOf(input) == -1){
				game.previousGuesses.push(input);
				document.getElementById("guessed").innerHTML = game.previousGuesses.join(", ");

				if(!game.search(input)){
					game.wrongAnswer();			
				} else{
					game.rightAnswer();
				}
			}
	}
	e.stopPropagation();
},false);



