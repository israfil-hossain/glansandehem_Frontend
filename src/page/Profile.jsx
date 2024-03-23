import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import { formatDateString } from "@/utils/CommonFunction";
import GridCard from "@/components/common/ui/GridCard";
import { profile } from "@/assets";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userData } = useAuthUserContext();

 
  return (
    <div className="container h-full overflow-y-hidden">
      <h2 className="lg:text-3xl font-semibold text-secondprimary">
        👋Hi, {userData?.fullName}
      </h2>
      <div className="flex w-full justify-center pt-5">
        <div className="rouded-xl flex w-96 justify-center bg-indigo-50 px-4 py-2 text-center">
          Welcome To Glansandehem
        </div>
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
          <GridCard title={"Name"} value={userData?.fullName} />
          <GridCard title={"Email"} value={userData?.email} />
          <GridCard title={"Phone Number"} value={userData?.phoneNumber} />
          <GridCard title={"Address"} value={userData?.address} />
          <GridCard title={"PID"} value={userData?.pidNumber} />
          <GridCard
            title={"Date of Join"}
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
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
