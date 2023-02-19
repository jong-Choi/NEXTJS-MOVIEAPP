import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../../utils/useDebounce";

const CardTextArea = ({ searching, setInput, input = "" }) => {
  const [body, setBody] = useState(input);
  const debouncedBody = useDebounce(body, 200);
  useEffect(() => {
    setInput(debouncedBody);
  }, [debouncedBody]);

  // useEffect(() => {
  //   setInput(body);
  // }, [body]);
  return (
    <StyledTextArea
      className={`fs-6 ${searching ? "d-none" : ""}`}
      placeholder="이 영화가 어땠나요?"
      value={body}
      onChange={(e) => {
        setBody(e.target.value);
      }}
      rows={5}
      maxLength={100}
      autoFocus
    ></StyledTextArea>
  );
};

export default CardTextArea;

const StyledTextArea = styled.textarea`
  width: 100%;
  color: #fff;
  background: transparent;
  border: none;
  outline: none;
`;
