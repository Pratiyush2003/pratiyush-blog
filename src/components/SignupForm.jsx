import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const signUphandle = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/auth/signup', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({userEmail, userPassword})
    })
    const signupData = await res.json();
    if(signupData.error){
      console.log(signupData.error)
  }else{
      console.log(signupData.success)
      navigate('/LoginPage')
  }
    setUserPassword("");
    setUserEmail("")
  }

  return (
    <>
      <div
        className="mt-12
  mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10"
      >
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
            <p className="mt-2 text-gray-500">
              Sign Up to create a new account
            </p>
          </div>
          <div className="mt-5">
            <form action="">
              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  id="email"
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="NA"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                <button
                onClick={signUphandle}
                  type="submit"
                  className="w-full rounded-md bg-[#9381ff] px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
              <Link to={"/LoginPage"}>
                <p className="text-center text-sm text-gray-500">
                  Already have account Login
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
