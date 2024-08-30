import React from "react";
import { Food } from "../../model/food";
import "./index.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/cartSlice";
import { NumericFormat } from "react-number-format";
type CardProps = {
  food: Food;
};
function Card({ food }: CardProps) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(food));
  };
  return (
    <div onClick={handleAddToCart} className="food-card">
      <img src={food.image} alt="" />
      <div className="food-card__wrapper">
        <div className="food-card__information">
          <div className="name">{food.name}</div>
          <div className="price">
            <NumericFormat
              value={food.price}
              displayType="text"
              thousandSeparator={true}
              suffix=" VND"
            />
          </div>
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
