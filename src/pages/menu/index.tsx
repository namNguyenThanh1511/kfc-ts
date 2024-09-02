import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import FoodList from "../../component/list-food";
import Carousel from "../../component/carousel";
import SearchBar from "../../component/search-bar";
import { Category } from "../../model/category";
import api from "../../config/api";
import CategoryNavBar from "../../component/category-navigation-bar";
function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("category");
      // setCategories() : async -> current categories may still hold its previous value
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [categories]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <CategoryNavBar categories={categories} />
      <div>
        {categories.map((category) => (
          <div id={category.id}>
            <FoodList title={category.description} category={category.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
