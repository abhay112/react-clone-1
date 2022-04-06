import React from "react";
import ProfileComp from "../components/ProfileComp";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const Redirect = () => {
    const router = useRouter();
    router.push("/login");
    return null;
  };
  return <ProfileComp />;
};

export default Profile;
