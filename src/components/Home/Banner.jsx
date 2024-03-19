"use client";
import React, { useState } from "react";
// import InputButton from '../common/InputButton'
import { useTranslation } from "react-i18next";
import { banner, banner2 } from "../../assets";
import { InputButton } from "../common/ui";

const Banner = () => {
  const { t, i18n } = useTranslation();
  const [size, setSize] = useState();
  const [postCode, setPostCode] = useState();
//   const htmlContent = t("banner.subtext.replace(/\n/g, '<br>'");
  return (
    <div className="h-[90vh] violet-gradient">
      <div className="container flex h-full w-full flex-col justify-between  lg:flex-row">
        <div className="flex h-full w-full flex-col lg:items-center items-start  lg:justify-center pt-16 lg:pt-0 px-5 lg:w-1/2 lg:px-10">
          <h1 className="font-sans leading-snug text-[30px]  font-[800] leading-14  lg:mt-0 text-transparent  bg-gradient-to-r from-secondprimary  via-purple-500 to-primary bg-clip-text lg:text-[44px] pb-5">
            {t("banner.title")}
          </h1>
          <div className="text-2xl text-secondprimary">
            <div dangerouslySetInnerHTML={{ __html: t("banner.subtext") }} />
          </div>
          <InputButton  text={banner} setPostCode={setPostCode} setSize={setSize} postCode={postCode} size={size}/>
        </div>
        <div className=" lg:w-1/2 w-full   items-center  justify-center hidden lg:flex">
          <div className="absolute right-0 top-20">
            <img
              src={banner}
              alt="bannerClean"
              className="relative rounded-full h-[520px] w-[520px] items-center  flex justify-center p-5"
            />
            <img
              src={banner2}
              alt="bannerClean"
              className="relative bottom-96  right-48 rounded-full h-[400px] w-[400px] items-center  flex justify-center p-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
