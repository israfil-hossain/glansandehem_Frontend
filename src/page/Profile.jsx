import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import { formatDateString } from "@/utils/CommonFunction";

const Profile = () => {
  const { userData } = useAuthUserContext();

  console.log({ userData });
  return (
    <div className="container h-full overflow-y-hidden">
      <h2 className="text-3xl font-semibold text-secondprimary">👋Hi, {userData?.fullName}</h2>
      <div className="flex w-full justify-center pt-5">
        
        <div className="rouded-xl flex w-96 justify-center bg-indigo-50 px-4 py-2 text-center">
          Welcome To Glansandehem
        </div>
      </div>

      <div className="mt-5 h-full  flex w-full flex-col  lg:flex-row gap-5 justify-center items-center lg:items-start">
        <div className="w-full bg-white overflow-hidden items-center lg:items-start  grid grid-cols-6  rounded-xl  px-4 py-10 shadow-lg lg:w-[40%]">
          <div className="space-y-10 col-span-1 text-[16px] font-semibold ">
            <h2>Name</h2>
            <h2>Email</h2>
            <h2>Phone</h2>
            <h2>Address</h2>
            <h2>PID</h2>
            <h2 className="w-24">Date of Join</h2>
          </div>
          <div className="space-y-10 col-span-1 font-bold text-[16px] ml-3">
            <h2>:</h2>
            <h2>:</h2>
            <h2>:</h2>
            <h2>:</h2>
            <h2>:</h2>
            <h2 className="ml-7">:</h2>
          </div>

          <div className="space-y-10 col-span-3">
            <h2>{userData?.fullName}</h2>
            <h2>{userData?.email}</h2>
            <h2>{userData?.phoneNumber}</h2>
            <h2>{userData?.address}</h2>
            <h2>{userData?.pidNumber}</h2>
            <h2>{formatDateString(userData?.dateJoined)}</h2>
          </div>
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
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
