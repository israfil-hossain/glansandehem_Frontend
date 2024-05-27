import validatePostCode from "@/constants/Data/validatePostCode";
import * as yup from "yup";
import * as Yup from 'yup';

const dateTimeValidation = yup.object().shape({
    address: Yup.string().required("Address is Required"),
    startDate: Yup.string().required("Date and Time is required "),
    postalCode: yup
    .string()
    .required('Postal Code is required')
    .test(
      'isValidPostalCode',
      'Invalid postal code',
      (value) => validatePostCode(value)
    ),
    
  });
  
  export default dateTimeValidation;


