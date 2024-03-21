"use client";
import React from "react";
import ProfilePageDesign from "@/app/profile/[username]/ProfilePageDesign";
const Profile = ({ params }: any) => {
  return (
    <>
      <ProfilePageDesign name={params.id} />
    </>
  );
};

export default Profile;
