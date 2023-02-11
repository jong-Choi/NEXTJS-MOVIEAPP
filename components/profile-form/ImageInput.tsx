import React, { useState } from "react";

const ImageInput = ({ image, setImage }) => {
  const [changinProfile, setChangingProfile] = useState(false);
  return (
    <div className="text-center">
      <div className="form-floating pointer">
        <img src={image} className="profile-image mt-2" />
        <div
          className={`d-flex align-items-center d-flex justify-content-center small-image-container ${
            changinProfile ? "" : "d-none"
          }`}
          onClick={(e: any) => {
            if (e.target.src)
              setImage(
                `/profileImages/${e.target.src.split("/").slice(-1)[0]}`,
              );
          }}
        >
          <img src="/profileImages/1.jpg" className="small-image" />
          <img src="/profileImages/2.jpg" className="small-image" />
          <img src="/profileImages/3.jpg" className="small-image" />
          <img src="/profileImages/4.jpg" className="small-image" />
          <img src="/profileImages/5.jpg" className="small-image" />
          <img src="/profileImages/6.jpg" className="small-image" />
          <img src="/profileImages/7.jpg" className="small-image" />
          <img src="/profileImages/8.jpg" className="small-image" />
          <img src="/profileImages/9.jpg" className="small-image" />
          <img src="/profileImages/10.jpg" className="small-image" />
          <img src="/profileImages/11.jpg" className="small-image" />
        </div>
        <div
          className="text-light"
          onClick={() => {
            setChangingProfile(!changinProfile);
          }}
        >
          {changinProfile ? "사진 변경 완료하기" : "프로필 사진 변경하기"}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageInput);
