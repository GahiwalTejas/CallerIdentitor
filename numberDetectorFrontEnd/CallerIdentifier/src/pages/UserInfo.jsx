import React, { useState } from "react";
import ContactLogo from "../components/Logo/ContactLogo";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Toaster from "../components/toaster/Toaster";
import Button from "../components/Button";
import { useSelector } from "react-redux";
function UserInfo() {
  const [error, setError] = useState(" ");
  const [showToaster, setShowToaster] = useState(false);
  const userInfo = useSelector((state) => {
    console.log(state);
    console.log(state.auth);
    console.log(state.auth.userData);
    return state.auth.userData;
  });

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  console.log(userInfo);
  const id = userInfo.id;
  const create = async (data) => {
    debugger;
    fetch(`http://localhost:63965/api/Contacts/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        navigate("/userInfo");
        setError(" ");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <ContactLogo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Save Your Contacts
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {showToaster && (
          <Toaster
            message="Contact Details save"
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

            <Button type="submit" className="w-full">
              Add Contact
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
