import React, { Fragment, Suspense, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CommonProgress } from "../components/common/CommonProgress";
import { useAuthUserContext } from "../context/AuthUserProvider";

const AuthorizedOutlet = () => {
  const { userFound } = useAuthUserContext();
  const { pathname } = useLocation();

  if (!userFound) {
    return <Navigate to={"/"} state={{ authSuccessRedirect: pathname }} />;
  }

  return (
    <Fragment>
      {/* <Navbar toggleMenu={toggleMenu} /> */}
      <main className="flex-grow  ">
        <div className="mx-auto  py-5">
          <Suspense fallback={<CommonProgress />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </Fragment>
  );
};

export default AuthorizedOutlet;
