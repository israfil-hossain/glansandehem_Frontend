import * as yup from "yup";

const addressValidation = yup.object().shape({
    userFullName: yup.string().required("Full Name is required !"),
    userEmail:yup.string().email().required("Email address is required"),
    userPidNumber: yup.string().required("Personal ID number is required"),
    userPhoneNumber : yup.string().required("Phone Number is required"),
    
  });
  
  export default addressValidation;