import styled from "styled-components";

const StyledForm = styled.div`
  .title {
    visibility: hidden;
    animation-duration: 1s;
    animation-delay: 0.5s;
    animation-name: title-up-comming;
    animation-fill-mode: forwards;
  }
  .title-delayed {
    visibility: hidden;
    animation-duration: 1s;
    animation-delay: 1.5s;
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

  label {
    transition: 0.1s;
  }
  .pointer {
    cursor: pointer;
  }
  .small-text-container {
    height: 20px;
  }
  .small-image-container {
    height: 60px;
    transition: 0.2s;
    animation-duration: 0.1s;
    animation-name: slidein;
  }
  @keyframes slidein {
    from {
      height: 0px;
    }
    to {
      height: 60px;
    }
  }
  .small-text {
    font-size: 12px;
  }
  .small-image {
    max-height: 40px;
    cursor: pointer;
    transition: 0.2s;
    animation-duration: 0.1s;
    animation-name: slidein-image;
  }
  @keyframes slidein-image {
    from {
      height: 0px;
    }
    to {
      height: 40px;
    }
  }
  .small-image:hover {
    max-height: 60px;
  }
  .profile-image {
    max-height: 100px;
  }
  .login-dark {
    height: 1000px;
    position: relative;
    animation: up-comming 1000ms;
    animation-fill-mode: forwards;
  }
  @keyframes up-comming {
    0% {
      opacity: 0;
      transform: translate3d(0, 3%, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  .login-dark form {
    max-width: 710px;
    width: 90%;
    background-color: #1e2833;
    padding: 40px;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 40%;
    left: 50%;
    color: #fff;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  }

  .login-dark .illustration {
    text-align: center;
    padding: 15px 0 20px;
    font-size: 100px;
    color: #2980ef;
  }

  .login-dark form .form-control {
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }

  .login-dark form .btn-primary {
    background: #214a80;
    border: none;
    border-radius: 4px;
    padding: 11px;
    box-shadow: none;
    margin-top: 26px;
    text-shadow: none;
    outline: none;
  }

  .login-dark form .btn-primary:hover,
  .login-dark form .btn-primary:active {
    background: #2e62a6;
    outline: none;
  }

  .login-dark form .disabled {
    opacity: 0.2;
  }

  .login-dark form .forgot {
    display: block;
    text-align: center;
    font-size: 12px;
    min-height: 20px;
    color: #b8a090;
    opacity: 1;
    text-decoration: none;
  }

  .login-dark form .btn-primary:active {
    transform: translateY(1px);
  }
`;

export default StyledForm;
