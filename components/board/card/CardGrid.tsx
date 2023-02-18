import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { fetchAticles } from "../../../services/fbDb";
import { useTypedSelector } from "../../../store";
// import { setArticles } from "../../../store/dbSlice";
import { Article } from "../../../types/article";
import Card from "./Card";
import CardCreate from "./CardCreate";

const CardGrid = ({ creating, setCreating }) => {
  const dispatch = useDispatch();
  // const articles = useTypedSelector((state) => {
  //   return state.dbSlice.articles;
  // }, shallowEqual);
  const [articles, setArticles] = useState([]);
  const [grid, setGrid] = useState([]);
  const [cardList, setCardlist] = useState([]);
  const [updated, setUpdated] = useState(false);

  // useEffect(() => {
  //   fetchAticles().then((articles) => {
  //     // dispatch(
  //     setArticles(articles);
  //     // );
  //   });
  // }, []);

  useEffect(() => {
    const cardList = articles.map((article) => {
      return <Card article={article} key={article.documentId} />;
    });
    setCardlist(cardList);
    setGrid(cardList);
    setUpdated(true);
  }, [articles]);

  useEffect(() => {
    if (creating) {
      setGrid([
        <CardCreate setCreating={setCreating} setUpdated={setUpdated} />,
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

  useEffect(() => {
    if (updated) return;

    const cardList = articles.map((article) => {
      console.log(article);
      return <Card article={article} key={article.documentId} />;
    });

    setUpdated(true);
  }, [updated]);

  return (
    <div className="container">
      <div className="row">{grid}</div>
    </div>
  );
};

export default CardGrid;
