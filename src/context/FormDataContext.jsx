import { Duration } from "@/utils/CommonFunction";
import React, { createContext, useState, useContext } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {

  let storedFormData = localStorage.getItem("formData");
  console.log({storedFormData})
  const parsedFormData = storedFormData ? JSON.parse(storedFormData) : null;
  const cleanDuration = Duration(parsedFormData?.size);
 


  const [formData, setFormData] = useState({
    areaInSquareMeters: parsedFormData?.size, 
    cleaningFrequency: "",
    postalCode: parsedFormData?.postCode, 
    address: "",
    cleaningDurationInHours: cleanDuration,
    cleaningPrice: "",
    cleaningCoupon:"",
    startDate: "",
    hasCats: null,
    hasDogs: null,
    hasOtherPets: null,
    showPrice:"",
    showSupplies:"",
    totalPrice:"",
    percentDiscount:"",
  });

  console.log({formData})

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
