import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Public, { loader as publicLoader } from "./pages/public";
import Login from "./pages/login";
import Private, { loader as privateLoader } from "./pages/private";
import Questions, { loader as questionLoader } from "./pages/questions";
import Antworten, {loader as answerLoader } from "./pages/answer";
import Layout from "./components/layout";
import Response, { loader as responseLoader } from "./pages/response";
import Baum from "./pages/tannenbaum";
import Regist from "./pages/regist";

const router = createBrowserRouter([
  
  {
    path: "/public",
    loader: publicLoader,
    element:<Layout> <Public /> </Layout>
  },
  {
    path: "/",
    element: <Layout> <Login /> </Layout>
  },
  {
    path: "/registrieren",
    element: <Layout> <Regist /> </Layout>
  },
  {
    path: "/private",
    loader: privateLoader,
    element: <Layout> <Private /> </Layout>
  },
  {
    path: "/questions",
    loader: questionLoader,
    element: <Layout> <Questions /> </Layout>
  },
  {
    path: "/answer",
    loader: answerLoader,
    element: <Layout> <Antworten /> </Layout>
  },
  {
    path: "/response",
    loader: responseLoader,
    element: <Layout> <Response /> </Layout>
  },
  {
    path: "/tannenbaum",
    element: <Layout> <Baum /> </Layout>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);