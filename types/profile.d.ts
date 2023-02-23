import { MyMovie } from "./moive";

export interface Author {
  uid: string;
  nickname: string;
  image: string;
}

export interface ProfileType extends Author {
  myMovies: Array<MyMovie>;
  myRecommendations: Array<MyMovie>;
}

export interface ProfileDataType extends ProfileType {
  documentId: string;
  followers: Author[];
  followings: Author[];
}
