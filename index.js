//------------------------------REQUIRE------------------------------------------//

var colors = require("colors");
var correspondances = require("./correspondances.js");
var player = require("play-sound")((opts = {}));
//readline
let readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let words = require("./words.json");

console.log(`
+-+-+-+-+-+
|M|O|T|U|S|
+-+-+-+-+-+
`);

//----------- WORDS DEFINIR LE MOT MYSTERE DE 5 LETTRES-----------------------------//
let wordsLongerThan5 = [];
let number = Number(process.argv[2]);
function generateWord() {
  for (let i = 0; i < words.length; i++) {
    if (words[i].label.length === number) {
      wordsLongerThan5.push(words[i].label);
    }
  }

  let max = wordsLongerThan5.length - 1;

  let random = Math.floor(Math.random() * (max + 1));

  let str = wordsLongerThan5[random];

  str = str.replace(/à/g, "a");
  str = str.replace(/â/g, "a");
  str = str.replace(/ç/g, "c");
  str = str.replace(/è/g, "e");
  str = str.replace(/é/g, "e");
  str = str.replace(/ê/g, "e");
  str = str.replace(/î/g, "i");
  str = str.replace(/ï/g, "i");
  str = str.replace(/ô/g, "o");
  str = str.replace(/ù/g, "u");
  str = str.replace(/û/g, "u");
  str = str.toUpperCase();
  return str;
}

let str = generateWord();
let secretWordTab = str.split("");
console.log(secretWordTab.join(""));
let attempts = 6;
//----------------CRYPTER LE MOT MYSTERE SAUF 1ERE LETTRE-------------------------//

let hiddenWord = [];
for (let i = 0; i < str.length; i++) {
  if (i === 0) {
    hiddenWord.push(str[i]);
  } else {
    hiddenWord.push("*");
  }
}

//----------TIMER POUR SOUND LETTRES----------------------------------------------//

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
//----------TIMER POUR REPONSE----------------------------------------------//

//Imposer un délai maximum de 8 secondes pour entrer un mot
// let decompte = 1;
// var timer = setInterval(function() {
//   console.log(decompte);
//   decompte++;
//   if (decompte > 3) {
//     clearInterval(timer);
//     player.play("./sounds/lose.wav");
//   }
// }, 3000);
//-----------------GAME----------------------------------------------------------//

function onAnswer(answer) {
  attempts--;
  answer = answer.toUpperCase();
  let hiddenWord = [];
  for (let i = 0; i < str.length; i++) {
    if (answer[i] === str[i]) {
      hiddenWord.push(str[i]);
    } else {
      hiddenWord.push("*");
    }
  }
  if (answer.length === str.length) {
    colorLetter(answer);

    if (answer === str) {
      console.log("C'est gagné !");
      player.play("./sounds/win.wav");
      rl.close();
    } else if (answer.length < number) {
      console.log(
        "Pas assez de lettres dans ce mot ! C'est perdu ! Le mot était " + str
      );
      player.play("./sounds/lose.wav");
      rl.close();
    } else if (answer.length > number) {
      console.log("Il vous reste " + attempts + " essais.\n");
      console.log("Le mot mystere est : " + hiddenWord.join(""));
      rl.question(
        "Veuillez entrer un mot de " + number + " lettres : ",
        onAnswer
      );
    } else if (attempts === 0) {
      console.log("C'est perdu ! Le mot était " + str);
      player.play("./sounds/lose.wav");
      rl.close();
    } else {
      console.log("Il vous reste " + attempts + " essais.\n");
      console.log("Le mot mystere est : " + hiddenWord.join(""));
      rl.question(
        "Veuillez entrer un mot de " + number + " lettres : ",
        onAnswer
      );
    }
  }
  //----------------COLORS-&-SOUND-----------------------------------------------------//

  function colorLetter(answer) {
    let tab = [];
    for (let i = 0; i < answer.length; i++) {
      if (correspondances(answer, str)[i].couleur === "rouge") {
        process.stdout.write(answer[i].red);
        player.play("./sounds/valid.wav");
        wait(300);
      } else if (correspondances(answer, str)[i].couleur === "jaune") {
        process.stdout.write(answer[i].yellow);
        player.play("./sounds/misplaced.wav");
        wait(300);
      } else {
        process.stdout.write(answer[i]);
        player.play("./sounds/wrong.wav");
        wait(300);
      }
    }

    console.log(tab.join(""));
  }
}
//--------------------START------------------------------------------------------//

console.log("Il vous reste " + attempts + " essais");
console.log("Le mot mystere est : " + hiddenWord.join(""));
rl.question("Veuillez entrer un mot de " + number + " lettres : ", onAnswer);

//-------------------------------------------------------------------------------//
