interface ANSWER {
  _id: number;
  image: string;
  value: string | number;
  isCorrect?: boolean;
}

export interface QUESTION {
  _id: number;
  image: string;
  title: string;
  answers: ANSWER[];
}
