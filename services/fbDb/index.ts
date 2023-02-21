import { dbService } from "../../public/fbase";
import { Article } from "../../types/article";

export const createArticle = async (article: Article) => {
  return dbService.collection("articles").add(article);
};

export const fetchAticles = (published_date = 0) => {
  const dbRef = dbService
    .collection("articles")
    .orderBy("published_date", "desc");

  const query = published_date
    ? dbRef.startAfter(published_date).limit(40)
    : dbRef.limit(40);

  return query.get().then((Snapshot) => {
    console.log(Snapshot.docs);
    const Articles = Snapshot.docs.map((doc) => {
      const documentId = doc.id;
      const documentData = doc.data();
      return { documentId, ...documentData } as Article;
    });
    return Articles;
  });
};

//   return dbService
//     .collection("articles")
//     .orderBy("published_date", "desc")
//     .get()
//     .then((Snapshot) => {
//       const Articles = Snapshot.docs.map((doc) => {
//         const documentId = doc.id;
//         const documentData = doc.data();
//         return { documentId, ...documentData } as Article;
//       });
//       return Articles;
//     });
// };

export const updateArticle = (documentId, payload) => {
  return dbService.doc(`articles/${documentId}`).update(payload);
};

export const deleteArticle = (documentId) => {
  return dbService.doc(`articles/${documentId}`).delete();
};
