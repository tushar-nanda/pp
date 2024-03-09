
import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProducts from "./components/AddProducts";
import LikedProducts from "./components/LikedProducts";
import ProductDetail from "./components/ProductDetail";
import CategoryPage from "./components/CategoryPage";
import MyProducts from "./components/MyProducts";
import MyProfile from "./components/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProducts />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  },
 
 
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
reportWebVitals();
