"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import bcrypt from "bcryptjs";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";

const Login = () => {
  const handleOnClick = async () => {
    const res = await fetch("/api/auth/login/", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    return result;
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitData = async (LoginUserSchema: LoginUserInput) => {
    // e.preventDefault();
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashPwd = await bcrypt.hash(formData.password, salt);
    // console.log("login password hash: ", hashPwd);

    const res = await fetch(`/api/auth/login/`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(LoginUserSchema),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    return result;
  };

  const { register, handleSubmit } = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  return (
    <div className="flex items-center justify-center mt-10 h-2/3">
      <div className="  bg-gradient-to-tl from-[#263159] shadow-lg w-80 max-w-96 min-w-72 h-full rounded-lg">
        <h1 className="font-extrabold text-center text-[#39ff60ae] text-lg py-4 mb-12">
          Login
        </h1>
        <div className="flex justify-center items-center">
          <form
            className="grid grid-flow-row space-y-4 max-w-sm"
            onSubmit={handleSubmit(submitData)}
          >
            <div className="grid">
              <label className="font-bold text-[#39ff60ae]">Email</label>
              <input
                type="email"
                {...register("email")}
                id="email"
                name="email"
                placeholder="youremail@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="rounded text-md"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-[#39ff60ae]">Password</label>
              <input
                type="password"
                {...register("password")}
                id="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                className="rounded text-md"
              />
            </div>
            <div className="grid justify-center">
              <button type="submit" className="rounded px-3 bg-[#39ff60ae] my-4 text-white font-semibold">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
