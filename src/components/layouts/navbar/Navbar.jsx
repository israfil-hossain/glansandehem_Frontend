//Externals import ...............
// import { Popover, List, ListItem } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { FaBell, FaUser, FaUserAlt } from "react-icons/fa";

//Internal import .................
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import LenguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { logo, shortlogo } from "../../../assets";
import { useAuthUserContext } from "../../../context/AuthUserProvider";
import { removeTokens } from "@/utils/localStorageUtils";
import { useQueryClient } from "@tanstack/react-query";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { userFound } = useAuthUserContext();
  const queryClient = useQueryClient();
  const handleUserLogout = () => {
    removeTokens();
    queryClient.resetQueries();
    navigate("/");
  };

  return (
    <header className="w-full">
      <nav className="container  flex h-20  items-center justify-between bg-white  ">
        <div className="flex flex-row gap-x-4 space-x-5">
          {/* <Link href={`/${lang}`}> */}
          <div className="flex space-x-2 justify-center items-center">
            <img src={logo} alt="shorlogo" className="w-36 h-12" />
            {/* <p className="lg:text-2xl  font-bold  text-secondprimary ">
              Glansan<span className="text-tertiary">dehem</span>
            </p> */}
          </div>

          {/* <img src={logo} alt="logo" className="w-40 h-13" /> */}
          {/* </Link> */}
          {userFound ? (
            <></>
          ) : (
            <ul className="hidden items-center justify-center gap-x-8 lg:flex">
              <li>
                <Link to={"/"}>{t("navigation.home")}</Link>
              </li>
            </ul>
          )}
        </div>

        <div className="flex flex-row items-center lg:justify-around justify-end space-x-8">
          <div className="flex flex-row items-center">
            <div className="">
              {userFound ? (
                <div className="flex space-x-4 justify-center items-center ">
                  {" "}
                  <Link to="/profile">
                    <div className="lg:flex hidden lg:px-4 px-1 lg:py-1 cursor-pointer items-center justify-center rounded-full bg-slate-200 lg:mb-0 mb-5">
                      <FaUser className="rounded-full bg-slate-200 p-1 w-7 h-7" />
                      Profile
                    </div>
                  </Link>
                  <button
                    className="items-center lg:flex hidden gap-2 justify-between rounded-xl  bg-gradient-to-r from-primary  to-secondprimary hover:from-secondprimary 
                  hover:to-primary  px-6 py-1 text-white shadow-lg hover:cursor-pointer  hover:bg-indigo-700"
                    onClick={handleUserLogout}
                  >
                    <FiLogOut className=" text-white min-w-max" />
                    Logout
                  </button>
                </div>
              ) : (
                /* <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-200 ">
                    <FaUser className="rounded-full bg-slate-200 p-1 w-7 h-7" />
                  </div> */

                <div className="hidden lg:flex ">
                  <Link to={`/login`}>
                    <button
                      className="rounded-xl  bg-gradient-to-r from-primary  to-secondprimary hover:from-secondprimary 
                     hover:to-primary px-6 py-1 text-white shadow-lg hover:cursor-pointer  hover:bg-indigo-700"
                    >
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              {/* <div className="relative mr-2 px-4">
                <FaBell className="rounded-full bg-slate-200 p-1 w-7 h-7" />{" "}
                <div className="absolute -top-1 right-2 h-2 w-2 rounded-full bg-red-500 text-sm font-bold "></div>
              </div> */}
            </div>
          </div>
          <div className="hidden lg:flex">
            <LenguageSelector />
          </div>
          <div className=" ml-2 pt-2 lg:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
