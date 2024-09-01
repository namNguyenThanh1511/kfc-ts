import React, { useEffect, useState } from "react";
import { Food } from "../../model/food";
import Card from "../card";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";
type FoodListProps = {
  title?: string;
  category?: string;
};

function FoodList({ title, category }: FoodListProps) {
  const [foods, setFoods] = useState<Food[]>([]);

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

  return (
    <div>
      <h1>{title}</h1>
      <div className="foodList">
        {foods.map((food, index) => {
          if (food.categoryId === category) {
            return (
              <>
                <Card food={food} />
              </>
            );
          }
        })}
      </div>
    </div>
  );
}

export default FoodList;
