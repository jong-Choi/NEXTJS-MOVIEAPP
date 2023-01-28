export interface ProfileType {
  uid: string;
  nickname: string;
  image: string;
  myMovies: Array<number>;
}

export interface ProfileDataType extends ProfileType {
  documentId: string;
}
