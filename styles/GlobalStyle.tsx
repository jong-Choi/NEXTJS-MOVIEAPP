import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: "Noto Sans KR", sans-serif;
    background-color: #01192f;
    /* padding-top: 75px; */
    color: #ffff;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
