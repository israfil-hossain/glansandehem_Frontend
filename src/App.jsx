import React, { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppOutlet from "./outlets/AppOutlet";
import AuthorizedOutlet from "./outlets/AuthorizedOutlet";
import UnauthorizedOutlet from "./outlets/UnauthorizedOutlet";


const Home = lazy(() => import("./page/Home"));
const Profile = lazy(() => import("./page/Profile"));
const ProfileSetting = lazy(() => import("./page/ProfileSetting"));
const Signin = lazy(() => import("./page/Signin"));
const Signup = lazy(() => import("./page/Signup"));
const ForgotPassword = lazy(() => import("./page/ForgotPassword"));
const ResetPassword = lazy(() => import("./page/ResetPassword"));


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
        {
          path: "/forgotpassword",
          exact: true,
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password/:id",
          exact: true,
          element: <ResetPassword />,
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
              path: "profile",
              element: <Profile />,
            },
            {
              path: "profile-setting",
              element: <ProfileSetting />,
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
