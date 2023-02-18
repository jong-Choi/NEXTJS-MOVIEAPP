import { dbService } from "../../public/fbase";
import { Article } from "../../types/article";

export const patchPreload = async (
  validate: number,
  preloadData: Array<string>,
) => {
  return dbService
    .doc("preloading/data")
    .update({
      validate,
      preloadData,
    })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

interface PreloadDataType {
  preloadData: Array<string>;
  validate: number;
}
export const fetchPreload = async (): Promise<PreloadDataType> => {
  return dbService
    .doc("preloading/data")
    .get()
    .then((Snapshot) => {
      const result = Snapshot.data() as PreloadDataType;
      return result;
    })
    .catch((err) => err);
};

export const createArticle = async (article: Article) => {
  return dbService.collection("articles").add(article);
};

// export const fetchProfile = async (uid: string) => {
//   const userRef = dbService.collection("user");
//   const query = userRef.where("uid", "==", uid);
//   return query
//     .get()
//     .then(async (Snapshot) => {
//       const documentId = Snapshot.docs[0]?.id;
//       const documentData = await Snapshot.docs[0]?.data();
//       const data = { documentId, ...documentData } as ProfileDataType;
//       return Promise.resolve(documentData ? data : null);
//     })
//     .catch((err) => {
//       return Promise.reject(err);
//     });
// };
