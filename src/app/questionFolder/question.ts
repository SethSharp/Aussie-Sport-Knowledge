// Question interface to hold basic paramters for a question
export interface Question {
  question: String;
  response_1: String;
  response_2: String;
  response_3: String;
  response_4: String;
  answer: number;
  category?: "";
}
