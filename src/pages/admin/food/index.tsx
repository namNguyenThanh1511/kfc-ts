import React, { useEffect, useMemo, useState } from "react";
import { Column } from "../../../component/DashboardTemplate";
import {
  Button,
  Flex,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import DashboardTemplate from "../../../component/DashboardTemplate";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import api from "../../../config/api";
import { Category } from "../../../model/category";

function ManageFood() {
  const title = "food";
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("category");
      // setCategories() : async -> current categories may still hold its previous value
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const categoriesOptions = useMemo(
    () =>
      categories.map((category: Category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories]
  );
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
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "categoryId",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (value) => (
        <>
          <Image width={200} src={value} />
        </>
      ),
    },
  ];
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const formItems = (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input the product description!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the product price!" }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="Category ID"
        name="categoryId"
        rules={[{ required: true, message: "Please select the category !" }]}
      >
        <Select options={categoriesOptions} />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </>
  );

  return (
    <div>
      <DashboardTemplate apiURI="product" formItems={formItems} title={title} columns={columns} />
    </div>
  );
}

export default ManageFood;
//ver 1 optimize (30/8/2024 12:00) :
//Combine state update : make the code more readable and simple , eliminate redundant state
// -> Remove variable fetchedCategories
// -> Replace with setCategories() as usual
// -> operate useMemo to handle multi-rendering ( no need to always re-render -> useMemo() : just re-render when dependency change )
// -> useMemo on categoriesOptions
//
// author : Nguyen Thanh Nam - Makise Kurisu
