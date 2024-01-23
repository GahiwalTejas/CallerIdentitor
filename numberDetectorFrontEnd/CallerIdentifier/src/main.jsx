import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import UserInfo from "./pages/UserInfo.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/userInfo",
        element: (
          <AuthLayout authentication>
            <UserInfo />
          </AuthLayout>
        ),
      },
      {
        path: "/search",
        element: (
          <AuthLayout authentication>
            <SearchPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
