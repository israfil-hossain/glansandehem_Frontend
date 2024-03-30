import { postalCodeData } from "@/constants/Data/postalCode";
import * as yup from "yup";
import * as Yup from 'yup';

const dateTimeValidation = yup.object().shape({
    address: Yup.string().required("Address is Required"),
    postalCode: yup
    .string()
    .required('Postal Code is required')
    .test(
      'isValidPostalCode',
      'Invalid postal code',
      (value) =>
        postalCodeData.some((data) => data.value === value.toUpperCase()) // Case-insensitive comparison
    ),
    
  });
  
  export default dateTimeValidation;


