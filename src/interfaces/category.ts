export interface FILTERCATEGORY {
  limit: number;
  page: number;
  categoryId: string;
}

export interface CATEGORY {
  name: string;
  image: string;
  slug: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  parentId: string | null;
}

export interface TOPICTYPE {
  _id: string;
  name: string;
}
