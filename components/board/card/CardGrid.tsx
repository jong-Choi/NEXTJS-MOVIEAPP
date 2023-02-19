import React, { useEffect, useState } from "react";
import { fetchAticles } from "../../../services/fbDb";
import { Article } from "../../../types/article";
import Card from "./Card";
import CardCreate from "./CardCreate";

const CardGrid = ({ creating, setCreating }) => {
  const [articles, setArticles] = useState([] as Article[]);
  const [grid, setGrid] = useState([]);
  const [cardList, setCardlist] = useState([]);
  const [updated, setUpdated] = useState(false);

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
  }, [articles]);

  useEffect(() => {
    if (creating) {
      setGrid([
        <CardCreate
          setCreating={setCreating}
          setUpdated={setUpdated}
          key="CardCreate"
        />,
        ...cardList,
      ]);
    } else {
      if (updated) {
        setGrid([...cardList]);
      } else {
        fetchAticles().then((articles) => {
          setArticles(articles);
        });
      }
    }
  }, [creating]);

  return (
    <div className="container">
      <div className="row">{grid}</div>
    </div>
  );
};

export default CardGrid;
