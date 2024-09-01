import React from "react";
import "./index.scss";
import { Category } from "../../model/category";
import SearchResult from "../searchResult";
import "./index";
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
  const handleShowSearchResults = () => {
    let searchResultsComponent = document.getElementById("results-list");
    searchResultsComponent?.classList.add("active");
  };
  const handleHideSearchResults = () => {
    let searchResultsComponent = document.getElementById("results-list");
    searchResultsComponent?.classList.remove("active");
  };
  handleHideSearchResults(); // remove class active for next rendering
  if (results.length > 0) {
    handleShowSearchResults();
  }
  return (
    <div>
      <div className="results-list" id="results-list">
        {results.map((item, index) => (
          <SearchResult resultField={resultField} key={item.id} result={item} />
        ))}
      </div>
    </div>
  );
}
