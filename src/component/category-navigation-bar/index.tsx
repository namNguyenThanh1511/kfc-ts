import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../model/category";
import "./index.scss";
type CategoryNavBarProps = {
  categories: Category[];
};

export default function CategoryNavBar({ categories }: CategoryNavBarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const handleActiveCategory = (id: string) => {
    setActiveCategory(id);
  };

  return (
    <div className="CategoryNavBar">
      <div className="CategoryNavBar__items">
        {categories.map((category: Category) => {
          return (
            <a
              id="linkTag"
              onClick={() => {
                handleActiveCategory(category.id);
              }}
              className={`CategoryNavBar__items__children ${
                activeCategory === category.id ? "active" : ""
              } `}
              href={`#${category.id}`}
            >
              {category.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
