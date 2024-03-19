import React from "react";
import "../../../i18n"; 
import { useTranslation } from "react-i18next";
import { se } from "../../../assets";

const LenguageSelector = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="mt-3 flex gap-3 text-center text-[#8d96a7] ml-3">
      <button type="button" onClick={() => changeLanguage("en")}>
        <img
          src="https://wprock.fr/ezoimgfmt/assets.wprock.fr/emoji/joypixels/512/1f1fa-1f1f2.png?ezimgfmt=ng%3Awebp%2Fngcb25%2Frs%3Adevice%2Frscb25-1"
          className="h-7 w-7"
          alt="EN"
        />
        En
      </button>
      {" | "}
      <button type="button" onClick={() => changeLanguage("se")}>
        <img
          src={se}
          className=" h-7 w-7 "
          alt="ES"
        />
        Se
      </button>
    </div>
  );
};

export default LenguageSelector;
