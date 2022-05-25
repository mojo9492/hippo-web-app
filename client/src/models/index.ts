export interface Post {
  id?: string;
  date: Date;
  bloodPressure?: string;
  bsl?: number;
  insulin?: string;
  insAmount?: number;
  weight?: number;
  remarks?: string;
  updatedAt?: Date;
  author?: User;
  authorId?: number;
}

export interface User {
  id: number;
  last: string;
  first: string;
  email: string;
  password: string;
  updatedAt: Date;
  posts: Post[];
  accessToken: string
}
