import { whatsapp } from "@/assets";
import { generateWhatsAppLink } from "@/utils/CommonFunction";
import React from "react";
import { Link } from "react-router-dom";

const Whatsapp = () => {
  return (
    <Link to={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
      <div
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
        className="tooltip"
      >
        <img
          src={whatsapp}
          alt="WhatsApp"
          className="w-16 hover:bg-secondprimary h-16 object-contain rounded-full shadow-md hover:shadow-xl hover:w-16 hover:h-16  "
        />
        <span className="tooltiptext w-96">
          For Any Kind of Information please Chat Here !
        </span>
      </div>
    </Link>
  );
};

export default Whatsapp;
