import React from "react";
import ManageTemplate, { Column } from "../../../component/DashboardTemplate";
import { DatePicker, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { formatDistance, formatDistanceToNow } from "date-fns";

function ManageVoucher() {
  const title = "voucher";
  const columns: Column[] = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "startAt",
      dataIndex: "startAt",
      key: "startAt",
      render: (startAt) => {
        return dayjs(startAt).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      title: "endAt",
      dataIndex: "endAt",
      key: "endAt",
      render: (endAt) => {
        return dayjs(endAt).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      title: "createAt",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => {
        return formatDistanceToNow(new Date(createAt), { addSuffix: true });
      },
    },

    {
      title: "value",
      dataIndex: "value",
      key: "value",
    },
  ];
  const formItems = (
    <>
      <Form.Item label="Enter code" name={"code"}>
        <Input />
      </Form.Item>
      <Form.Item label="Enter start date" name={"startAt"}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Enter  end date" name={"endAt"}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Enter  value" name={"value"}>
        <InputNumber />
      </Form.Item>
    </>
  );
  return (
    <div>
      <ManageTemplate apiURI="voucher" formItems={formItems} title={title} columns={columns} />
    </div>
  );
}

export default ManageVoucher;
