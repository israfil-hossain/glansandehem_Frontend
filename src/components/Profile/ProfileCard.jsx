import React, { useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "../ui/card.tsx";
import { CheckIcon, PawPrintIcon } from "../common/Icons/Icons";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/endpoints.js";
import {
  formatDateString,
  formatDatewithTime,
  formatTime,
} from "@/utils/CommonFunction.js";
import { FaChartArea, FaQrcode } from "react-icons/fa";
import GridCard from "../common/ui/GridCard.jsx";
import { CommonProgress } from "../common/CommonProgress.jsx";
import { useNavigate } from "react-router-dom";
import adminAPI from "@/api/adminAPI.js";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const ProfileCard = ({ data }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // // GetCleaningUserSubscription
  // const {
  //   data: userSubscriptionData = {},
  //   isLoading: userSubscriptionLoading,
  // } = useQuery([API.GetCleaningUserSubscription]);

  const paymentEndpoint = API.PaymentReceive + `${data?.currentBooking?._id}`;

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.get(paymentEndpoint);
      let link = response?.data?.data?.redirectUrl;
      if (link) {
        window.location.href = link;
        // navigate(link); // Use useNavigate for safe redirection
      } else {
        console.warn('API response did not include a "link" property');
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching link:", err);
      // Handle errors gracefully (e.g., display an error message to the user)
      setIsLoading(false);
    }
  };

  return (
    <Card className="lg:mx-5 mx-0 w-full rounded-lg bg-white shadow-md">
      <CardHeader>
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-between  flex-col ">
          <div className="bg-secondprimary text-white py-1 lg:text-lg text-[12px] text-center px-4 lg:w-1/2 w-full">
            {t("servicedetails")}
          </div>
          <div className="flex justify-between lg:mt-0 mt-5  ">
            <div
              className={`${
                data?.currentBooking?.bookingStatus === "BookingCancelled"
                  ? "bg-red-300"
                  : data?.currentBooking?.bookingStatus === "BookingServed"
                  ? "bg-blue-500"
                  : data?.currentBooking?.bookingStatus === "BookingCompleted"
                  ? "bg-[#0b7911a2]" // Use the intended background color for confirmed bookings
                  : "bg-yellow-500"
              } text-white  px-4 py-1 lg:pt-2 text-center items-center rounded-full lg:text-[14px] text-[11px] `}
            >
              {data?.currentBooking?.bookingStatus === "BookingCancelled"
                ? `${t("bookingCanceled")}`
                : data?.currentBooking?.bookingStatus === "BookingServed"
                ? `${t("bookingConfirmed")}`
                : data?.currentBooking?.bookingStatus === "BookingCompleted"
                ? `${t("bookingComplete")}` // Use the intended background color for confirmed bookings
                : `${t("bookingProcessing")}`}
            </div>

            <div
              className={` ${
                data?.currentBooking?.paymentStatus === "PaymentCompleted"
                  ? "bg-[#0b7911a2] "
                  : "bg-red-300" // Use the intended background color for confirmed bookings
              } text-white  px-4 py-1 lg:pt-2 text-center  rounded-full items-center lg:text-[14px] text-[11px] `}
            >
              {data?.currentBooking?.paymentStatus === "PaymentCompleted"
                ? `${t("paymentPaid")}`
                : `${t("pendingPaid")}`}
            </div>
          </div>
        </div>

        <br />
        <hr />
      </CardHeader>
      <CardContent>
        <div className="flex lg:flex-row flex-col  justify-between ">
          <div className="flex justify-start space-x-10 my-2 w-full items-center">
            <p className="flex justify-center items-center rounded-xl py-1 bg-indigo-500 px-4 lg:text-sm text-[12px] text-white text-center ">
              {t("serviceTaken")}
            </p>
            <h2 className=" lg:text-lg text-[14px] font-bold text-blue-900">
              {data?.subscriptionFrequency}
            </h2>
          </div>
          <div className="flex justify-start space-x-10 my-2 w-full items-center">
            <p className="flex justify-center items-center rounded-xl py-1 bg-indigo-500 px-3 lg:text-[14px] text-[10px] text-white text-center ">
              {t("cleaningTime")}
            </p>
            <div>
              <h2 className="mb-3 lg:text-lg text-[12px] font-semibold text-blue-900">
                {formatDateString(data?.currentBooking?.cleaningDate)}
              </h2>

              <h2 className="mb-3 lg:text-lg text-[12px] font-semibold text-blue-900">
                {formatTime(dayjs(data?.currentBooking?.cleaningDate))} {" - "}
                {formatTime(
                  dayjs(data?.currentBooking?.cleaningDate).add(
                    data?.cleaningDurationInHours,
                    "hour"
                  )
                )}
              </h2>
              <h2 className="mb-3  lg:text-lg text-[12px] font-bold text-blue-900">
                Time : {data?.cleaningDurationInHours} Hours
              </h2>
            </div>
          </div>
        </div>
        <div></div>

        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4  py-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <FaChartArea className="mr-1" />
              {t("service.apartment")} :
            </div>
            <p>
              {data?.areaInSquareMeters} m<sup>2</sup>
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <FaQrcode className="mr-1" />
              {t("postalCode")} :
            </div>
            <p>{data?.postalCode}</p>
          </div>
          <div className="flex items-center space-x-1">
            {(data?.hasCats || data?.hasDogs || data?.hasOtherPets) && (
              <>
                <CheckIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 text-sm font-medium">
                  {t("havePets")}
                </span>
              </>
            )}
            <div className="flex items-center space-x-1 pl-5">
              <PawPrintIcon className="text-gray-700 h-5 w-5" />
              <span className="text-gray-700 text-sm font-medium">
                {data?.hasCats && "Cats , "}
                {data?.hasDogs && "Dogs , "}
                {data?.hasOtherPets && "Others "}
              </span>
            </div>
          </div>
        </div>

        <div className=" pt-4">
          <div className="rounded-lg bg-slate-100 p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">{t("serviceFee")}</span>
              <span className="text-gray-900 text-sm font-medium">
                {data?.currentBooking?.subscriptionPrice || "N/A"} kr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">
                {t("cleaning")}
                {""} {"Price"}
                {data?.currentBooking?.subscriptionPrice} kr/h x{" "}
                {data?.cleaningDurationInHours || "N/A"} h
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {data?.currentBooking?.cleaningPrice || "N/A"} kr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">{t("discount")}</span>
              <span className="text-gray-900 text-sm font-medium">
                {data?.currentBooking?.discountAmount || "N/A"} Kr
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm">
                {t("service.ecofriendly_supplies")}
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {data?.currentBooking?.suppliesCharges || "N/A"} kr
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm font-medium">
                {t("service.additionalFee")}
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {data?.currentBooking?.additionalCharges} kr
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm font-medium">
                {t("service.additionalDescription")}
              </span>
              <span className="text-grey-900 text-sm font-medium">
                {data?.currentBooking?.remarks}{" "}
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-lg font-bold">
                {t("service.before_rut")}
              </span>
              <span className="text-2xl font-bold text-blue-800">
                {data?.currentBooking?.cleaningPrice * 2 +
                  data?.currentBooking?.additionalCharges +
                  data?.currentBooking?.suppliesCharges}{" "}
                kr
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-lg font-bold">TOTAL</span>
              <span className="text-2xl font-bold text-blue-800">
                {data?.currentBooking?.totalAmount} kr
              </span>
            </div>

            {data?.currentBooking?.paymentStatus === "PaymentCompleted" ? (
              <div className="flex justify-between pt-2">
                <span className="text-gray-800 text-lg font-bold">
                  TOTAL PAID
                </span>
                <span className="text-2xl font-bold text-blue-800">
                  {data?.currentBooking?.totalAmount} kr
                </span>
              </div>
            ) : (
              <div className="flex justify-between pt-2">
                <span className="text-gray-800 text-lg font-bold text-red-500">
                  DUE PAYMENT
                </span>

                <div className="flex space-x-5 space-y-4 justify-center items-center lg:flex flex-col">
                  <span className="text-2xl font-bold text-blue-800">
                    {data?.currentBooking?.totalAmount} kr
                  </span>
                  {data?.currentBooking?.bookingStatus === "BookingServed" && (
                    <button
                      className="bg-gradient-to-r from-primary  to-secondprimary hover:from-secondprimary 
                    hover:to-primary text-white text-sm normal lg:px-4 px-10 py-2 rounded-lg"
                      onClick={handlePayment}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Pay Now"}
                    </button>
                  )}
                </div>
              </div>
            )}

            <p className="text-center w-full font-semibold py-2">
              Org. No. 890114-4751
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
