import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import { Category } from "../../model/category";
import SearchResult from "../searchResult";

type SearchResultsListProps = {
  results: Category[];
  apiURI: string;
};

export default function SearchResultsList({ results, apiURI }: SearchResultsListProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the resultField value based on apiURI
  const resultField = useMemo(() => {
    switch (apiURI) {
      case "voucher":
        return "code";
      default:
        return "name";
    }
  }, [apiURI]);

  // Effect to update visibility based on results length
  useEffect(() => {
    setIsVisible(results.length > 0);
  }, [results]);

  return (
    <div>
      {isVisible && (
        <div className="results-list" id="results-list">
          {results.map((item) => (
            <SearchResult resultField={resultField} key={item.id} result={item} />
          ))}
        </div>
      )}
    </div>
  );
}
