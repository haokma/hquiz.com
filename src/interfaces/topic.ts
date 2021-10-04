export interface TOPIC {
  _id: string;
  typeId: number;
  name: string;
  time: number;
  views: number;
  slug: string;
  questionCount: number;
  image: string;
  questions?: any;
}
