import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import BoardHeader from "../components/board/BoardHeader";
import CardGrid from "../components/board/card/CardGrid";
import { authService } from "../public/fbase";
import { fetchProfile } from "../services/fbProfile";
import { useTypedSelector } from "../store";
import { setUserProfile } from "../store/authSlice";

const board = () => {
  const dispatch = useDispatch();
  const [creating, setCreating] = useState(false);
  const { uid } = useTypedSelector((state) => {
    return state.authSlice.userProfile;
  }, shallowEqual);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (uid !== user.uid) {
          fetchProfile(user.uid).then((res) => {
            dispatch(setUserProfile(res));
          });
        }
      }
    });
  }, [uid]);

  return (
    <div>
      <BoardHeader creating={creating} setCreating={setCreating} uid={uid} />
      <CardGrid creating={creating} setCreating={setCreating} />
    </div>
  );
};

export default board;
