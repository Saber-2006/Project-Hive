export const getUserData = () => {
  const signinSaved = localStorage.getItem("signin-form");
  const signupSaved = localStorage.getItem("signup-form");

  const signinData = signinSaved ? JSON.parse(signinSaved) : null;
  const signupData = signupSaved ? JSON.parse(signupSaved) : null;

  if (signinData?.email && signupData?.email) {
    return {
      email: signinData.email,
      fullName: `${signupData.firstName} ${signupData.lastName}`,
    };
  }
  if(signinData==null){
    return {
      email: signupData?.email || "No email available",
      fullName: `${signupData?.firstName || "Guest"} ${signupData?.lastName || "User"}`,
    };
  }
  return {
    email: "No email available",
    fullName: "Guest User",
  };
}
