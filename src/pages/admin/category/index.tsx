import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";

function ManageCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formTag] = useForm();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id: number, category) => {
        return (
          <>
            <Button
              onClick={() => {
                handleOpenModal();
                formTag.setFieldsValue(category);
              }}
              type="primary"
            >
              Edit
            </Button>
            <Popconfirm
              title={"Delete"}
              description="do you want to delete this category"
              onConfirm={() => handleDeleteCategory(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const fetchCategoryList = async () => {
    try {
      const response = await api.get("category");
      setCategoryList(response.data);
    } catch (err) {
      console.log(err);

      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleSubmitForm = async (values) => {
    setLoading(true); // loading save button when calling api

    try {
      if (values.id) {
        // id exist => update
        await api.put(`category/${values.id}`, values);
        toast.success("update succesfully");
      } else {
        // id non exist => create
        await api.post("category", values);
        toast.success("add succesfully");
      }

      setIsOpenModal(false);
      fetchCategoryList();
    } catch (error) {
      toast.error(error.response.data);
    }
    setLoading(false); // cancel loading when calling api done
  };
  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(`category/${id}`);
      toast.success("Delete successfully");
      fetchCategoryList();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div>
      <Button onClick={handleOpenModal} type="primary">
        Create new category
      </Button>
      <Table columns={columns} dataSource={categoryList} />
      <Modal
        open={isOpenModal}
        title={"Create new category"}
        onCancel={handleCloseModal}
        // onOk={() => {
        //   /* submit user input to get "values" (parameter)  */
        //   formTag.submit();
        // }}
        footer={[
          <Button onClick={handleCloseModal}>Cancel</Button>,
          <Button
            onClick={() => {
              formTag.submit();
            }}
            loading={loading}
          >
            Save
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 24 }} onFinish={handleSubmitForm} form={formTag}>
          {" "}
          {/* antd chia ra 24 col -> span = 24 để từng item trong Form chiếm 1 hàng  */}
          <Form.Item
            label={"Enter name : "}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input category name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"Description : "} name={"description"}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"id"}>
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageCategory;
