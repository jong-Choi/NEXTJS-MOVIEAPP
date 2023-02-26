import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
  src: url('/fonts/NotoSansKR-Regular.woff2') format("woff2"),
  url('/fonts/NotoSansKR-Regular.otf') format('opentype');
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
  src: url('/fonts/NotoSansKR-Bold.woff2') format("woff2"),
  url('/fonts/NotoSansKR-Bold.otf') format('opentype');
  font-display: swap;
}
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
  .up-comming {
    visibility: hidden;
    animation-duration: 0.2s;
    animation-delay: 50ms;
    animation-name: title-up-comming;
    animation-fill-mode: forwards;
  }
  @keyframes title-up-comming {
    0% {
      opacity: 0;
      visibility: hidden;
      /* transform: translate3d(0, 105%, 0); */
    }
    100% {
      opacity: 1;
      visibility: visible;
      /* transform: translateZ(0); */
    }
  }
`;

export default GlobalStyle;
