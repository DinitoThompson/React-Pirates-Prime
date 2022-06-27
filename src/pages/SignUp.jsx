import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Welcome To Pirate Prime Matie!");
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      setError(`${error}`);
      console.log(error);
      alert("Unsuccessful Registration Matie!\r\n", `${error}`);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-4 z-50">
          <div className="max-w-[450px] h-[500px] mx-auto mt-32 bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Pirate Registration</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded opacity-50 focus:opacity-100"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded opacity-50 focus:opacity-100"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="bg-green-500 opacity-50 hover:opacity-100 transition-all py-3 my-6 rounded font-bold">
                  Join The Crew !
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember Me?
                  </p>
                  <p className="text-white hover:text-green-500 transition-all cursor-pointer">
                    Need Help?
                  </p>
                </div>
                <p className="py-7">
                  <span className="text-gray-600">
                    Already Apart Of The Crew?
                  </span>{" "}
                  <Link
                    to="/login"
                    className="text-white hover:text-green-500 transition-all"
                  >
                    Climb Aboard !
                  </Link>
                </p>
                {error ? (
                  <p className="p-3 bg-green-500  animate-pulse opacity-80 my-2">
                    {error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
