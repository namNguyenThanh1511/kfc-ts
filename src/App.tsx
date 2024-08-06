import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./component/dashboard/Dashboard";
import ManageCategory from "./pages/admin/category";
import ManageFood from "./pages/admin/food";

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
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
