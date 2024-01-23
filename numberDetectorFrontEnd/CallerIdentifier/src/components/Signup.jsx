import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo/Logo";
import Toaster from "./Toaster";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [showToaster, setShowToaster] = useState(false);

  const create = async (data) => {
    setError(" ");
    debugger;
    try {
      fetch("http://localhost:63965/api/Users/Registration", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp) {
            setShowToaster(true);
            navigate("/login");
          } else setError("Registration Failed....");
        });
    } catch (error) {
      console.log(error);
      setError("Registration Failed......", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {showToaster && (
          <Toaster
            message="Registration successful"
            type="green"
            onClose={() => setShowToaster(false)}
          />
        )}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Mo. Number: "
              type="text"
              placeholder="Enter your Mobile Number"
              {...register("MoNumber", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /(\+)?(91)?( )?[789]\d{9}/g.test(value) ||
                    "Mobile No. must be a valid",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
