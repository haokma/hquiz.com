export interface History {
  _id: string;
  isSubmit: boolean;
  totalError: number;
  totalSuccess: number;
  totalEmpty: number;
  totalComplete: number;
  score: number;
  questions: Array<any>;
  answersResult: Array<any>;
  timespan: number;
  topicId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
