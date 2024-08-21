import React, { useEffect, useState } from "react";
import { Column } from "../../../component/DashboardTemplate";
import { Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from "../../../config/api";
import DashboardTemplate from "../../../component/DashboardTemplate";

function ManageProductPage() {
  const title = "product";
  const columns: Column[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },
  ];
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await api.get("category");
      console.log(response.data);
      setCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const formItems = (
    <>
      <Form.Item label="Enter name" name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label="Enter description" name={"description"}>
        <TextArea />
      </Form.Item>
      <Form.Item label="Enter price" name={"price"}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Enter category" name={"category"}>
        <Select options={categoryList} />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate apiURI="product" formItems={formItems} columns={columns} title={title}></DashboardTemplate>
    </div>
  );
}

export default ManageProductPage;
