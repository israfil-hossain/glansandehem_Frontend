import { Box } from "@mui/material";
import React from "react";
import { loader } from "../../assets";


export const CommonProgress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height:"100%"
      }}
    >
      <Box
        sx={{
          opacity: 1,
          marginTop:"100px",
          alignItems: "center",
        
        }}
      >
        <div className=" rounded-xl ">
        <img
          src={loader}
          alt="loader"
          className=" p-4"
        />
        </div>
        
      </Box>
    </Box>
  );
};
