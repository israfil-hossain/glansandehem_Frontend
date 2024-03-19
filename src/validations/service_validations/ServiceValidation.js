import * as yup from "yup";

const serviceValidation = yup.object().shape({
    areaInSquareMeters: yup.number().required("Apartment Size is required !"),
    cleaningDurationInHours: yup
      .number()
      .required("Cleaning Duration is required !"),
    cleaningFrequency: yup.string().required("Cleaning Frequency is required !"), 
    
  });
  
  export default serviceValidation;