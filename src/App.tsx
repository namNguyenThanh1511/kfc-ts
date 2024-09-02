import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./component/dashboard/Dashboard";
import ManageCategory from "./pages/admin/category";
import ManageFood from "./pages/admin/food";
import ManageProductPage from "./pages/admin/product";
import ManageVoucher from "./pages/admin/voucher";
import CheckOutPage from "./pages/checkout";
import MenuPage from "./pages/menu";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <MenuPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/checkout",
          element: <CheckOutPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "category",
          element: <ManageCategory />,
        },
        {
          path: "food",
          element: <ManageFood />,
        },
        {
          path: "product",
          element: <ManageProductPage />,
        },
        {
          path: "voucher",
          element: <ManageVoucher />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
