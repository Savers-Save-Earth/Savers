"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import supabase from "@/libs/supabase";
import SignUp from "@/components/auth/SignUp";

const Signup = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default Signup;
