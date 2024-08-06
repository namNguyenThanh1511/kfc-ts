import { Button, Col, Form, Image, Input, Row } from "antd";
import React from "react";
import api from "../../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AuthenLayout from "../../component/authen-layout";
import { useDispatch } from "react-redux";
import { login } from "../../redux/feature/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    try {
      const response = await api.post("login", values);
      const { token } = response.data; // const token = response.data.token -> technique : Object Destructuring
      localStorage.setItem("token", token); 
      toast.success("login succeed");
      navigate("/");
      //lưu trữ thông tin của user xuống redux để các component đều truy cập đc
      dispatch(login(response.data));
    } catch (err) {
      toast.error(err.response.data);
      console.log(err);
    }
  };
  return (
    <AuthenLayout>
      <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
        <Form.Item
          label={"Phone"}
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Please input your phone",
            },
          ]}
        >
          <Input placeholder="Enter your phone" />
        </Form.Item>
        <Form.Item
          name={"password"}
          label={"Password"}
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthenLayout>
  );
}

export default Login;
