import React, { Fragment, useContext } from "react";

import Navbar from "./navbar/Navbar";
import Whatsapp from "../common/Whatsapp";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="bg-white">
        <Navbar />

        <main className=" px-2 w-full mt-2 relative">
          {children}
          <Whatsapp />
        </main>
      
      </div>
    
    </Fragment>
  );
};

export default MainLayout;
