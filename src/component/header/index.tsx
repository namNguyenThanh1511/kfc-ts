import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__left">
        <img
          width={50}
          src="https://static.kfcvietnam.com.vn/images/web/kfc-logo.svg?v=5.0"
          alt="logo"
          className="header__logo"
        />
        <ul className="header__navigation">
          <li>Thuc don</li>
          <li>Khuyen mai</li>
          <li>Dich vu</li>
          <li>He thong nha hang</li>
        </ul>
      </div>
      <div className="header__right">
        <div className="header__cart">
          <span className="header__cart__number">0</span>
        </div>
        <div className="header__account">
          <UserOutlined className="icon" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
}

export default Header;
