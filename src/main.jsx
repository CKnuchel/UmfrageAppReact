import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Public, { loader as publicLoader } from "./pages/public";
import Login from "./pages/login";
import Private, { loader as privateLoader } from "./pages/private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/public",
    loader: publicLoader,
    element: <Public />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/private",
    loader: privateLoader,
    element: <Private />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);