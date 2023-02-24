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
  h1, h2, h3, h4, h5, h6 {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
`;

export default GlobalStyle;
