import React, { useEffect, useState } from "react";
import { MdClose, MdMenu, MdOutlineClose } from "react-icons/md";
import LenguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import { useQueryClient } from "@tanstack/react-query";
import { FiLogOut } from "react-icons/fi";
import { removeTokens } from "@/utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const MobileNav = () => {
  const { t, i18n } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const { userFound } = useAuthUserContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    removeTokens();
    queryClient.resetQueries();
    navigate("/");
  };

  return (
    <div className="">
      <div>
        {toggle ? (
          <MdClose
            size={30}
            className="mr-5 text-tertiary"
            onClick={() => setToggle(!toggle)}
          />
        ) : (
          <MdMenu
            size={30}
            className="mr-5 text-tertiary"
            onClick={() => setToggle(!toggle)}
          />
        )}
      </div>
      <div
        className={`${
          !toggle ? "hidden" : "flex flex-col"
        } absolute right-0 top-16 z-10 mx-4 my-2 min-w-[140px] rounded-md bg-tertiary p-6`}
      >
        <div className="flex w-full  justify-end pb-5 border-b border-blue-50 border-1 mb-3">
          {/* <LocaleSwitcher /> */}
          <LenguageSelector />
        </div>

        {/* <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4 text-white">
          <li>
            <Link to="/">{t("navigation.home")}</Link>
          </li>
          <li>
            <Link to="/about">{t("navigation.about")}</Link>
          </li>
        </ul> */}
        <div className="">
          {userFound ? (
            <>
              <Link to="/profile">
                <div className="flex  cursor-pointer items-center justify-center rounded-full bg-slate-200 mb-5">
                  <FaUser className="rounded-full bg-slate-200 p-1 w-7 h-7" />
                  Profile
                </div>
              </Link>

              <button
                className="flex items-center gap-2 justify-between rounded-xl bg-gradient-to-r from-primary  to-secondprimary hover:from-secondprimary px-6 py-1 text-white shadow-lg hover:cursor-pointer  hover:bg-indigo-700"
                onClick={handleUserLogout}
              >
                <FiLogOut className=" text-white min-w-max" />
                Logout
              </button>
            </>
          ) : (
            /* <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-200 ">
                    <FaUser className="rounded-full bg-slate-200 p-1 w-7 h-7" />
                  </div> bg-gradient-to-r from-primary  to-secondprimary hover:from-secondprimary  */

            <Link to="/login">
              <button
                className="flex items-center gap-2 justify-between rounded-xl bg-gradient-to-r from-primary  to-secondprimary hover:from-secondprimary px-6 py-1 text-white shadow-lg hover:cursor-pointer  hover:bg-indigo-700"
                onClick={handleUserLogout}
              >
                <FiLogOut className=" text-white min-w-max" />
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
