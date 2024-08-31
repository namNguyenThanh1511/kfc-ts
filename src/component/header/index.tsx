import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styled from "styled-components";
function Header() {
  const navigate = useNavigate();
  const cart = useSelector((store: RootState) => store.cart);
  const NavUnlisted = styled.ul`
    display: flex;
    gap: 15px;
    a {
      text-decoration: none;
    }

    li {
      list-style: none;
      font-size: 1.28571429rem;
      font-weight: 600;
      color: #202114;
      text-transform: uppercase;
      padding-bottom: 5px;
    }

    .current {
      li {
        border-bottom: 2px solid black;
      }
    }
  `; // dùng thư viện styled-components để style component
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Thực đơn",
      path: "/",
    },
    {
      name: "Khuyến mãi",
      path: "/",
    },
    {
      name: "Dịch vụ tiệc",
      path: "/",
    },
    {
      name: "Hệ thống nhà hàng",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <div className="header">
      <div className="header__left">
        <Link to={"/"}>
          <img
            style={{ width: "78px", height: "78px" }}
            src="https://static.kfcvietnam.com.vn/images/web/kfc-logo.svg?v=5.0"
            alt="logo"
            className="header__logo"
          />
        </Link>

        <ul className="header__navigation">
          <NavUnlisted>
            {links.map((item, index) => (
              <>
                <NavLink className={"header__navigation__NavLink"} to={item.path}>
                  <li>{item.name}</li>
                </NavLink>
              </>
            ))}
          </NavUnlisted>
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
