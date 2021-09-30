interface ANSWER {
  _id: number;
  image: string;
  name: string | number;
  isCorrect?: boolean;
}

export interface QUESTION {
  _id: number;
  image: string;
  name: string;
  answers: ANSWER[];
}
