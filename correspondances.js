function gererRouge(motCandidat, motMystere, i, correspondances) {
  var j = i;
  if (motCandidat[i] === motMystere[j]) {
    correspondances[i].couleur = "rouge";
  }
}

function gererJauneEtBlanc(motCandidat, motMystere, i, correspondances) {
  if (correspondances[i].couleur === "rouge") return;

  // combien de fois cette lettre est presente dans le mot mystere ?
  var occurrencesMotMystere = compterOccurrencesDansMotMystere(
    motCandidat[i],
    motMystere
  );

  // combien de fois cette lettre a été trouvé jusque là ?
  var correspondancesRouge = compterCorrespondances(
    motCandidat[i],
    correspondances,
    "rouge"
  );
  var correspondancesJaune = compterCorrespondances(
    motCandidat[i],
    correspondances,
    "jaune"
  );

  if (occurrencesMotMystere - correspondancesRouge - correspondancesJaune > 0) {
    correspondances[i].couleur = "jaune";
  } else {
    correspondances[i].couleur = "blanc";
  }
}

function compterOccurrencesDansMotMystere(lettre, motMystere) {
  var count = 0;
  for (var k = 0; k < motMystere.length; k++) {
    if (motMystere[k] === lettre) {
      count++;
    }
  }
  return count;
}

function compterCorrespondances(lettre, correspondances, couleur) {
  var count = 0;
  for (var k = 0; k < correspondances.length; k++) {
    if (
      correspondances[k].lettre === lettre &&
      correspondances[k].couleur === couleur
    ) {
      count++;
    }
  }
  return count;
}

function remplirCorrespondances(motCandidat) {
  var correspondances = [];
  for (var i = 0; i < motCandidat.length; i++) {
    correspondances.push({
      lettre: motCandidat[i],
      couleur: "inconnu"
    });
  }
  return correspondances;
}

function correspondances(motCandidat, motMystere) {
  var correspondances = remplirCorrespondances(motCandidat);

  for (var i = 0; i < motCandidat.length; i++) {
    gererRouge(motCandidat, motMystere, i, correspondances);
  }
  for (var i = 0; i < motCandidat.length; i++) {
    gererJauneEtBlanc(motCandidat, motMystere, i, correspondances);
  }

  return correspondances;
}

module.exports = correspondances;
