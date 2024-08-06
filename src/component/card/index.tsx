import React from "react";
import { Food } from "../../model/food";
import "./index.scss";
type CardProps = {
  food: Food;
};
function Card({ food }: CardProps) {
  return (
    <div className="food-card">
      <img src={food.image} alt="" />
      <div className="food-card__wrapper">
        <div className="food-card__information">
          <div className="name">{food.name}</div>
          <div className="price">{food.price}</div>
        </div>
        <div className="food-card__description">
          {food.description.substring(0, 100)}
          {food.description.length > 100 && "..."}
        </div>
        <button className="button">Add to cart</button>
      </div>
    </div>
  );
}

export default Card;
