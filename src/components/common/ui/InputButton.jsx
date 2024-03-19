import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isValid } from "swedish-postal-code-validator";
import { useNavigate } from "react-router-dom"; 

const InputButton = ({ setPostCode, setSize, postCode, size }) => {
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); 

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handlePostcodeChange = (e) => {
    setPostCode(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (!size && !postCode) {
      setError(
        "To calculate the price, we need to know the size of your home and your postcode. "
      );
      return;
    }
    if (!isValid(postCode)) {
      setError("Invalid postal code");
      return;
    }

    // Save data to localStorage
    const formData = {
      size: size,
      postCode: postCode,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log({formData})
      navigate("/service");
      console.log("Click")
    }
   
    
    // router.push(`/${lang}/service`);

    // Reset the form or navigate to the next step
    setSize("");
    setPostCode("");
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div
        className={` ${
          error && "shadow-lg shadow-red-400"
        }  bg-white   rounded-full flex flex-row justify-center items-center mt-10 lg:w-[588px] md:w-[500px] w-[85%] lg:mx-0 `}
      >
        <div className="flex h-[70px]  w-[40%] items-center justify-center rounded-none  rounded-l-full bg-white hover:border hover:border-primary focus:border-primary">
          <input
            type="number"
            placeholder={t("banner.size")}
            value={size}
            className="h-12 lg:w-24 w-20 pl-2  pr-2 focus:border-transparent focus:outline-none focus:ring-0 focus:ring-primary"
            onChange={handleSizeChange}
            required
          />
          <span className="text-gray-500 text-md font-medium ">
            m<sup>2</sup>
          </span>
        </div>
        <div className="border-l-gray-300 flex h-[70px]  items-center w-[60%] flex-row justify-between rounded-none rounded-r-full border-l  bg-white hover:border hover:border-primary focus:border-primary">
          <input
            type="number"
            value={postCode}
            placeholder={t("banner.postcode")}
            className="h-12 w-24 pl-3 focus:border-transparent focus:outline-none focus:ring-0 focus:ring-primary"
            onChange={handlePostcodeChange}
            required
          />
          <button
            className="lg:flex justify-center text-center items-center hidden ml-5 mr-4 mx-5 h-[55px] lg:w-[200px] w-52 rounded-full  bg-primary px-5  py-3 text-[10px] font-medium text-white lg:text-[15px]"
            onClick={handleSubmit}
          >
            {t("banner.bannerButton")}
          </button>
          <button
            className="lg:hidden ml-5 mr-4 mx-5 h-[55px] lg:w-[200px] w-52 rounded-full  bg-primary px-5  py-1 text-[16px] font-bold text-white lg:text-[15px]"
            onClick={handleSubmit}
          >
            {"See"}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-5 lg:w-[450px] w-[300px] flex justify-center rounded-full border border-red-400 bg-purple-50 px-5 py-2 text-center ">
          <p className="lg:text-sm text-[13px] text-slate-400 ">{error}</p>
        </div>
      )}
    </div>
  );
};

export default InputButton;
