import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CommonProgress } from "../components/common/CommonProgress";
import { useAuthUserContext } from "../context/AuthUserProvider";
import MainLayout from "../components/layouts/MainLayout";

const AppOutlet = () => {
  const { userLoading } = useAuthUserContext();

  // Scroll-to-top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <MainLayout>
      <Suspense fallback={<CommonProgress />}>
        {userLoading ? <CommonProgress /> : <Outlet />}
      </Suspense>
    </MainLayout>
  );
};

export default AppOutlet;
