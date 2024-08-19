import React from "react";
import { Column } from "../../../component/DashboardTemplate";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import DashboardTemplate from "../../../component/DashboardTemplate";

function ManageCategory() {
  const title = "category";
  const columns: Column[] = [
    // khai bao kieu du lieu de dc nhac lenh

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "action",
      dataIndex: "id",
      key: "id",
    },
  ];
  const formItems = (
    <>
      <Form.Item label="Enter name" name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label="Enter description" name={"description"}>
        <TextArea />
      </Form.Item>
    </>
  );
  return (
    <div>
      <DashboardTemplate apiURI="category" formItems={formItems} title={title} columns={columns} />
    </div>
  );
}

export default ManageCategory;
