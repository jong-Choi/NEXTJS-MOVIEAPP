import React from "react";
import styled from "styled-components";

const test = () => {
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "56.25%",
        backgroundImage: "url('/main.jpg')",
        backgroundSize: "cover",
      }}
    >
      <StyledContainer>sdfsdf</StyledContainer>
    </div>
  );
};

export default test;

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1000px;
  height: 1000px;
  backdrop-filter: blur(30px);
`;
