import React from "react";


const CommonTooltip = ({ text, children }) => {
  return (
    <div className="tooltip">
      {children}
      <div className="tooltiptext">
        <span className="w-100">{text}</span>
      </div>
    </div>
  );
};

export default CommonTooltip;