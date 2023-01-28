export interface ProfileType {
  uid: string;
  nickname: string;
  image: string;
  myMovies: Array<number>;
}

export interface UpdatingProfileType extends ProfileType {
  documentId: string;
}
