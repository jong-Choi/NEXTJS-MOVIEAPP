import React from "react";
import { fetchProfile } from "../../services/fbProfile";
import wrapper from "../../store";
import { ProfileDataType } from "../../types/profile";

const profile = ({ profile }: { profile: ProfileDataType | null }) => {
  return (
    <div>{profile.uid.slice(0, 5) + profile.image + profile.nickname}</div>
  );
};

export default profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req.headers.cookie;
      let cookieUid;
      if (cookie) {
        const cookieArr = cookie.split("; ").map((cookie) => {
          const [key, value] = cookie.split("=");
          return { key: key, value: value };
        });
        const { key: uidKey, value: uidValue } = cookieArr.find(
          (e) => e.key === "uid",
        );
        cookieUid = uidValue;
      }
      const userObject = await store.getState().authSlice.userObject;
      const uid = cookieUid || userObject?.uid;
      if (!uid) {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
          props: { profile: null },
        };
      }

      const profile = await fetchProfile(uid);
      if (!profile) {
        return {
          redirect: {
            permanent: false,
            destination: "/profile/create",
          },
          props: { profile: null },
        };
      }
      return { props: { profile: profile } };
    },
);
