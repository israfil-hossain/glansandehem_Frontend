import React from "react";
import { CardTitle, CardHeader, CardContent, Card } from "../ui/card.tsx";
import { CheckIcon, PawPrintIcon } from "../common/Icons/Icons";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/endpoints.js";
import { formatDatewithTime } from "@/utils/CommonFunction.js";
import { FaChartArea, FaQrcode } from "react-icons/fa";

const ProfileCard = () => {
  // GetCleaningUserSubscription
  const {
    data: userSubscriptionData = {},
    isLoading: userSubscriptionLoading,
  } = useQuery([API.GetCleaningUserSubscription]);

  console.log({ userSubscriptionData });

  return (
    <Card className="lg:mx-5 mx-0 w-full rounded-lg bg-white shadow-md">
      <CardHeader>
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-between  flex-col ">
          <div className="bg-secondprimary text-white py-1 lg:text-lg text-[12px] px-4 w-1/2">
            Service Details
          </div>
          <div className="flex justify-between lg:mt-0 mt-5  ">
            <div className="bg-orange-500 text-white  px-3 py-1 lg:pt-2 text-center items-center rounded-full lg:text-[14px] text-[11px]">
              Complete Booked
            </div>
            <div className="bg-green-500 text-white  px-3 py-1 lg:pt-2 text-center  rounded-full items-center lg:text-[14px] text-[11px]">
              Payment Completed
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
              Service Taken{" "}
            </p>
            <h2 className="mb-3 lg:text-lg text-[14px] font-bold text-blue-900">
              {userSubscriptionData?.data?.cleaningPrice?.subscriptionFrequency}
            </h2>
          </div>
          <div className="flex justify-start space-x-10 my-2 w-full items-center">
            <p className="flex justify-center items-center rounded-xl py-1 bg-indigo-500 px-3 lg:text-[14px] text-[10px] text-white text-center ">
              Cleaning Time
            </p>
            <div>
              <h2 className="mb-3  lg:text-lg text-[12px] font-bold text-blue-900">
                {userSubscriptionData?.data?.cleaningDurationInHours} Hours
              </h2>
              <h2 className="mb-3 lg:text-lg text-[12px] font-semibold text-blue-900">
                {formatDatewithTime(userSubscriptionData?.data?.startDate)}
              </h2>
            </div>
          </div>
        </div>
        <div></div>

        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4  py-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <FaChartArea className="mr-1" />
              Area Size :
            </div>
            <p>
              {userSubscriptionData?.data?.areaInSquareMeters} m<sup>2</sup>
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <FaQrcode className="mr-1" />
              Postal Code :
            </div>
            <p>{userSubscriptionData?.data?.postalCode}</p>
          </div>
          <div className="flex items-center space-x-1">
            {(userSubscriptionData?.data?.hasCats ||
              userSubscriptionData?.data?.hasDogs ||
              userSubscriptionData?.data?.hasOtherPets) && (
              <>
                <CheckIcon className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 text-sm font-medium">
                  Have Pets
                </span>
              </>
            )}
            <div className="flex items-center space-x-1 pl-5">
              <PawPrintIcon className="text-gray-700 h-5 w-5" />
              <span className="text-gray-700 text-sm font-medium">
                {userSubscriptionData?.data?.hasCats && "Cats , "}
                {userSubscriptionData?.data?.hasDogs && "Dogs , "}
                {userSubscriptionData?.data?.hasOtherPets && "Others "}
              </span>
            </div>
          </div>
        </div>

        <div className=" pt-4">
          <div className="rounded-lg bg-slate-100 p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">Service Fees</span>
              <span className="text-gray-900 text-sm font-medium">
                {userSubscriptionData?.data?.cleaningPrice?.subscriptionPrice}{" "}
                kr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">
                Cleaning{" "}
                {userSubscriptionData?.data?.cleaningPrice?.subscriptionPrice}{" "}
                kr/h x {userSubscriptionData?.data?.cleaningDurationInHours} h
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {userSubscriptionData?.data?.currentBooking?.cleaningPrice} kr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">Discount Price </span>
              <span className="text-gray-900 text-sm font-medium">
                {userSubscriptionData?.data?.currentBooking?.discountAmount} kr
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm">
                Eco-friendly cleaning supplies
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {userSubscriptionData?.data?.currentBooking?.suppliesCharges} kr
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm font-medium">
                Additional Fees
              </span>
              <span className="text-gray-900 text-sm font-medium">
                {userSubscriptionData?.data?.currentBooking?.additionalCharges}{" "}
                kr
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-lg font-bold">TOTAL</span>
              <span className="text-2xl font-bold text-blue-800">
                {userSubscriptionData?.data?.currentBooking?.totalAmount} kr
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-lg font-bold text-red-500">
                DUE PAYMENT
              </span>

              <div className="flex space-x-5 space-y-4 justify-center items-center lg:flex flex-col">
                <span className="text-2xl font-bold text-blue-800">500 kr</span>
                <button className="bg-blue-800 hover:bg-blue-700 text-white text-sm normal lg:px-4 px-10 py-2 rounded-lg">
                  pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
