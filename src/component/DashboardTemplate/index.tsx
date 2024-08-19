import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
import { endOfToday } from "date-fns";
import moment from "moment";
export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any) => any;
}
interface DashboardTemplateProps {
  title: string;
  columns: Column[];
  formItems: React.ReactElement;
  apiURI: string;
}
function DashboardTemplate({ columns, title, formItems, apiURI }: DashboardTemplateProps) {
  const [dataSource, setDataSource] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formTag] = useForm();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get(apiURI);
      setIsFetching(false);
      setDataSource(response.data);
    } catch (err) {
      console.log(err);

      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
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

      fetchData();
    } catch (error) {
      toast.error(error.response.data);
    }
    setLoading(false); // cancel loading when calling api done
  };
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${apiURI}/${id}`);
      toast.success("Delete successfully");
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const enhancedColumns = columns.map((column) => {
    if (column.dataIndex === "id") {
      return {
        ...column,
        render: (id, record) => (
          <>
            <Button onClick={() => handleDelete(id)}>Delete</Button>
            <Button
              onClick={() => {
                const recordValidated = {
                  ...record,

                  startAt: record.startAt ? moment(record.startAt, "YYYY-MM-DD") : null,
                  endAt: record.endAt ? moment(record.startAt, "YYYY-MM-DD") : null,
                  createAt: record.createAt ? moment(record.startAt, "YYYY-MM-DD") : null,
                };
                console.log(recordValidated);
                formTag.setFieldsValue(recordValidated);
                handleOpenModal();
              }}
            >
              Update
            </Button>
          </>
        ),
      };
    } else {
      return column;
    }
  });
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
      <Table columns={enhancedColumns} dataSource={dataSource} loading={isFetching} />
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

export default DashboardTemplate;
