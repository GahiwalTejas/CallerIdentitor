// import React, { useEffect, useState } from "react";
// import Input from "./Input";
// import Button from "./Button";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import Logo from "./Logo/Logo";
// import { login as authLogin } from "../store/authSlice";

// import { useDispatch } from "react-redux";
// import Toaster from "./toaster/Toaster";

// function Login() {
//   const { register, handleSubmit } = useForm();
//   const [error, setError] = useState(" ");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [showToast, setShowToast] = useState(false); // Stat
//   // const showToast=(text)=>{
//   //   return <Toaster text={text}></Toaster>
//   // }
// useEffect(()=>{

// },[showToast])



//   const login = async (data) => {
//     setError("");
//     debugger;
//     fetch("http://localhost:63965/api/Users/Login", {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//       .then((resp) => resp.json())
//       .then((resp) => {
//         console.log({ ...resp });
//         console.log(resp.UserId);
//         return resp;
//       })
//       .then((resp) => {
//         //   console.log(resp);
//         //   console.log(resp.UserId)
//         if (resp) {
//           dispatch(
//             authLogin({
//               userData: {
//                 name: resp.Name,
//                 email: resp.Email,
//                 id: resp.UserId,
//                 MoNumber: resp.MoNumber,
//               },
//             })
//           );
// setShowToast(true)
//           setTimeout(() => {
//             navigate("/userInfo");
//           }, 3000); 



//          // navigate("/userInfo");
//         }
//         else{
//           throw new Error("Invalid credentials");

//         }
        
//       //  return resp;
//       })
//       .catch((err) => {
//         console.log(err);
//         showToast("Invalid credentials"); // Show error toaster

//         alert("User Need To Register....");
//         navigate("/signup");
//       });
//   };

//   return (


//     <div className="flex items-center justify-center w-full">
//       <div
//         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//       >
//         <div className="mb-2 flex justify-center">
//           <span className="inline-block w-full max-w-[100px]">
//             <Logo width="100%" />
//           </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-base text-black/60">
//           Don&apos;t have any account?&nbsp;
//           <Link
//             to="/signup"
//             className="font-medium text-primary transition-all duration-200 hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         <form onSubmit={handleSubmit(login)} className="mt-8">
//           <div className="space-y-5">
//             <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPatern: (value) =>
//                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                     "Email address must be a valid address",
//                 },
//               })}
//             />
//             <Input
//               label="Password: "
//               type="password"
//               placeholder="Enter your password"
//               {...register("password", {
//                 required: true,
//               })}
//             />
//             <Button type="submit" className="w-full">
//               Sign in
//             </Button>
//           </div>
//         </form>
//         {showToast && ( // Conditional rendering of toaster
//           <Toaster text={error ? "Invalid credentials" : "Successfully logged in"} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, {  useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo/Logo";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import Toaster from "./toaster/Toaster"; // Import the Toaster component

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(""); // State to manage error message
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false); // State to control toaster visibility
const handleClose=()=>{
  setShowToast(false)
}



  const login = async (data) => {
    setError(""); // Reset error state
    fetch("http://localhost:63965/api/Users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.UserId) {
          dispatch(
            authLogin({
              userData: {
                name: resp.Name,
                email: resp.Email,
                id: resp.UserId,
                MoNumber: resp.MoNumber,
              },
            })
          );
          console.log("dispatche done")
          setShowToast(true); 

          setTimeout(()=>{
            setShowToast(false); 

       },5000)
          console.log("after setShowToast")
     //   return resp;
        } else {
          throw new Error("Invalid credentials");
        }
      }).then(()=>{
        setTimeout(() => {
          navigate("/userInfo");
        }, 2000); // Redirect after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid credentials");
        setShowToast(true); 

        setTimeout(()=>{
          setShowToast(false); 
  
         },3000)
        //setShowToast(true); // Show error toaster
      });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">Sign Up</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input label="Email: " placeholder="Enter your email" type="email" {...register("email", { required: true, })} />
            <Input label="Password: " type="password" placeholder="Enter your password" {...register("password", { required: true, })} />
            <Button type="submit" className="w-full">Sign in</Button>
          </div>
        </form>
          {showToast && <Toaster text={error ? "Invalid credentials" : "Successfully logged in"}
className={error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
onClick={handleClose}/>} {/* Render toaster conditionally */}
      </div>
    </div>
  );
}

export default Login; 
