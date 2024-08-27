import React from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";

function Layout() {
  return (
    <>
      <Header />

      <Outlet />
      {/* Oulet dai dien cho content ben trong ( trang login , register ) */}
      <div style={{ height: "100vh" }}></div>
      <Footer />
    </>
  );
}

export default Layout;
