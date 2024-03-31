import React, { useEffect, useState } from "react";
import Services from "../components/Services/Services";
import { toast } from "react-toastify";
import Stepper from "../components/Services/Stepper";
import { useCreate } from "../hooks";
import { API } from "../api/endpoints";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import {
  CheckIcon,
  LocateIcon,
  PawPrintIcon,
} from "@/components/common/Icons/Icons";

import DateTime from "@/components/Services/DateTime";
import { useFormData } from "@/context/FormDataContext";
import Address from "@/components/Services/Address";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/common/Progress";
import AccordionSection from "@/components/Home/AccordionSection";

const Home = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const steps = [
    t("serviceStepper"),
    t("dateandtime"),
    t("address"),
    t("overview"),
  ];
  const [step, setStep] = useState(1);
  const { formData, setFormData } = useFormData();

  const { data: suppliesCharge = {}, isLoading: suppliesLoading } = useQuery([
    API.SuppliesCharge,
  ]);
  // add Supplies Charge here .
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      showSupplies: suppliesCharge?.data?.suppliesCharge,
    }));
  }, [suppliesCharge?.data]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const {
    mutateAsync: spaceCreate,
    isLoading: serviceIsLoading,
    isSuccess,
    isError,
    error,
  } = useCreate({
    endpoint: API.ADDCleaningSubscription,
    onSuccess: () => {
      setFormData("");
      toast.success("Cleaning Service Booking Confirmed ! 👋");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went Wrong !");
    },
  });

  const handleSubmit = async () => {
    if (serviceIsLoading) {
      return <Progress />;
    }

    try {
      const payload = {
        userFullName: formData?.userFullName,
        userEmail: formData?.userEmail,
        userPidNumber: formData?.userPidNumber,
        userPhoneNumber: formData?.userPhoneNumber,
        areaInSquareMeters: Number(formData?.areaInSquareMeters),
        postalCode: Number(formData?.postalCode),
        address: formData?.address,
        cleaningDurationInHours: formData?.cleaningDurationInHours,
        subscriptionFrequency: formData?.cleaningFrequency,
        cleaningCoupon: formData?.cleaningCoupon,
        startDate: formData?.startDate,
        hasCats: formData?.hasCats,
        hasDogs: formData?.hasDogs,
        hasOtherPets: formData?.hasOtherPets,
      };

      await spaceCreate(payload); // Trigger the mutation with form data
    } catch (error) {
      // Handle errors, e.g., display error messages
      console.log({ error });
    }
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Services onSubmit={nextStep} />;
      case 2:
        return <DateTime onSubmit={nextStep} prevStep={prevStep} />;
      case 3:
        return (
          <Address
            onSubmit={handleSubmit}
            prevStep={prevStep}
            isLoading={serviceIsLoading}
          />
        );

      default:
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for window object (important for server-side rendering)
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
    }
  }, [step]);

  return (
    <div className="inset-0 container mb-10 flex overflow-hidden   flex-col lg:flex-row lg:space-x-5">
      <div className=" mx-0 mb-10  w-[100%] rounded-xl lg:mx-auto overflow-y-auto  lg:w-[55%] ">
        <div className="container mt-5">
          <Stepper currentStep={step} steps={steps} />
        </div>
        <div className="mb-10">{displayStep(step)}</div>
      </div>

      {/* Right side  */}
      <div className=" w-full lg:mx-5 lg:w-[40%]   ">
        <Card className="lg:w-[472px] w-full rounded-lg bg-white shadow-md ">
          <CardHeader className="bg-secondprimary py-4 px-4 ">
            <CardTitle className="text-slate-100 mb-2 text-xl  font-semibold ">
              {t("home_cleaning")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mt-4">
              <div className="text-5xl font-bold text-blue-900">
                {" "}
                {formData?.showPrice} kr
              </div>
              <div className="text-gray-500 text-sm py-2">
                {t("service.before_rut")} {formData?.showPrice * 2} kr
              </div>
            </div>
            <hr />
            <div className="border-gray-200 lg:flex flex-col  justify-between  py-4 mb-1">
              <div className="lg:flex flex-col space-y-2 items-center space-x-3 mb-2">
                <div className="flex">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <p>{t("frequency")}: </p>
                </div>
                <div><span className="text-gray-700 text-sm font-medium uppercase">
                  {formData?.cleaningFrequency || "N/A"}
                </span>
                </div>
              </div>
              <div className="flex  space-y-2 space-x-3 items-center">
                <div className="flex space-x-3 gap-3 items-center ">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  {t("cleaning_duration")} :{" "}
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {formData?.cleaningDurationInHours} h
                </span>
              </div>
            </div>
            <div className="lg:flex space-y-2 flex-col justify-between py-4">
              <div className="flex items-center space-x-1">
                <LocateIcon className="text-gray-700 h-5 w-5" />
                <span className="text-gray-700 text-sm font-medium">
                  {formData?.address}, {formData?.postalCode}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <PawPrintIcon className="text-gray-700 h-5 w-5" />
                <span className="text-gray-700 text-sm font-medium">
                  {formData?.hasCats && "Cats , "}
                  {formData?.hasDogs && "Dogs , "}
                  {formData?.hasOtherPets && "Other Pets"}
                </span>
              </div>
            </div>
            <div className="border-gray-200 border-t pt-4">
              <div className="rounded-lg bg-slate-100 p-5 ">
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm">
                    {t("cleaning")} {"  "} {formData?.showPrice} kr/h x{" "}
                    {formData?.cleaningDurationInHours} h
                  </span>
                  <span className="text-gray-900 text-sm font-medium">
                    {formData?.showPrice * formData?.cleaningDurationInHours} kr
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700 text-sm">
                    {t("service.ecofriendly_supplies")}
                  </span>
                  <span className="text-gray-900 text-sm font-medium">
                    {suppliesCharge?.data?.suppliesCharge} kr
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700 text-sm font-medium">
                    {t("service.before_rut")}
                  </span>
                  <span className="text-gray-900 text-sm font-medium">
                    {(formData?.showPrice * formData?.cleaningDurationInHours +
                      suppliesCharge?.data?.suppliesCharge) *
                      2}{" "}
                    kr
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-800 text-lg font-bold">TOTAL</span>
                  <div className="text-2xl font-bold text-secondprimary">
                    {formData?.totalPrice ? (
                      <del>
                        {formData?.showPrice *
                          formData?.cleaningDurationInHours +
                          suppliesCharge?.data?.suppliesCharge}
                      </del>
                    ) : (
                      <>
                        {formData?.showPrice *
                          formData?.cleaningDurationInHours +
                          suppliesCharge?.data?.suppliesCharge}
                      </>
                    )}
                    <span className="pl-2">
                      {formData?.totalPrice && formData?.totalPrice}{" "}
                    </span>
                    kr
                    <p className="text-[14px] text-blue-500">
                      {formData?.totalPrice && (
                        <span>{formData?.percentDiscount} % discount </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="w-full mt-5">
          <AccordionSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
