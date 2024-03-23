import { Duration } from "@/utils/CommonFunction";
import React, { createContext, useState, useContext } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {

  let storedFormData = localStorage.getItem("formData");
  const parsedFormData = storedFormData ? JSON.parse(storedFormData) : null;
  const cleanDuration = Duration(parsedFormData?.size);
 


  const [formData, setFormData] = useState({
    areaInSquareMeters: parsedFormData?.size, 
    cleaningFrequency: "",
    postalCode: parsedFormData?.postCode, 
    address: "",
    cleaningDurationInHours: cleanDuration,
    cleaningPrice: "",
    cleaningCoupon:null,
    startDate: "",
    hasCats: null,
    hasDogs: null,
    hasOtherPets: null,
    showPrice:"",
    showSupplies:"",
    totalPrice:"",
    percentDiscount:"",
  });



  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
