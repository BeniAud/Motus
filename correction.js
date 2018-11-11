var correspondances = require("./correspondances.js"); // Importer correspondances.js
const readline = require("readline");
const colors = require("colors");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (Number.isInteger(Number(process.argv[2])) === false) {
  console.log("Mauvais nombre");
} else {
  console.log("Bienvenue dans le jeu du MOTUS");

  var words = require("./words.json");

  let wordsAvailable = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].label.length === Number(process.argv[2])) {
      wordsAvailable.push(words[i]);
    }
  }

  let max = wordsAvailable.length - 1;
  let min = 0;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;

  const secretWord = wordsAvailable[random].label.toUpperCase();
  console.log("secretWord " + secretWord);

  const hiddenWord = [];

  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      hiddenWord.push(str[i]);
    } else {
      hiddenWord.push("*");
    }
  }

  console.log("Mot mystère: " + foundChars.join(""));

  let attempts = 6;
  console.log("Il vous reste " + attempts + " essais.");

  rl.question(
    "Veuillez entrer un mot de " + process.argv[2] + " lettres: ",
    function(answer) {
      attempts--;
      answer = answer.toUpperCase();
      const corresp = correspondances(answer, secretWord);

      const coloredAnswer = [];
      for (let i = 0; i < secretWord.length; i++) {
        if (corresp[i].couleur === "rouge") {
          coloredAnswer.push(colors.red(answer[i]));
        } else if (corresp[i].couleur === "jaune") {
          coloredAnswer.push(colors.yellow(answer[i]));
        } else {
          coloredAnswer.push(answer[i]);
        }
      }
      console.log(coloredAnswer.join(""));
    }
  );
}

generateWord();

function onAnswer(answer) {}

function ask(answer) {
  if (answer) {
    console.log(answer);
  } else {
    console.log("Mot mystère: ");
  }
  rl.question("Proposez un mot : \n--> ", onAnswer());
}

ask();
