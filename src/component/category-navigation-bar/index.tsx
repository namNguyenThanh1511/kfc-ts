import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../model/category";
import "./index.scss";
type CategoryNavBarProps = {
  categories: Category[];
};
export default function CategoryNavBar({ categories }: CategoryNavBarProps) {
  return (
    <div className="CategoryNavBar">
      <div className="CategoryNavBar__items">
        {categories.map((category: Category) => {
          return <a href={`#${category.id}`}>{category.name} </a>;
        })}
      </div>
    </div>
  );
}
