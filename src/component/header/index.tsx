import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
function Header() {
  const navigate = useNavigate();
  const cart = useSelector((store: RootState) => store.cart);
  return (
    <div className="header">
      <div className="header__left">
        <Link to={"/"}>
          <img
            width={50}
            src="https://static.kfcvietnam.com.vn/images/web/kfc-logo.svg?v=5.0"
            alt="logo"
            className="header__logo"
          />
        </Link>

        <ul className="header__navigation">
          <li>Thuc don</li>
          <li>Khuyen mai</li>
          <li>Dich vu</li>
          <li>He thong nha hang</li>
        </ul>
      </div>
      <div className="header__right">
        <Badge count={cart?.length} showZero>
          {/* <div className="header__cart">
            <span className="header__cart__number">{cart.length}</span>
          </div> */}
          <ShoppingCartOutlined
            onClick={() => {
              navigate("/checkout");
            }}
            width={300}
            height={300}
          />
        </Badge>

        <div className="header__account">
          <UserOutlined className="icon" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
}

export default Header;
