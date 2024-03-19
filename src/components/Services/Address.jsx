import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaInfoCircle } from "react-icons/fa";
import { useFormData } from "@/context/FormDataContext";
import { Field, Form, Formik } from "formik";
import addressValidation from "@/validations/service_validations/AddressValidation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useCreate } from "@/hooks";
import { API } from "@/api/endpoints";
import { Progress } from "../common/Progress";
import { toast } from "react-toastify";

export default function Address({ prevStep, onSubmit, isLoading }) {
  const { t } = useTranslation();
  const { formData, setFormData } = useFormData();
  const [isSubmit, setIsSubmit] = useState(false);
  const [coupon, setCoupon] = useState("");
  //   const [coupondata,setCouponData] = useState("");

  console.log({ coupon });
  console.log({ formData });

  const { mutateAsync: verifyCoupon, isLoading: couponLoading } = useCreate({
    endpoint: API.VerifyCoupon, // Replace with your actual API endpoint

    onSuccess: async (data) => {
      toast.success("Coupon is Verifyed !");

      const cleaningPrice =
        formData?.cleaningDurationInHours * formData?.showPrice;
      const discountPrice =
        cleaningPrice * (data?.data?.data?.discountPercentage / 100);
      //   let couponDiscountAmount = Math.min(discountPrice,data?.data?.data?.maximumDiscount)
      let finalCleaningDiscount = Math.ceil(
        cleaningPrice - discountPrice + formData?.showSupplies
      );

      console.log({ cleaningPrice });
      console.log({ discountPrice });
      //   console.log({couponDiscountAmount})

      await setFormData((prev) => ({
        ...prev,
        cleaningCoupon: data?.data?.data?._id,
        totalPrice: finalCleaningDiscount,
        percentDiscount: data?.data?.data?.discountPercentage,
      }));
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      console.error("Update failed", error);
      toast.error("Something went wrong !");
    },
  });

  const initialValues = {
    userFullName: "",
    userEmail: "",
    userPidNumber: "",
    userPhoneNumber: "",
  };

  const handleCoupon = async () => {
    const payload = {
      couponCode: coupon,
    };
    await verifyCoupon(payload);
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmit(!isSubmit);

      await setFormData((prevFormData) => ({
        ...prevFormData,
        ...values,
      }));
    } catch (err) {
      setIsSubmit(false);
      console.log(err);
    }
  };
  return (
    <div className="w-full  my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">{t("address")} </h1>
      <p className="text-sm text-center mb-8">{t("address_.our_dedicated")}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={addressValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form>
            {/* <>{JSON.stringify(values)}</> */}

            <div className="pt-10">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="apartment-size"
              >
                {t("address_.fullname")}
              </label>
              <div>
                <Field
                  type="text"
                  name="userFullName"
                  id="userFullName"
                  autoComplete="userFullName"
                  value={values.userFullName}
                  placeholder={t("address_.enter_fullname")}
                  onChange={handleChange}
                  className={`flex items-center justify-between appearance-none  w-full px-3 py-3  border border-gray-300 
                  rounded-md shadow-sm placeholder-gray-400 
                  focus:ring-green-500 focus:border-green-500  sm:text-sm ${
                    touched.userFullName && errors.userFullName
                      ? "border-red-500"
                      : ""
                  }`}
                  error={touched.userFullName && errors.userFullName}
                />
              </div>
              {touched.userFullName && errors.userFullName && (
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.userFullName}
                </p>
              )}
            </div>

            <div className="pt-4 ">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="apartment-size"
              >
                {t("address_.email")}
              </label>
              <div>
                <Field
                  type="userEmail"
                  name="userEmail"
                  id="userEmail"
                  autoComplete="userEmail"
                  value={values.userEmail}
                  placeholder={t("address_.enter_email")}
                  onChange={handleChange}
                  className={`flex items-center justify-between appearance-none  w-full px-3 py-3  border border-gray-300 
                  rounded-md shadow-sm placeholder-gray-400 
                  focus:ring-green-500 focus:border-green-500  sm:text-sm ${
                    touched.userEmail && errors.userEmail
                      ? "border-red-500"
                      : ""
                  }`}
                  error={touched.userEmail && errors.userEmail}
                />
              </div>
              {touched.userEmail && errors.userEmail && (
                <p className="mt-2 text-sm text-red-600 ">{errors.userEmail}</p>
              )}
            </div>

            <div className="pt-4">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="apartment-size"
              >
                {t("address_.identity")}
              </label>
              <div>
                <Field
                  type="text"
                  name="userPidNumber"
                  id="userPidNumber"
                  autoComplete="userPidNumber"
                  value={values.userPidNumber}
                  placeholder={t("address_.enter_identity")}
                  onChange={handleChange}
                  className={`flex items-center justify-between appearance-none  w-full px-3 py-3  border border-gray-300 
                  rounded-md shadow-sm placeholder-gray-400 
                  focus:ring-green-500 focus:border-green-500  sm:text-sm ${
                    touched.userPidNumber && errors.userPidNumber
                      ? "border-red-500"
                      : ""
                  }`}
                  error={touched.userPidNumber && errors.userPidNumber}
                />
              </div>
              {touched.userPidNumber && errors.userPidNumber && (
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.userPidNumber}
                </p>
              )}
            </div>

            <div className="pt-4">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="apartment-size"
              >
                {t("address_.phone")}
              </label>
              <div>
                <Field
                  type="tel"
                  name="userPhoneNumber"
                  id="userPhoneNumber"
                  autoComplete="userPhoneNumber"
                  value={values.userPhoneNumber}
                  placeholder={t("address_.enter_phone")}
                  onChange={handleChange}
                  className={`flex items-center justify-between appearance-none  w-full px-3 py-3  border border-gray-300 
                  rounded-md shadow-sm placeholder-gray-400 
                  focus:ring-green-500 focus:border-green-500  sm:text-sm ${
                    touched.userPhoneNumber && errors.userPhoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                  error={touched.userPhoneNumber && errors.userPhoneNumber}
                />
              </div>
              {touched.userPhoneNumber && errors.userPhoneNumber && (
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.userPhoneNumber}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center tooltip pt-5">
                <label
                  className="flex items-center space-x-2"
                  htmlFor="rut-info"
                >
                  <FaInfoCircle className="text-gray-400" />
                  <span className="text-sm font-medium ">
                    {t("address_.how_rut")}
                  </span>
                  <span className="tooltiptext w-96">
                    {t("address_.rut_deduction")}
                  </span>
                </label>
              </div>
            </div>

            {/* //Coupon  */}
            <div className="mt-6 flex items-center space-x-2">
              <Input
                className="flex-1"
                placeholder={t("address_.gift_coupon")}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button
                className="shrink-0 flex justify-center items-center "
                onClick={handleCoupon}
              >
                {couponLoading && (
                  <div className="pr-2">
                    <Progress />
                  </div>
                )}
                {t("address_.apply")}
              </Button>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="terms" />
              <label className="text-sm font-medium" htmlFor="terms">
                {t("address_.accept")}
              </label>
            </div>

            <div className="container mb-8 mt-4 flex justify-around">
              {/* back button */}
              <button
                className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-green-500 
                px-4 py-2 font-semibold uppercase text-white transition
                ease-in-out hover:bg-primary hover:text-white
                `}
                onClick={() => {
                  prevStep();
                  setIsSubmit(false);
                }}
              >
                {t("back")}
              </button>

              {/* next button  */}
              {!isSubmit && (
                <button
                  className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-green-500 
                px-4 py-2 font-semibold uppercase text-white transition
                ease-in-out hover:bg-primary hover:text-white
              `}
                  onClick={handleSubmit}
                  disabled={Object.keys(errors).length > 0 || !touched}
                >
                  {t("next")}
                </button>
              )}
              {isSubmit && (
                <button
                  className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-blue-600 
                px-4 py-2 font-semibold uppercase text-white transition
                ease-in-out hover:bg-primary hover:text-white
              `}
                  onClick={() => onSubmit()}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="pr-2">
                      <Progress />
                    </span>
                  )}
                  {t("submit")}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
