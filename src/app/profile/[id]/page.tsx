import React from "react";
import ProfilePageDesign from "@/app/profile/[id]/ProfilePageDesign";

function LoginPage({ params }: any) {
  return (
    <>
      <ProfilePageDesign name={params.id} />
    </>
  );
}

export default LoginPage;
