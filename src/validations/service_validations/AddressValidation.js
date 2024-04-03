import * as yup from "yup";

const addressValidation = yup.object().shape({
    userFullName: yup.string().required("Full Name is required !"),
    userEmail:yup.string().email().required("Email address is required"),
    userPidNumber: yup
    .string()
    .required("Personal ID number is required!")
    .matches(/^\d+$/, "Personal ID number must contain only digits!")
    .min(10, "Personal ID number must be at least 10 digits long!")
    .max(12, "Personal ID number must be at most 12 digits long!"),
    userPhoneNumber: yup
    .string()
    .required("Phone Number is required!")
    .matches(/^\d+$/, "Phone Number must contain only digits!")
    .min(10, "Phone Number must be at least 10 digits long!")
    .max(12, "Phone Number must be at most 12 digits long!"),
    termsAndConditions: yup.boolean()
    .oneOf([true], "You must accept the Terms and Conditions"),
   
    
  });
  
  export default addressValidation;