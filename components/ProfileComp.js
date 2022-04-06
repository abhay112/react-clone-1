import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import avatar from "../assets/avatar.jpg";
const ProfileComp = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="profile_upper">
          <img
            src="https://variety.com/wp-content/uploads/2013/06/avatar.jpg?w=681&h=383&crop=1"
            alt="avatar"
            style={{ height: "8rem", width: "8rem", borderRadius: "50%" }}
          />
          <div style={{ flexBasis: "40%" }}>
            <h1>Name</h1>
            <h3>Post 10</h3>
          </div>
        </div>
        <hr />
        <div className="profile_videos">
          {/* <img src="https://variety.com/wp-content/uploads/2013/06/avatar.jpg?w=681&h=383&crop=1" /> */}
          <video />
          <video />
          <video />
          <video />
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
