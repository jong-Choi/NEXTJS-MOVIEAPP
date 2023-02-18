import { Author } from "./profile";

export interface Article {
  documentId?: string;
  title: string;
  body: string;
  backdrop_path: string;
  published_date: number;
  author: Author;
  likes: Array<string>;
}
