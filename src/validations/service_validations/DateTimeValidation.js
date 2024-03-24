import * as yup from "yup";
import * as Yup from 'yup';

const dateTimeValidation = yup.object().shape({
    areaInSquareMeters: yup.number().required("Apartment Size is required !"),
    cleaningDurationInHours: yup
      .number()
      .required("Cleaning Duration is required !"),
    cleaningFrequency: yup.string().required("Cleaning Frequency is required !"), 
    address: Yup.string().required("Required"),
    startDate: Yup.date()
    .min(new Date(), "Start date cannot be before the current date")
    .required("Start date is required"),
  });
  
  export default dateTimeValidation;


