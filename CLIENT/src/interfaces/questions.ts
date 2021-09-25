interface ANSWER {
  _id: number;
  image: string;
  value: string | number;
}

export interface QUESTION {
  _id: number;
  image: string;
  title: string;
  answers: ANSWER[];
}
