import React from "react";
import ManageTemplate, { Column } from "../../../component/ManageDashboard";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

function ManageCategory() {
  const title = "category";
  const columns: Column[] = [
    // khai bao kieu du lieu de dc nhac lenh
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
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
      <ManageTemplate apiURI="category" formItems={formItems} title={title} columns={columns} />
    </div>
  );
}

export default ManageCategory;
