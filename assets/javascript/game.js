var baseballTeam = ["chicago cubs", "los angeles dodgers", "new york yankess", "baltimore orioles",
	"cleveland indians", "toronto blue jays", "boston red sox", "new york mets", 
	"san francisco giants", "st louis cardinals", "detroit tigers", "texas rangers",
	"atlanta braves", "pittsburgh pirates", "houston astros", "angels of anaheim",
	"philadelphia phillies", "kansas city royals", "washinton nationals", "minnesota twins",
	"seattle mariners", "cincinnati reds", "miami marlins", "chicago white sox", "colorado rokies",
	"milwaukee brewers", "arizona diamondbacks", "san diego padres", "oakland athletics",
	"tampa bay rays"];

var started = false;
var currentWord = "", wins = 0, tries = 0, guessesRemaining = 10;
var lettersGuessed = [];


function displayPattern(team){
	currentWord = team[Math.floor(Math.random() * team.length)];
	var ul = document.createElement("ul");

	alert(currentWord);

	for(var i = 0; i < currentWord.length; i++){
		var li = document.createElement("li");
		if(currentWord[i] != " "){
			li.innerHTML = "_";
		} else{
			li.innerHTML = "-";
		}
		ul.appendChild(li);
	}
	ul.setAttribute("id", "pattern");
	document.getElementById("patternHolder").appendChild(ul);
}

 document.onkeyup = function(event) {
 	if(!started){
 		started = true;
 		displayPattern(baseballTeam);
 	} else{

 		if( lettersGuessed.indexOf(event.key) == -1){
 			lettersGuessed.push(event.key);
 			document.getElementById("guessed").innerHTML = lettersGuessed.join(", ");

 			tries ++;
 			document.getElementById("tries").innerHTML = tries;

 			var ul = document.getElementById("pattern");
 			var list = ul.getElementsByTagName("li");
 			
 			for(var i = 0; i < currentWord.length; i++){
 				if(currentWord[i] === event.key){
 					list[i].textContent = event.key;
 				}
 			}
 		} 
 		
 	}
 }