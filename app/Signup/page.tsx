"use client";
import bcrypt from "bcryptjs";
import React, { useState } from "react";
import { toast, DefaultToastOptions } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: undefined,
    email: undefined,
    password: "",
    phone: undefined,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPwd = await bcrypt.hash(formData.password, salt);
    console.log(hashPwd);

    const userData = {
      username: formData.name,
      useremail: formData.email,
      userpassword: hashPwd,
      phone: formData.phone,
    };
    const res = await fetch("/api/auth/register/", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (result.success === true) {
      toast.success("Account Created!");
    } else {
      toast.error(`Error: recheck your input fields`);
    }
    // if(result.message.details)
    // {
    //   toast.error(result.message.details);
    // }
    console.log(result);
  };

  return (
    <div className="flex items-center justify-center mt-10 h-2/3">
      <div className="  bg-gradient-to-tl from-[#263159] shadow-lg w-80 max-w-96 min-w-72 h-full rounded-lg">
        <h1 className="font-extrabold text-center text-[#39ff60ae] text-lg py-4 mb-12">
          Sign Up
        </h1>
        <div className="flex justify-center">
          <form
            className="grid grid-flow-row space-y-4 max-w-sm"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label className="font-bold text-[#39ff60ae]">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
                className="rounded text-md"
              />
            </div>
            <div className="grid">
              <label  className="font-bold text-[#39ff60ae]">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Contact number(OPTIONAL)"
                value={formData.phone}
                onChange={handleChange}
                className="rounded text-md"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-[#39ff60ae]">Email</label>
              <input
                type="email"
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
                id="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                className="rounded text-md"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-[#39ff60ae]">Confirm Password</label>
              <input
                type="password"
                id="password"
                name="confirmpassword"
                placeholder="Retype your password"
                value={formData.password}
                onChange={handleChange}
                className="rounded text-md"
              />
            </div>
            <div className="grid justify-center">
              <button type="submit" className="rounded px-3 bg-[#39ff60ae] my-4 text-white font-semibold">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
