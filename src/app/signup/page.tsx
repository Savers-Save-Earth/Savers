"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import supabase from "@/libs/supabase";

const Signup = () => {
  useEffect(() => {
    async function exe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
    }
    exe();
  }, []);
  return (
    <>
      <div>signup</div>
    </>
  );
};

export default Signup;
