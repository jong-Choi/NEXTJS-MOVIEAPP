import React, { useEffect, useRef, useState } from "react";
import { fetchAticles } from "../../../services/fbDb";
import { Article } from "../../../types/article";
import { useIntersection } from "../../../utils/useIntersection";
import Card from "./Card";
import CardCreate from "./CardCreate";

const CardGrid = ({ creating, setCreating, initialArticles = null }) => {
  const [articles, setArticles] = useState([] as Article[]);
  const [grid, setGrid] = useState([]);
  const [cardList, setCardlist] = useState([]);
  const [updated, setUpdated] = useState(false);

  const [publishedDate, setPublishedDate] = useState(
    articles.at(-1)?.published_date || 0,
  );
  const [triggered, setTriggered] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef();

  // useEffect(()=>{
  //   if (initialArticles.length) {
  //     setArticles(initialArticles);
  //     setPublishedDate(initialArticles.at(-1).published_date);
  //     setIsLastPage(true);
  //   }
  // }, [])

  useEffect(() => {
    if (!triggered) return;
    if (isLastPage) return setTriggered(false);
    if (initialArticles) {
      setArticles(initialArticles);
      setPublishedDate(initialArticles.at(-1).published_date);
      return setIsLastPage(true);
    }
    fetchAticles(publishedDate).then((articles) => {
      if (articles.length === 0) return setIsLastPage(true);
      setPublishedDate(articles.at(-1).published_date);
      if (!publishedDate) return setArticles(articles);
      setArticles((prev) => {
        return [...prev, ...articles];
      });
    });
    setTriggered(false);
  }, [triggered]);

  useIntersection(
    trigger,
    () => {
      setTriggered(true);
    },
    true,
  );

  useEffect(() => {
    const cardList = articles.map((article) => {
      return (
        <Card
          article={article}
          key={article.documentId}
          setArticles={setArticles}
        />
      );
    });
    setCardlist(cardList);
    setGrid(cardList);
    setUpdated(true);
    setCreating(false);
  }, [articles]);

  const setTrigger = () => {
    fetchAticles().then((articles) => {
      setArticles(articles);
      setPublishedDate(articles.at(-1).published_date);
      setIsLastPage(false);
    });
  };

  useEffect(() => {
    if (creating) {
      setGrid([
        <CardCreate
          setCreating={setCreating}
          setTrigger={setTrigger}
          key="CardCreate"
        />,
        ...cardList,
      ]);
    } else if (updated) {
      setGrid([...cardList]);
    }
  }, [creating]);

  return (
    <div className="container">
      <div className="row">{grid}</div>
      <div
        ref={trigger}
        style={{ width: "100%", marginBottom: "20px" }}
        role="button"
        onClick={() => setTriggered(true)}
      >
        {!isLastPage && articles.length ? "추가로 로딩하기" : ""}
      </div>
    </div>
  );
};

export default CardGrid;
