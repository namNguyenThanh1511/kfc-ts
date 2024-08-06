import React, { useEffect, useState } from "react";
import { Food } from "../../model/food";
import Card from "../card";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";
type FoodListProps = {
  foods: Food[];
};

function FoodList() {
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
    <div className="foodList">
      {foods.map((food, index) => (
        <>
          <Card food={food} />
        </>
      ))}
    </div>
  );
}

export default FoodList;
