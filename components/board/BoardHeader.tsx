import React from "react";
import styled from "styled-components";
import { toastError } from "../../utils/toastAlert";

const BoardHeader = ({ creating, setCreating, uid }) => {
  return (
    <StyledBoardHeader className="container">
      <div className="row">
        <div className="col text-center mb-5">
          <h1>영화 일기</h1>
          <div
            className={`lead eddting-text ${creating && "invisible"}`}
            onClick={() => {
              if (!uid) return toastError("로그인이 필요합니다.");
              setCreating(true);
            }}
          >
            새로운 글을 작성해보세요
          </div>
        </div>
      </div>
    </StyledBoardHeader>
  );
};

export default BoardHeader;

export const StyledBoardHeader = styled.div`
  .eddting-text {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    color: orange;
    font-size: small;
    font-weight: 500;
    &:hover {
      transform: scale(1.05);
    }
  }
`;
