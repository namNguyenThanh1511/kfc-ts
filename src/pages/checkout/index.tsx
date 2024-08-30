import React, { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Food } from "../../model/food";
import { Button, Divider, Image, InputNumber, List, Table } from "antd";
import { Column } from "../../component/DashboardTemplate";
import { NumericFormat } from "react-number-format";
import { changeQuantity, remove, reset } from "../../redux/feature/cartSlice";
function CheckOutPage() {
  const cart = useSelector((store: RootState) => store.cart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const total = cart.reduce((total, item: Food) => total + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);
  const columns: Column[] = [
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
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record: Food) => (
        <>
          <NumericFormat
            value={record.quantity * record.price}
            displayType="text"
            thousandSeparator={true}
            suffix=" VND"
          />
        </>
      ),
    },
    {
      title: "Price per Unit",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <>
          <NumericFormat value={price} displayType="text" thousandSeparator={true} suffix=" VND" />
        </>
      ),
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
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: Food) => (
        <InputNumber
          min={1}
          onChange={(value) => {
            dispatch(changeQuantity({ id: record.id, quantity: value }));
          }}
          value={quantity}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button
            onClick={() => {
              dispatch(remove(id));
            }}
            type="primary"
            danger
          >
            Remove
          </Button>
        </>
      ),
    },
  ];
  const data = cart.map((item: Food) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  }));

  return (
    <div className="check-out">
      <div className="check-out__item">
        <Table dataSource={data} columns={columns} />
        <Button
          onClick={() => {
            dispatch(reset(0));
          }}
          type="primary"
          style={{ backgroundColor: "orange" }}
        >
          Reset Cart
        </Button>
        <div>
          Total price :{" "}
          <NumericFormat
            value={totalPrice}
            displayType="text"
            thousandSeparator={true}
            suffix=" VND"
          />
        </div>
      </div>

      <div className="check-out__details"></div>
    </div>
  );
}

export default CheckOutPage;
