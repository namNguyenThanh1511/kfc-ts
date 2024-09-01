import React from "react";
import { Category } from "../../model/category";
import { User } from "../../model/user";
import { Food } from "../../model/food";
import "./index.scss";
type SearchResultProps = {
  result: Category | Food | User;
};
export default function SearchResult({ result }: SearchResultProps) {
  return <div className="search-result">{result.name}</div>;
}
