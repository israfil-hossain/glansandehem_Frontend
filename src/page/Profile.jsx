import React, { useState } from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import { formatDateString } from "@/utils/CommonFunction";
import GridCard from "@/components/common/ui/GridCard";
import { profile } from "@/assets";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DefaultTable from "@/components/common/DefaultTable";
import { API } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { earningHeadings } from "@/constants/TableColumns/earningHeadings";
import { CommonProgress } from "@/components/common/CommonProgress";
import { useTranslation } from "react-i18next";
import usePatch from "@/hooks/usePatch";

const Profile = () => {
  const { userData } = useAuthUserContext();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { t } = useTranslation();

  const {
    data: userSubscriptionData = {},
    isLoading: userSubscriptionLoading,
    refetch
  } = useQuery([API.GetCleaningUserSubscription]);

 

  const { data: bookingData = {}, isLoading: bookingLoading } = useQuery([
    API.GetAllCleaningBooking +
      `?Page=${page}&PageSize=${size}&BookingUserId=${userData?._id}`,
  ]);

  // Update Mutation ....
  const { mutateAsync: updateMutate, isLoading: updateLoading } = usePatch({
    endpoint:
      API.UpdateCleaningSUbscription + `${userSubscriptionData?.data?._id}`, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Cancel Your Next Schedule Successfully !");
      refetch();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      toast.error(error?.response?.data?.message);
    },
  });

  if (userSubscriptionLoading || updateLoading) {
    return <CommonProgress />;
  }

  const handleCancel = async () => {
    if (userSubscriptionData?.data?.nextScheduleDate) {
      await updateMutate(userSubscriptionData?.data?.nextScheduleDate);
    }
  };

  // console.log({ nextSchedule });

  return (
    <div className="container h-full overflow-y-hidden">
      <h2 className="lg:text-3xl font-semibold text-secondprimary">
        👋{t("hi")}, {userData?.fullName}
      </h2>

      <div className="mt-5 h-full  flex w-full flex-col  lg:flex-row gap-5 justify-center items-center lg:items-start">
        <div className="w-full border border-primary overflow-hidden items-center lg:items-start rounded-xl  px-5 py-5  shadow-lg lg:w-[45%]">
          <div className="rouded-xl flex w-96 justify-center bg-indigo-50 px-4 py-2 text-center">
            {t("welcome")} Glänsande hem
          </div>
          <div className="flex items-center justify-center ">
            <img
              src={userData?.profilePicture || profile}
              alt="profile"
              className="w-32 h-32 "
            />
          </div>
          <GridCard title={t("address_.fullname")} value={userData?.fullName} />
          <GridCard title={t("address_.email")} value={userData?.email} />
          <GridCard title={t("address_.phone")} value={userData?.phoneNumber} />
          <GridCard title={t("address")} value={userData?.address} />
          <GridCard title={"PID"} value={userData?.pidNumber} />
          <GridCard
            title={t("dateofjoin")}
            value={formatDateString(userData?.dateJoined)}
          />
          {userSubscriptionData?.data?.nextScheduleDate && (
          <div className="rouded-xl flex w-96 justify-center px-4 py-4 text-center  flex-col">
            <p className="bg-secondprimary text-white py-2 my-2 px-4">
              {t("nextSchedule")}{" "}
              {formatDateString(userSubscriptionData?.data?.nextScheduleDate) || "N/A"}
            </p>
            <div className="flex bg-indigo-100 px-2 py-2 items-center justify-between space-x-2 font-semibold">
              <h2 className="text-[12px] ">{t("doyouwant")} </h2>
              <button
                className="w-16 h-8 bg-black text-white text-[12px]"
                onClick={handleCancel}
              >
                Yes
              </button>
            </div>
          </div>
           )} 
          <Link to="/profile-setting">
            <div className="flex justify-center items-center  bg-primary text-white rounded-md py-2 px-4 ">
              {" "}
              <FaEdit size={22} className="text-white mr-4" /> Profile Setting
            </div>
          </Link>
        </div>
        <div className="w-full  h-full">
          <ProfileCard data={userSubscriptionData?.data} />
        </div>
      </div>
      <div className="mt-7 ">
        <h1 className="py-4 text-lg font-semibold">Booking History</h1>
        <DefaultTable
          isLoading={bookingLoading}
          headings={earningHeadings}
          data={bookingData || []}
          disablePagination={false}
          size={size}
          setSize={setSize}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Profile;
