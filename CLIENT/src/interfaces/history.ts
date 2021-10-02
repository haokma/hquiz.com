import { QUESTION } from './index';

export interface History {
  _id: string;
  isSubmit: boolean;
  totalError: number;
  totalSuccess: number;
  totalEmpty: number;
  totalComplete: number;
  score: number;
  questions: QUESTION[];
  answers: number[];
  answersResult: number[];
  timespan: number;
  topicId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
