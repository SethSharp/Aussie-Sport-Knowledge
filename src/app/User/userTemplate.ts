
// User template
export let UserTemplate = {
  name: "",
  score: 0,
  correct: 0,
  incorrect: 0,
  // Default image
  img: "./assets/images/default.png",
  // eg; NRL [0,0], first index is correct and second is incorrect counts (in terms of guess for that sport)
  sports: { 'NRL': [0,0], 'AFL': [0,0], 'CRI': [0,0] },
  answerSteak: 0,
  bestAnswerStreak: 0,
  totalGames: 0,
  totalMuliplayerGames: 0,
  id: -1
};

