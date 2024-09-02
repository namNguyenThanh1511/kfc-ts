import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import api from "../../config/api";
import SearchResultsList from "../searchResultsList";
type SearchBarProps = {
  apiURI: string;
};
export default function SearchBar({ apiURI }: SearchBarProps) {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  let searchField = "";
  switch (apiURI) {
    case "voucher": {
      searchField = "code";
      break;
    }
    default: {
      searchField = "name";
    }
  }
  const fetchData = async (value) => {
    const response = await api.get(apiURI);
    const filteredList = response.data.filter((item) => {
      return (
        value &&
        item &&
        item[searchField] &&
        item[searchField].toLowerCase().includes(value.toLowerCase())
      ); // value : if empty return nothing instead of return all records
    });
    setList(filteredList);
    console.log(filteredList);
  };
  const handleChangeInput = (value) => {
    setInput(value);
    console.log(value); //current typed value
    //console.log(input) // old value
    fetchData(value).then(() => {});
  };

  return (
    <div>
      <div className="input-wrapper">
        <div className="input-wrapper__items">
          <SearchOutlined />
          <input
            placeholder="Search..."
            type="text"
            onChange={(e) => {
              handleChangeInput(e.target.value);
            }}
          />
        </div>
      </div>
      <SearchResultsList apiURI={apiURI} results={list} />
    </div>
  );
}
