import styled from "styled-components";

export const StyledMovieRow = styled.section`
  .row {
    margin-left: 20px;
    color: white;
  }
  h2 {
    font-size: 1.5rem;
    padding-left: 20px;
  }
  .slider {
    position: relative;
    /* min-height: 160px; */
  }
  .slider__arrow-left {
    background-clip: content-box;
    padding: 20px 0;

    box-sizing: border-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
  }
  .slider__arrow-right {
    padding: 20px 0;
    background-clip: content-box;
    box-sizing: border-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 2;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
  }
  .arrow {
    transition: 400ms all ease-in-out;
  }
  /* 슬라이더에 올렸을 때에도 화살표가 커지도록 */
  .slider__arrow-right:hover .arrow {
    transition: 600ms all ease-in-out;
    transform: scale(1.5);
  }
  .slider__arrow-left:hover .arrow {
    transition: 600ms all ease-in-out;
    transform: scale(1.5);
  }
  .arrow:hover {
    transition: 400ms all ease-in-out;
    transform: scale(1.5);
  }

  .slider:hover .slider__arrow-left {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
  .slider:hover .slider__arrow-right {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
  .slider__arrow-left:hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
  .slider__arrow-right:hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }

  .row__posters {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px 0 20px 20px;
    scroll-behavior: smooth;
  }
  .row__posters::-webkit-scrollbar {
    display: none;
  }
  .row__poster {
    object-fit: contain;
    width: 100%;
    max-height: 144px;
    margin-right: 10px;
    transition: transform 450ms;
    border-radius: 4px;
  }
  .row__poster:hover {
    transform: scale(1.08);
  }
  .row__posterLarge {
    max-height: 320px;
  }
  .row__posterLarge:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  .row__arrow-left {
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    width: 32px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
  }
  .row__arrow-right {
    position: absolute;
    top: 0;
    right: 0px;
    height: 100%;
    width: 32px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: 1200px) {
    .row__poster {
      max-height: 160px;
    }
    .row__posterLarge {
      max-height: 360px;
    }
  }
  @media screen and (max-width: 768px) {
    .row__poster {
      max-height: 100px;
    }
    .row__posterLarge {
      max-height: 280px;
    }
  }

  /* .swiper-pagination {
  text-align: right !important;
} */
  .swiper-slide {
    padding: 0 0.3vw 0.1vh 0.3vw;
  }
  .swiper-pagination-bullet {
    background: gray !important;
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-active {
    background: white !important;
  }

  .swiper-button-prev {
    color: white !important;
    padding-bottom: 15px;
  }

  .swiper-button-next {
    color: white !important;
    padding-bottom: 15px;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.3rem !important;
    font-weight: 600 !important;
  }

  .swiper-button-next:hover {
    transition: 400ms all ease-in-out;
    transform: scale(1.2);
  }
  .swiper-button-prev:hover {
    transition: 400ms all ease-in-out;
    transform: scale(1.2);
  }
  @media screen and (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
  /*
  //이미지 위에 글자
// https://zzznara2.tistory.com/807
*/
  figure {
    width: 100%;
    position: relative;
  }

  figure img {
    display: block;
    width: 100%;
    height: auto;
  }
  /* 
  animation: fadein 0.3s;
  -moz-animation: fadein 0.3s; 
  -webkit-animation: fadein 0.3s; 
  -o-animation: fadein 0.3s; 
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {

  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {

  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
*/
  figure h4 {
    position: absolute;
    top: calc(100% - 50px);
    left: 0;
    width: 100%;
    height: 50px;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    margin: 0;
  }
  figure .overlay {
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    opacity: 0;
    width: 100%;
    cursor: pointer;
    /* height: 0; */
    height: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    -webkit-transition: 1s ease;
    transition: 1s ease;
  }
  figure .overlay .description {
    font-size: medium;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    word-break: keep-all;
    /* 글자수 자르기 https://eunyoe.tistory.com/19 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /* word-wrap: break-word; */
    /* line-height: 1.2em;
    height: 3.6em; */
  }

  figure:hover h4 {
    display: none;
  }
  figure:hover .overlay {
    display: block;
    opacity: 1;
    /* height: 100%; */
  }

  @media screen and (max-width: 768px) {
    figure .overlay .description {
      font-size: small;
    }
  }
`;
