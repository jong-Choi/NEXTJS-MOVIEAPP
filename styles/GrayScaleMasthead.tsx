import styled from "styled-components";

const GrayScaleMasthead = styled.div`
  .masthead {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 35rem;
    padding: 15rem 0;
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
  .masthead h1,
  .masthead .h1 {
    font-family: "Noto Sans KR", "Varela Round", -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-display: block;
    font-size: 2.5rem;
    line-height: 2.5rem;
    letter-spacing: 0.8rem;
    background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0)
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .masthead h2,
  .masthead .h2 {
    max-width: 20rem;
    font-size: 1rem;
  }
  @media (min-width: 768px) {
    .masthead h1,
    .masthead .h1 {
      font-size: 4rem;
      line-height: 4rem;
    }
  }
  @media (min-width: 992px) {
    .masthead {
      height: 100vh;
      padding: 0;
    }
    .masthead h1,
    .masthead .h1 {
      font-size: 6.5rem;
      line-height: 6.5rem;
      letter-spacing: 0.8rem;
    }
    .masthead h2,
    .masthead .h2 {
      max-width: 30rem;
      font-size: 1.25rem;
    }
  }
  .after-0-secs {
    visibility: hidden;
    animation: fadein 200ms;
    animation-fill-mode: forwards;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      visibility: hidden;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
  .mast_hidden {
    visibility: hidden;
  }
  .after-01-secs {
    visibility: hidden;
    animation: fadein 1000ms;
    animation-delay: 100ms;
    animation-fill-mode: forwards;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      visibility: hidden;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
  .up-lift {
    animation: up 500ms;
    animation-fill-mode: forwards;
  }
  @keyframes up {
    0% {
      opacity: 1;
      visibility: visible;
      transform: translateZ(0);
    }
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translate3d(0, -5%, 0);
    }
  }
`;

export default GrayScaleMasthead;
