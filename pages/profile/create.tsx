import { useRouter } from "next/router";
import React, { useState } from "react";
import { dbService } from "../../public/fbase";
import { createProfile, fetchProfile } from "../../services/fbProfile";
import wrapper from "../../store";
import { setUserProfile } from "../../store/authSlice";
import { ProfileType } from "../../types/profile";

const create = ({ userObject }) => {
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("/default.png");
  const [movie, setMovie] = useState("");
  const [myMovies, setMyMovies] = useState([]);
  const router = useRouter();
  const onRequest = () => {
    createProfile({ uid: userObject.uid, nickname, image, myMovies })
      .then(async (res) => {
        const documentId = res.id;
        const profileData = await res.get().then((res) => {
          return res.data() as ProfileType;
        });
        await setUserProfile({ ...profileData, documentId });
        router.push("/main");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input
        type="text"
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="nickname"
      ></input>
      <input
        type="text"
        id="image"
        name="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        disabled
      ></input>
      <input
        type="number"
        id="movie"
        name="movie"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="movie"
      ></input>
      <button
        type="button"
        onClick={(e) => {
          if (myMovies.length < 5) setMyMovies([...myMovies, movie]);
        }}
      >
        {" "}
        영화 추가하기
      </button>
      {myMovies.map((element, idx) => {
        return (
          <button
            type="button"
            key={idx.toString + Math.random().toFixed(20)}
            onClick={async (e) => {
              myMovies.splice(myMovies.indexOf(element), 1);
              setMyMovies([...myMovies]);
            }}
          >
            {element}번 영화 삭제하기
          </button>
        );
      })}
      <br />
      <button type="button" onClick={onRequest}>
        프로필 작성 완료하기
      </button>
    </div>
  );
};

export default create;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const userObject = await store.getState().authSlice.userObject;
  if (!userObject) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: { userObject },
    };
  }
  const userProfile = await fetchProfile(userObject.uid);
  if (userProfile) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: { userObject },
    };
  }
  return {
    props: {
      userObject,
    },
  };
});
