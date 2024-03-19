import React, { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppOutlet from "./outlets/AppOutlet";
import AuthorizedOutlet from "./outlets/AuthorizedOutlet";
import UnauthorizedOutlet from "./outlets/UnauthorizedOutlet";

const Service = lazy(() => import("./page/Service"));
const Home = lazy(() => import("./page/Home"));
const Profile = lazy(() => import("./page/Profile"));
const Signin = lazy(() => import("./page/Signin"));
const Signup = lazy(() => import("./page/Signup"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppOutlet />,
      children: [
        {
          path: "/",
          exact: true,
          element: <Home />,
        },

        //auth
        {
          path: "/",
          element: <UnauthorizedOutlet />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
              path: "login",
              element: <Signin />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
            {
              path: "service",
              element: <Service />,
            },

            {
              path: "*",
              element: <Navigate to={"/"} />,
            },
          ],
        },

        // main layout
        {
          path: "/",
          element: <AuthorizedOutlet />,
          children: [
            {
              path: "",
              element: <Home />,
            },

            {
              path: "service",
              element: <Service />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "*",
              element: <Navigate to={"/"} />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
