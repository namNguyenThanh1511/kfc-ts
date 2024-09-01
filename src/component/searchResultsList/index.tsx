import React from "react";
import "./index.scss";
import { Category } from "../../model/category";
import SearchResult from "../searchResult";
type SearchResultsListProps = {
  results: Category[];
};
export default function SearchResultsList({ results }: SearchResultsListProps) {
  return (
    <div className="results-list">
      {results.map((item, index) => (
        <SearchResult key={item.id} result={item} />
      ))}
    </div>
  );
}
