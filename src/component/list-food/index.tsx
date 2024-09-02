import React, { useEffect, useState } from "react";
import { Food } from "../../model/food";
import Card from "../card";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";
type FoodListProps = {
  category?: string;
  title?: string;
};

function FoodList({ category, title }: FoodListProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const fetchFoods = async () => {
    try {
      const response = await api.get("product");
      console.log(response.data);
      setFoods(response.data);
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);
  useEffect(() => {
    if (category) {
      const filtered = foods.filter((food: Food) => {
        return food.categoryId === category;
      });
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  }, [foods, category]);
  if (filteredFoods.length === 0) {
    // return null to render nothing if no matching foods with current category provided
    return null;
  }
  return (
    <div className="foodList-wrapper">
      {title && <h1>{title}</h1>}
      <div className="foodList">
        {filteredFoods.map((food, index) => (
          <>
            <Card food={food} />
          </>
        ))}
      </div>
    </div>
  );
}

export default FoodList;
