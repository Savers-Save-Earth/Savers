"use client";
import supabase from "@/libs/supabase";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { supabase } from "../../libs/supabase";

interface FormValue {
  email: string;
  password: string;
  confirmingPw: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <div>Login</div>;
};

export default Login;
