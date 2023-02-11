import { MyMovie } from "./moive";

export interface ProfileType {
  uid: string;
  nickname: string;
  image: string;
  myMovies: Array<MyMovie>;
  myRecommendations: Array<MyMovie>;
}

export interface ProfileDataType extends ProfileType {
  documentId: string;
}
