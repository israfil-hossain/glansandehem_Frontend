import { API } from "@/api/endpoints";
import { useFormData } from "@/context/FormDataContext";
import { Duration } from "@/utils/CommonFunction";
import serviceValidation from "@/validations/service_validations/ServiceValidation";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "../common/Progress";

const Services = ({ onSubmit }) => {
  const { formData, setFormData } = useFormData();
  const { t, i18n } = useTranslation();

  const { data: cleaningFrequency = {}, isLoading: cleaningFrequencyLoading } =
    useQuery([API.GetAllCleaningPrice]);


  const initialValues = {
    areaInSquareMeters: formData?.areaInSquareMeters,
    cleaningDurationInHours: formData?.cleaningDurationInHours,
    cleaningFrequency: "",
    cleaningPrice: "",
  };

  const handleSubmit = async (values) => {
    await setFormData((prevFormData) => ({
      ...prevFormData,
      ...values,
    }));
    onSubmit();
  };

  return (
    <div className="lg:w-md w-full rounded-lg  bg-white py-4 shadow-lg lg:mx-auto lg:px-12">
      <h2 className={`text-center text-[35px] font-[700] text-secondprimary`}>
        {t("service.tellus")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={serviceValidation}
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

            {/* Apartment Size  */}
            <div className="mb-4 pt-10">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="apartment-size"
              >
                {t("service.apartment")}
              </label>
              <div
                className={`flex items-center justify-between appearance-none  w-full px-3  border border-gray-300 
                  rounded-md shadow-sm placeholder-gray-400 
                  focus:ring-green-500 focus:border-green-500  sm:text-sm ${
                    touched.areaInSquareMeters && errors.areaInSquareMeters
                      ? "border-red-500"
                      : ""
                  }`}
              >
                <Field
                  type="number"
                  name="areaInSquareMeters"
                  id="areaInSquareMeters"
                  autoComplete="areaInSquareMeters"
                  value={values.areaInSquareMeters}
                  placeholder={t("service.enter_apartment")}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFieldValue("areaInSquareMeters", newValue);
                    setFieldValue(
                      "cleaningDurationInHours",
                      Duration(newValue)
                    );
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      areaInSquareMeters: newValue,
                      cleaningDurationInHours: Duration(newValue),
                    }));
                  }}
                  className="w-full h-full items-center py-3 focus:ring-0 focus:border-white border-0 outline-none  "
                  error={
                    touched.areaInSquareMeters && errors.areaInSquareMeters
                  }
                />

                <span className="ml-2 text-sm">m²</span>
              </div>
              {touched.areaInSquareMeters && errors.areaInSquareMeters && (
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.areaInSquareMeters}
                </p>
              )}
            </div>
            {/* -------------------------- */}
            {/* Cleaning Duration  */}
            <div className="mb-6">
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="cleaning-duration"
              >
                {t("service.cleaningDuration")}
              </label>
              <Field
                as="select"
                name="cleaningDurationInHours"
                className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.cleaningDurationInHours &&
                                      errors.cleaningDurationInHours
                                        ? "border-red-500"
                                        : ""
                                    }`}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFieldValue("cleaningDurationInHours", newValue);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    cleaningDurationInHours: newValue,
                  }));
                }}
                value={values.cleaningDurationInHours}
              >
                <option value={values.cleaningDurationInHours} disabled hidden>
                  {values.cleaningDurationInHours
                    ? values.cleaningDurationInHours +
                      ` ${t("service.recommendation")}`
                    : "Select cleaning duration"}
                </option>
                <option value="2">2 {t("service.hourse")}</option>
                <option value="2.5">2.5 {t("service.hourse")}</option>
                <option value="3">3 {t("service.hourse")}</option>
                <option value="3.5">3.5 {t("service.hourse")}</option>
                <option value="4">4 {t("service.hourse")}</option>
                <option value="4.5">4.5 {t("service.hourse")}</option>
                <option value="5">5 {t("service.hourse")}</option>
                <option value="5.5">5.5 {t("service.hourse")}</option>
                <option value="6">6 {t("service.hourse")}</option>
                <option value="6.5">6.5 {t("service.hourse")}</option>
                <option value="7">7 {t("service.hourse")}</option>
                <option value="7.5">7.5 {t("service.hourse")}</option>
                <option value="8">8 {t("service.hourse")}</option>
              </Field>
            </div>
            {/* --------------------------- */}

            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium">
                {t("service.HowOften")}
              </h3>
              <p className="mb-4 text-sm">{t("service.with_Glänsande hem")}</p>
              {cleaningFrequencyLoading ? (
                <div className="items-center flex justify-center w-full h-24">
                  <Progress />
                </div>
              ) : (
                <div className="space-y-4">
                  {cleaningFrequency?.data?.map((item, i) => (
                    <div
                      key={i}
                      className={`bg-gray-100  items-center  cursor-pointer   rounded-lg  overflow-hidden ${
                        values?.cleaningFrequency ===
                        item?.subscriptionFrequency
                          ? "border-2 border-black"
                          : "border"
                      }`}
                      onClick={async () => {
                        await setFieldValue(
                          "cleaningFrequency",
                          item?.subscriptionFrequency
                        );
                        await setFieldValue("cleaningPrice", item?._id);

                        await setFormData((prevFormData) => ({
                          ...prevFormData,
                          cleaningFrequency: item?.subscriptionFrequency,
                          showPrice: item?.subscriptionPrice,
                        }));
                      }}
                    >
                      {item?.subscriptionFrequency === "EveryTwoWeeks" && (
                        <div className="flex items-end justify-end  ">
                          <p className="  rounded-bl-full rounded-tl-sm rounded-tr-48 mr-[0.2px]   bg-secondprimary px-4 py-1 text-center text-[12px] font-bold text-white">
                            {t("service.mostpopular")}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-4">
                        <div className="flex flex-col items-start justify-start">
                          <p
                            className={` ${
                              values.cleaningFrequency ===
                              item.subscriptionFrequency
                                ? "text-md font-bold"
                                : "text-sm font-normal"
                            }`}
                            htmlFor={item.subscriptionFrequency}
                          >
                            {item.subscriptionFrequency}
                          </p>
                          <span className="text-sm">
                            {item.subscriptionPrice * 2} kr/h{" "}
                            {t("service.without")}
                          </span>
                        </div>
                        <span className="items-end text-lg font-semibold">
                          {item.subscriptionPrice} kr/h
                        </span>
                      </div>
                    </div>
                  ))}

                  {errors.cleaningFrequency && touched.cleaningFrequency && (
                    <div className="text-red-500">
                      {errors.cleaningFrequency}
                    </div>
                  )}

                  {errors.cleaningPrice && touched.cleaningPrice && (
                    <div className="text-red-500">{errors.cleaningPrice}</div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-6 ">
              <h3 className="mb-1 text-sm font-medium">
                {t("service.ecofriendly_supplies")}
              </h3>
              <div className="flex items-start space-x-2 rounded-lg bg-teal-100 px-4 py-4">
                <InfoIcon className="mt-1 h-10 w-16 text-blue-600" />
                <p className="text-sm">{t("service.eco_info")}</p>
              </div>
            </div>

            <div className="container mb-8 mt-4 flex justify-around">
              {/* back button */}
              <button
                className={`rounded-xl border-2 border-slate-300 bg-white 
                px-4 py-2 font-semibold uppercase text-slate-400 transition
                ease-in-out hover:bg-slate-700 hover:text-white opacity-50 cursor-not-allowed 
              `}
                disabled={true}
              >
                {t("back")}
              </button>

              {/* next button  */}
              <button
                className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-green-500 
                px-4 py-2 font-semibold uppercase text-white transition
                ease-in-out hover:bg-primary hover:text-white
              `}
                disabled={Object.keys(errors).length > 0 || !touched}
                onClick={handleSubmit}
              >
                {t("next")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export default Services;





