import React from "react";
import { Category } from "../../model/category";
import { User } from "../../model/user";
import { Food } from "../../model/food";
import "./index.scss";
type SearchResultProps = {
  result: Category | Food | User;
  resultField: string;
};
export default function SearchResult({ result, resultField }: SearchResultProps) {
  return (
    <div className="search-result">
      {result[resultField] ? result[resultField] : "No data available"}
    </div>
  );
}
