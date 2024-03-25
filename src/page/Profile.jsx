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

const Profile = () => {
  const { userData } = useAuthUserContext();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { t } = useTranslation();

  const {
    data: userSubscriptionData = {},
    isLoading: userSubscriptionLoading,
  } = useQuery([API.GetCleaningUserSubscription]);

  // console.log({ userSubscriptionData });

  // const { data: bookingData = {}, isLoading: bookingLoading } = useQuery([
  //   API.GetAllCleaningBooking + `?Page=${page}&PageSize=${size}&BookingUserId=${userData?._id}`,
  // ]);

  if (userSubscriptionLoading) {
    return <CommonProgress />;
  }


  // console.log({ nextSchedule });

  return (
    <div className="container h-full overflow-y-hidden">
      <h2 className="lg:text-3xl font-semibold text-secondprimary">
        👋{t("hi")}, {userData?.fullName}
      </h2>
      <div className="flex w-full justify-center pt-5 space-x-5">
        <div className="rouded-xl flex w-96 justify-center bg-indigo-50 px-4 py-2 text-center">
          {t("welcome")} Glänsande hem
        </div>
        {userSubscriptionData?.data?.nextScheduleDate && (
          <div className="rouded-xl flex w-96 justify-center bg-pink-100 px-4 py-2 text-center">
            {t("nextSchedule")} {userSubscriptionData?.data?.nextScheduleDate || "N/A"}
          </div>
        )}
      </div>

      <div className="mt-5 h-full  flex w-full flex-col  lg:flex-row gap-5 justify-center items-center lg:items-start">
        <div className="w-full border border-primary overflow-hidden items-center lg:items-start rounded-xl  px-5 py-5  shadow-lg lg:w-[45%]">
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
          <Link to="/profile-setting">
            <div className="flex justify-center items-center  bg-primary text-white rounded-md py-2 px-4 ">
              {" "}
              <FaEdit size={22} className="text-white mr-4" /> Profile Setting
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* <h2 className='text-lg font-bold '>Support</h2>
            <textarea
              name='support'
              className='min-h-20 w-full border p-4'
              placeholder='Write description ... '
            />
            <div className='flex w-24 cursor-pointer space-x-3 rounded-full bg-blue-800 px-4 py-2 text-white hover:bg-blue-700'>
              {' '}
              <SendIcon /> <p>Send</p>
            </div> */}
          </div>
        </div>
        <div className="w-full  h-full">
          <ProfileCard data={userSubscriptionData?.data} />
        </div>
      </div>
      <div>
        {/* Booking History */}
        {/* <DefaultTable
          isLoading={bookingLoading}
          headings={earningHeadings}
          data={bookingData || []}
          disablePagination={false}
          size={size}
          setSize={setSize}
          page={page}
          setPage={setPage}
        /> */}
      </div>
    </div>
  );
};

export default Profile;
