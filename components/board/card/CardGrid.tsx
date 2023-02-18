import React from "react";
import Card from "./Card";
import CardCreate from "./CardCreate";

const CardGrid = ({ creating, setCreating }) => {
  return (
    <div className="container">
      <div className="row">
        {creating ? <CardCreate setCreating={setCreating} /> : <></>}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default CardGrid;
