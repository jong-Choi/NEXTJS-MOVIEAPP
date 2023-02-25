import Link from "next/link";
import React from "react";
import { useTypedSelector } from "../../../store";
import ProfileLink from "../../ProfileLink";

const CardFooter = ({ author, published_date = 0 }) => {
  const { uid, nickname, image } = author;
  const myUid = useTypedSelector((state) => state.authSlice.userProfile.uid);
  const now = Date.now();
  const gap = now - published_date;
  let published_date_messge;
  if (gap < 60 * 1000) published_date_messge = "방금 전";
  else if (gap < 60 * 60 * 1000)
    published_date_messge = `${Math.floor(gap / (60 * 1000))}분 전`;
  else if (gap < 24 * 60 * 60 * 1000)
    published_date_messge = `${Math.floor(gap / (60 * 60 * 1000))}시간 전`;
  else if (gap < 15 * 24 * 60 * 60 * 1000)
    published_date_messge = `${Math.floor(gap / (24 * 60 * 60 * 1000))}일 전`;
  else if (gap < 365 * 24 * 60 * 60 * 1000)
    published_date_messge = `${Math.floor(
      gap / (30 * 24 * 60 * 60 * 1000),
    )}개월 전`;
  else
    published_date_messge = `${Math.floor(
      gap / (365 * 24 * 60 * 60 * 1000),
    )}년 전`;

  return (
    <ProfileLink uid={uid} myUid={myUid} className="text-white">
      <div className="card-footer" title="프로필로 이동하기">
        <div className="media">
          <div className="d-flex">
            <img
              className="mr-3 rounded-circle"
              src={`${image}`}
              alt="Generic placeholder image"
              style={{ maxWidth: "50px" }}
            />
            <div className={published_date ? `card-profile` : `d-none`}>
              <h6 className="my-0 text-white d-block">{nickname}</h6>
              <small>{published_date_messge}</small>
              {/* <small>Director of UI/UX</small> */}
            </div>
          </div>
        </div>
      </div>
    </ProfileLink>
  );
};

export default CardFooter;
