export interface User {
  name: String;
  password: String;
  description: String;
  profilePicture: String; // String which holds image address
  totalScore: Number;
  correct: Number; //Will hold data of their correct answer ratio
  inCorrect: Number;
}
