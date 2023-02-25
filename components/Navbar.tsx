import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchData } from "../services/tmdbApi";
import { useTypedSelector } from "../store";
import GrayScaleMastheadH1 from "../styles/GrayScaleMastheadH1";
import { toastInfo } from "../utils/toastAlert";
import useDebounce from "../utils/useDebounce";
import CardFooter from "./board/card/CardFooter";
import SearchResult from "./SearchResult";

function Navbar() {
  const router = useRouter();

  const isLanding =
    router.pathname === "/" || router.pathname === "/profile/create";
  if (isLanding) return <></>;

  const profile = useTypedSelector((state) => state.authSlice.userProfile);
  useEffect(() => {
    if (!profile?.uid) {
      router.push("/").then(() => toastInfo("로그인이 필요합니다."));
    }
  }, []);

  const isMain = router.pathname === "/main";
  const header = isMain ? (
    <GrayScaleMastheadH1>
      <header className={`navhead`}>
        <h1 className="">TEAL AND ORANGE</h1>
      </header>
    </GrayScaleMastheadH1>
  ) : (
    <></>
  );

  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const opa = position < 280 ? (position - 100) / 200 + 0.1 : 0.95;

  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 200);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (!debouncedInput) return setMovies([]);
    getSearchData(debouncedInput).then((res) => {
      setMovies(res.data.results);
    });
  }, [debouncedInput]);
  return (
    <>
      {header}
      <div
        className="container sticky-top d-flex justify-content-center"
        style={{
          backgroundColor: `rgba(1, 25, 47, ${
            input && debouncedInput ? 0 : opa
          })`,
        }}
      >
        <StyledNav className="nav col-12 col-lg-10">
          <Image
            height={40}
            width={120}
            alt="logo"
            src="/logo.png"
            className="nav__logo mt-1"
            role="button"
            onClick={() => router.push("/main")}
          />
          <div className="d-flex  pr-5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="nav__input"
              type="text"
              placeholder="영화를 검색해주세요."
            />
            <div
              className={`nav__cancel ${input ? "visible" : "invisible"}`}
              onClick={() => setInput("")}
            >
              취소
            </div>
            <div style={{ width: "27px" }}></div>
          </div>
          <div style={{ height: "10px" }}>
            <CardFooter author={profile}></CardFooter>
          </div>
        </StyledNav>
        <SearchResult
          debouncedInput={debouncedInput}
          input={input}
          movies={movies}
          onResultClick={(movie) => {
            router.push(`/movie/${movie.id}`);
            setInput("");
          }}
          mainMode={true}
        />
      </div>
    </>
  );
}

export default Navbar;

const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  height: 55px;
  z-index: 3;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition-timing-function: ease-in;
  transition: all 0.5s;

  .nav__black {
    background-color: #01192f;
  }

  /* object-fit으로 크기를 자동조절되게 */
  .nav__logo {
    /* position: fixed; */
    /* left: 40px; */
    width: 120px;
    object-fit: contain;
  }

  /* 아바타 부분만 FIXED로 화면을 옮겨줌 */
  .nav__avatar {
    /* position: fixed; */
    /* right: 40px; */
    width: 30px;
    object-fit: contain;
  }

  .nav__input {
    /* position: fixed; */
    /* left: 50%; */
    /* transform: translate(-50%, 0); */
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    color: white;
    opacity: 0.6;
    border: none;
    margin-top: 2px;
    text-align: center;
    font-size: small;
    height: 1rem;
  }

  .nav__cancel {
    font-size: small;
    opacity: 0.6;
    cursor: pointer;
    margin: 0 10px;
  }
`;
