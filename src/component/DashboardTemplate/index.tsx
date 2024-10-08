import { Button, Form, Input, Modal, Popconfirm, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/api";
import { endOfToday } from "date-fns";
import moment from "moment";
import dayjs from "dayjs";
import uploadFile from "../../utils/upload";
import {
  sortDataBy,
  sortDataSourceDESCByDateAndField,
  sortDataWithLocale,
} from "../../utils/sorting";
import SearchBar from "../search-bar";
import SearchResultsList from "../searchResultsList";
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
  const [tableColumns, setTableColumns] = useState<Column[]>([]);
  const [onSorting, setOnSorting] = useState(false);
  const [sortField, setSortField] = useState("");
  const excludedFields = ["image", "id", "description"];
  useEffect(() => {
    const newColumns = [
      ...columns,
      {
        title: "Action",
        dataIndex: "id",
        key: "id",
        render: (id, record) => (
          <div style={{ gap: "10px", display: "flex" }}>
            <Popconfirm
              title={`Delete ${title}`}
              description="Are you sure to delete ?"
              onConfirm={() => handleDelete(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
            <span style={{ margin: "10px 5px" }}>|</span>
            <Button
              type="primary"
              style={{ backgroundColor: "orange" }}
              onClick={() => {
                const newRecord = { ...record };
                console.log(record);
                setIsUpdate(true);
                //check all attributes which instance of is datetime
                for (var key of Object.keys(newRecord)) {
                  // loop all attributes inside an object
                  // newRecord['id'] <=> newRecord.id
                  // use dayjs to filter which key have datetime data type
                  //console.log(dayjs(newRecord[key]));
                  const value = newRecord[key];
                  var date: any = new Date(value);
                  const time: any = date.getTime();
                  console.log(key + " " + date);
                  console.log(time);
                  if (isNaN(time) || typeof value === "number") {
                    //isNaN : is not a number
                    //=> not datetime type
                    newRecord[key] = record[key]; //keep original value
                    console.log(key + " is not a date");
                  } else {
                    //=> datetime data type => need formatting to antd format => can you antd form function
                    newRecord[key] = dayjs(value); // antd usually go with dayjs
                    console.log(key + " is a date");
                  }
                  //console.log("new record :" + newRecord);
                }
                formTag.setFieldsValue(newRecord);
                handleOpenModal();
              }}
            >
              Update
            </Button>
          </div>
        ),
      },
    ];
    setTableColumns(newColumns);
  }, [columns]);
  const fetchData = async () => {
    try {
      const response = await api.get(apiURI);
      let sortedData = [];
      if (apiURI === "category") {
        //sortedData = sortDataBy(response.data, "name", "DESC");
        sortedData = sortDataWithLocale(response.data, "name", "ASC");
        console.log(sortedData);
      } else if (apiURI === "voucher") {
        sortedData = sortDataSourceDESCByDateAndField(response.data, "createAt", "value", "DESC");
      } else {
        sortedData = response.data;
      }
      if (onSorting) {
        sortedData = sortDataBy(response.data, sortField, "ASC");
      }
      console.log("fetched");
      setIsFetching(false);
      setDataSource(sortedData);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchData();
    //sortDataSourceASC(); // ko nên để sort ở đây vì react sẽ excutute sort trước vì fetchData() là hàm async ( bất đồng bộ )
  }, [onSorting]);
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleSubmitForm = async (values) => {
    setLoading(true); // loading save button when calling api

    try {
      let url = null;
      console.log(values);
      console.log(typeof values.image === "object");
      if (typeof values.image === "object") {
        url = await uploadFile(values.image.file.originFileObj);
        values.image = url;
      } else {
        // not upload any new file -> keep old image -> do nothing
        console.log("not a file");
      }

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
  const handleOnSorting = (field) => {
    setSortField(field);
    setOnSorting(!onSorting);
  };
  const fieldsObjectList = Object.keys(dataSource[0] || {}).filter(
    (key) => !excludedFields.includes(key)
  );

  return (
    <div>
      <SearchBar apiURI={apiURI} />
      {/* <SearchResultsList apiURI={apiURI} results={searchResults} /> */}
      <Button
        onClick={() => {
          setIsUpdate(false);
          handleOpenModal();
        }}
        type="primary"
      >
        Add new {title}
      </Button>
      {fieldsObjectList.map((field) => (
        <Button
          onClick={() => {
            handleOnSorting(field);
          }}
        >
          Sort data by {field}
        </Button>
      ))}

      <Table columns={tableColumns} dataSource={dataSource} loading={isFetching} />
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
