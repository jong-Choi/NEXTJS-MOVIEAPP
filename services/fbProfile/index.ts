import { ProfileDataType, ProfileType } from "./../../types/profile.d";
import { dbService } from "../../public/fbase";

export const fetchProfile = async (uid: string) => {
  const userRef = dbService.collection("user");
  const query = userRef.where("uid", "==", uid);
  return query
    .get()
    .then(async (Snapshot) => {
      const documentId = Snapshot.docs[0]?.id;
      const documentData = await Snapshot.docs[0]?.data();
      const data = { documentId, ...documentData } as ProfileDataType;
      return Promise.resolve(documentData ? data : null);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const createProfile = async (Profile: ProfileType) => {
  const { uid, nickname, image, myMovies } = Profile;
  return dbService
    .collection("user")
    .add({
      uid,
      nickname,
      image,
      myMovies,
    })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

export const updateProfile = (UpdatingProfile: ProfileDataType) => {
  const { documentId, uid, nickname, image, myMovies } = UpdatingProfile;
  return dbService
    .doc(`user/${documentId}`)
    .update({ uid, nickname, image, myMovies })
    .then(() => {
      return Promise.resolve({ uid, nickname, image, myMovies } as ProfileType);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const fbProfile = { fetchProfile, createProfile, updateProfile };
export default fbProfile;