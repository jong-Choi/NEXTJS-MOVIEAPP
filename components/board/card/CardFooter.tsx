import React from "react";

const CardFooter = ({ author, published_date }) => {
  const { uid, nickname, image } = author;

  return (
    <div className="card-footer">
      <div className="media">
        <div className="d-flex">
          <img
            className="mr-3 rounded-circle"
            src={`${image}`}
            alt="Generic placeholder image"
            style={{ maxWidth: "50px" }}
          />
          <div className="card-profile">
            <h6 className="my-0 text-white d-block">{nickname}</h6>
            <small>{published_date}</small>
            {/* <small>Director of UI/UX</small> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFooter;
