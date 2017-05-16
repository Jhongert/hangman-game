var baseballTeam = ["chicago cubs", "los angeles dodgers", "new york yankess", "baltimore orioles",
	"cleveland indians", "toronto blue jays", "boston red sox", "new york mets", 
	"san francisco giants", "st louis cardinals", "detroit tigers", "texas rangers",
	"atlanta braves", "pittsburgh pirates", "houston astros", "angels of anaheim",
	"philadelphia phillies", "kansas city royals", "washinton nationals", "minnesota twins",
	"seattle mariners", "cincinnati reds", "miami marlins", "chicago white sox", "colorado rokies",
	"milwaukee brewers", "arizona diamondbacks", "san diego padres", "oakland athletics",
	"tampa bay rays"];

var started = false;
var currentWord = "", wins = 0, remaining = 10;
var lettersToGuess = 0;
var lettersGuessed = [];

var ul = document.getElementById("pattern");
var list = ul.getElementsByTagName("li");


function displayPattern(team){
	currentWord = team[Math.floor(Math.random() * team.length)];
	
	ul.innerHTML = "";

	for(var i = 0; i < currentWord.length; i++){
		var li = document.createElement("li");
		if(currentWord[i] != " "){
			li.innerHTML = "_";
			lettersToGuess++;
		} else{
			li.innerHTML = "-";
		}
		ul.appendChild(li);
	}
}

function letterSearch(letter){
	
	var found = false;
	for(var i = 0; i < currentWord.length; i++){
		if(currentWord[i] === letter){
			list[i].textContent = letter;
			lettersToGuess --;
			found = true;
		}
	}
	return found;
}

function newGame(){
	remaining = 10;
	lettersToGuess = 0;
	lettersGuessed = [];
	document.getElementById("remaining").innerHTML = remaining;
	document.getElementById("guessed").innerHTML = "";
	displayPattern(baseballTeam);

}

function setWins(){
	var wins = document.getElementById("wins");
	wins.innerHTML = parseInt(wins.innerHTML) + 1;
}

document.onkeyup = function(event) {
 	if(!started){
 		started = true;
 		displayPattern(baseballTeam);
 	} else{
 		if( lettersGuessed.indexOf(event.key) == -1){
 			lettersGuessed.push(event.key);
 			document.getElementById("guessed").innerHTML = lettersGuessed.join(", ");
 			
 			if(!letterSearch(event.key)){
 				remaining --;
 				document.getElementById("remaining").innerHTML = remaining;
 				if(remaining == 0){
 					alert("your dead");
 				}		
 			} else{
 				if(lettersToGuess == 0){
 					setWins();
 					newGame();
 				}
 			}
 		} 
 	}
 }