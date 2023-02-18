import React from "react";

const CardBody = ({ article, likesCount }) => {
  const { title, body, published_date } = article;
  return (
    <div className="card-body">
      <small className="card-meta mb-2">
        {title.length > 20 ? title.slice(0, 18) + "..." : title}
      </small>
      <h4 className="card-title mt-0 ">
        <div className="text-white fs-6">
          {body}
          {/* 90글자 */}
        </div>
      </h4>
    </div>
  );
};

export default CardBody;
