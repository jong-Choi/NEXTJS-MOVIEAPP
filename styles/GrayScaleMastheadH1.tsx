import styled from "styled-components";

const GrayScaleMastheadH1 = styled.div`
  .masthead {
    position: relative;
    width: 100%;
    height: 100vh;

    /* min-height: 35rem; */
    padding: 0;
    background: linear-gradient(
      to bottom,
      rgba(250, 171, 54, 0.3) 0%,
      rgba(0, 95, 96, 1) 60%,
      #01192f 100%
    );
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
  }
  .navhead {
    position: static;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 3vw;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  .navhead h1,
  .masthead h1,
  .masthead .h1 {
    font-family: "Noto Sans KR", "Varela Round", -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-display: block;
    font-size: 3vw;
    line-height: 2.5rem;
    letter-spacing: 1.5vw;
    background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(250, 171, 54, 0.1)
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
  }
  .navhead h1 {
    font-size: 3vw;
    background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(250, 171, 54, 0)
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    @media (min-width: 1400px) {
      font-size: 2vw;
    }
  }

  .masthead h2,
  .masthead .h2 {
    /* max-width: 20rem; */
    width: 70%;
    font-size: 1rem;
    letter-spacing: 1rem;
    text-align: center;
    word-break: keep-all;
    @media (min-width: 992px) {
      font-size: 1.2vw;
    }
  }
`;

export default GrayScaleMastheadH1;
