export const API = {
  // Authentication
  SignUp: "/api/Authentication/Signup", //post
  Login: "/api/Authentication/SignIn", //post
  AdminSignIn: "/api/Authentication/AdminSignIn", //post
  RefreshToken: "/api/Authentication/TokenRefresh", //post
  RevokeToken: "/api/Authentication/TokenRevoke", //post
  ChangePassword: "/api/Authentication/ChangePassword", //post
  GetLoginUser: "/api/Authentication/GetLoggedInUser", //get
  ResetPasswordRequest: "/api/Authentication/ResetPasswordRequest", // post
  ResetPassword: "/api/Authentication/ResetPassword", // post

  // Application User......
  PostUser: "/api/ApplicationUser/Create", //post
  GetUser: "/api/ApplicationUser/GetAll", //get
  GetSingleUser: "/api/ApplicationUser/GetById/", //get
  UpdateSingleUser: "/api/ApplicationUser/UpdateById/", //patch
  DeleteUser: "/api/ApplicationUser/DeleteById/", // delete
  UpdateProfile: "/api/ApplicationUser/UpdateOwnProfile", // patch
  UpdateProfilePicture: "/api/ApplicationUser/UpdateOwnProfilePicture", // patch

  // Cleaning Subscription Add
  ADDCleaningSubscription: "/api/CleaningSubscription/AddSubscription", //post
  GetCleaningUserSubscription: "/api/CleaningSubscription/GetUserSubscription", //get
  GetAllSubscriptionType: "/api/CleaningSubscription/GetAllSubscriptionTypes", //get
  GetAllCleaningBooking: "/api/CleaningBooking/GetAllPaidBooking",//get

  // Cleaning Prices
  PostCleaningPrice: "/api/CleaningPrice/Create", // post
  GetAllCleaningPrice: "/api/CleaningPrice/GetAll", // get

  // Cleaning Bookings
  GetCleaningBooks: "/api/CleaningBooking/GetAll", // get

  //Cleaning Time Slots
  PostCleaningTimeSlot: "/api/CleaningTimeSlot/Create", // post
  GetAllTimeSlots: "/api/CleaningTimeSlot/GetAll", // get
  GetTimeSlotsWeekdays: "/api/CleaningTimeSlot/GetAllByWeekdays", //get

  //Coupon
  VerifyCoupon: "/api/CleaningCoupon/VerifyByCode", // post

  //Supplies Charge
  SuppliesCharge: "/api/Configuration/GetSuppliesCharge", // get 

  //Payment 
  PaymentReceive: "/api/PaymentReceive/GetIntentByBookingId/" , //get
};
