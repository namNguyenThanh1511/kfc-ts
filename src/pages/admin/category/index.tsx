import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";

function ManageCategory() {
  const [categoryList, setCategoryList] = useState();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];
  const fetchCategoryList = async () => {
    try {
      const response = await api.get("category");
      setCategoryList(response.data);
    } catch (err) {
      toast.error(err.response.dataIndex);
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={categoryList} />
    </div>
  );
}

export default ManageCategory;
