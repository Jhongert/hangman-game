var game = {
	started: false,
	currentWord: "",
	wins: 0, 
	losses: 0,
	lives: 6,
	wrongCount: 0,
	previousGuesses: [],
	lettersToGuess: 0,
	play,
	words: [
		["Darth Vader", "Yoda", "Luke Skywalker", "Obi-Wan Kenobi", "Leia Organa", "Kylo Ren",
		   "Boba Fett", "Han Solo", "Sheev", "Padme Amidala", "Ahsoka Tano", "Supreme Leader Snoke",
		   "Chewbacca", "Clone Trooper", "Ray", "Jabba the Hutt", "Darth Maul", "Jar Jar Binks",
	       "General Grievous", "Mace Windu", "Qui-Gon Jinn", "Count Dooku", "Captain Phasma",
		   "Aayla Secura", "Captain Rex", "Asajj Ventress", "Stormtrooper", "Jango Fett", "Plo Koon",
		   "Lando", "Wilhuff Tarkin", "Poe Dameron", "Commander Cody", "Finn", "Admiral Ackbar", "Nute Gunray", 
		   "Sebulba", "Ki-Adi-Mundi", "Shmi Skywalker", "Luminara Unduli",
		   "Watto", "Mon Mothma", "Wedge Antilles", "Wampa", "Sentor Ball Organa", "Dengar",
		   "Greedo", "General Hux", "Maz Kanata"],
		["Powered Cart", "Storage Cart", "Rails", "Powered Rail", "Detector Rail", "Boat", "Activator Rail",
			"Hopper Cart", "TNT Cart", "Ore Blocks", "Glowstone", "Slabs", "Stairs", "Brick", "Stone Brick",
			"Bookshelf", "Sandstone", "Melon Block", "Jack-O-Lantern", "Redstone Lamp", "Quartz", "Netherbrick",
			"Hay Bale", "Stained Clay", "Stained Glass", "Granite", "Andesite", "Diorite",
			"Polished Diorite", "Prismarine", "Dark Prismarine", "Sea Lantern", "Coarse Dirt", "Shears", "Lighter",
			"Slime Block", "Moss Stone", "Axe", "Pickaxe", "Shovel", "Bucket", "Compass", "Clock", "Fishing Rod"],
		["Superman", "Batman", "Spider-man", "Thor", "Mr Fantastic", "Wonder-woman", "Captain america",
			"Invisible Woman", "Human Torch", "Flash", "Green Lanter", "Silver Surfer", "Wolverine", "Iron Man",
			"Supergirl", "Superboy", "Aquaman", "Plastic Man", "Green Arrow", "Cyborg", "Hercules",
			"Black Panther", "Beast Boy", "Starfire", "Red Tornado", "Professor X", "Doctor Strange",
			"Hawkeye", "Wasp", "Black widow", "Captain Boomerang"]
	],


	//Display on screen the random word replacing each letter with "_"
	display: function(){
		
		//select a randon word from words array and store the value on currentWord variable
		var e = document.getElementsByTagName('select')[0];
		var theme = e.options[e.selectedIndex].value;

		//this.currentWord = this.words[theme][Math.floor(Math.random() * this.words[theme].length)];
		
		this.currentWord = this.words[theme][Math.floor(Math.random() * this.words[theme].length)];

		//select ul(id=pattern from html) and delete all <li> 
		var ul = document.getElementById("pattern");
		ul.innerHTML = "";

		//create the list 
		for(var i = 0; i < this.currentWord.length; i++){
			var li = document.createElement("li");
			if(this.currentWord[i] != " " && this.currentWord[i] != "-"){
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
				if(this.currentWord[i].toLowerCase() === letter.toLowerCase()){
					list[i].textContent = this.currentWord[i]; //letter; //replace "_" in li with new letter
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
		document.getElementById('lives').innerHTML = this.lives;

		// Increment number of wrong answers
		this.wrongCount ++;
		// Change the image
		var img = 'hangman-' + this.wrongCount + '.jpg';
		document.getElementById('hangman').style.backgroundImage = 'url("assets/images/' + img + '")';

		//if lives = 0. show a message with the right answer, update losses and start a new game
		if(this.lives == 0){
 		 	this.msg('You LOST. The word was "' +  this.currentWord +'"', "#ee5f5b");
			this.losses ++;
			var losses = document.getElementById("losses");
			losses.innerHTML = this.losses;
			this.play = false;
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
			this.play = false;
		}
	},

	//reset variables, recreate buttons and call display function 
	newGame: function (){
		this.lives = 6;
		this.wrongCount = 0;
		this.lettersToGuess = 0;
		this.previousGuesses = [];
		this.play = true,
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
	 		document.getElementById('hangman').style.backgroundImage = 'url("assets/images/hangman-0.jpg")';
	 		game.newGame();
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


	//create buttons for each letter
	createBtn: function() {

		//select the container for the buttons and clean the content
		var keys = document.getElementById("keys");
		keys.innerHTML = "";

		//object of arrays for three rows of letters
		var letters = {row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
		  			  row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
		  		      row3: ["z", "x", "c", "v", "b", "n", "m"]};

		//loop the object
		for(var key in letters){
		 	var div = document.createElement("div");
		 	div.setAttribute("class", "btn-group");
			
			//loop each the arrey inside the object
		  	for(var i = 0; i < letters[key].length; i++){
		  		//create a span element, set properties and add it to div element
		  		var span = document.createElement("span");
		  		span.setAttribute("id", letters[key][i]);
		  		span.setAttribute("class", "btn btn-default");
		  		span.textContent = letters[key][i];
		  		div.appendChild(span);
		 	}
		 	keys.appendChild(div); //add group of buttons to container
		}
	},


}; //end of object

//key press event
document.onkeyup = function(event) {
	//if the user press a key to start the game call start function
	if(!game.started){
		game.start();
	} else{ //if the user press a key to play
		if(event.keyCode > 64 && event.keyCode < 91 && game.play){ //if key is a-z or A-Z
			var input = String.fromCharCode(event.keyCode).toLowerCase();
			game.search(input);
		}
	}
};

//button play click event
document.getElementById("play").onclick = function(){
	game.start();
};

// Select onchange event
document.getElementsByTagName("select")[0].onchange= function(){
	game.newGame();
}

//add click event to buttons keyboard
var btns = document.getElementById("keys");
btns.addEventListener("click",function(e){
	if (e.target !== e.currentTarget && game.play){
		var input = e.target.id;
		this.onclick = null;
		game.search(input);
	}
	e.stopPropagation();
},false);