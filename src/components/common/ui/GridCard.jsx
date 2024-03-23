import React from "react";

const GridCard = ({title,value}) => {
  return (
    <div className="grid grid-cols-12 w-full bg-blue-50 rounded-lg  py-2 mx-2 my-5 items-center">
      <h2 className="col-span-3 font-semibold text-[14px] text-center">{title}</h2>
      <p className="col-span-1">:</p>
      <h2 className="col-span-7  font-normal font-sans-serif text-[14px] email">{value}</h2>
    </div>
  );
};

export default GridCard;
