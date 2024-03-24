import * as yup from "yup";
import * as Yup from 'yup';

const dateTimeValidation = yup.object().shape({
    postalCode: Yup.string().required('Postal Code is required'),
    address: Yup.string().required("Address is Required"),
    
  });
  
  export default dateTimeValidation;


