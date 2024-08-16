import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any) => any;
}
interface ManageTemplateProps {
  title: string;
  columns: Column[];
  formItems: React.ReactElement;
  apiURI: string;
}
function ManageTemplate({ columns, title, formItems, apiURI }: ManageTemplateProps) {
  const [categoryList, setCategoryList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formTag] = useForm();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchCategoryList = async () => {
    try {
      const response = await api.get(apiURI);
      setCategoryList(response.data);
      setIsFetching(false);
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
        await api.put(`${apiURI}/${values.id}`, values);
        toast.success("update succesfully");
      } else {
        // id non exist => create
        await api.post(`${apiURI}`, values);
        toast.success("add succesfully");
      }
      formTag.resetFields();
      handleCloseModal();

      fetchCategoryList();
    } catch (error) {
      toast.error(error.response.data);
    }
    setLoading(false); // cancel loading when calling api done
  };
  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(`${apiURI}/${id}`);
      toast.success("Delete successfully");
      fetchCategoryList();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          setIsUpdate(false);
          handleOpenModal();
        }}
        type="primary"
      >
        Add new {title}
      </Button>
      <Table columns={columns} dataSource={categoryList} loading={isFetching} />
      <Modal
        open={isOpenModal}
        title={isUpdate === true ? `Edit ${title}` : `Create new ${title}`}
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
          <Form.Item name={"id"} hidden>
            <Input />
          </Form.Item>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default ManageTemplate;
