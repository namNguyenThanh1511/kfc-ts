import React from "react";
import "./index.scss";
import { Category } from "../../model/category";
import SearchResult from "../searchResult";
type SearchResultsListProps = {
  results: Category[];
  apiURI: string;
};
export default function SearchResultsList({ results, apiURI }: SearchResultsListProps) {
  let resultField = "";
  switch (apiURI) {
    case "voucher": {
      resultField = "code";
      break;
    }
    default: {
      resultField = "name";
    }
  }
  return (
    <div className="results-list">
      {results.map((item, index) => (
        <SearchResult resultField={resultField} key={item.id} result={item} />
      ))}
    </div>
  );
}
