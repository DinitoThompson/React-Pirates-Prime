import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      alert("Sign Out Successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-5 z-[100] w-full absolute">
      <Link to="/">
        <motion.h1
          animate={{
            x: 0,
            opacity: 1,
          }}
          initial={{
            x: -1000,
          }}
          className="text-green-500 text-4xl font-bold cursor-pointer tracking-widest animate-pulse"
        >
          PIRATES PRIME
        </motion.h1>
      </Link>
      {user?.email ? (
        <div className="flex flex-row items-center space-x-5">
          <Link to="/account">
            <button className="border-2 border-white px-6 py-1 rounded cursor-pointer text-white pr-4 opacity-50 hover:opacity-100 transition-all">
              My Account
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-green-500 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-row">
          <Link to="/login">
            <button className="transition ease-in-out delay-150 text-white pr-4 cursor-pointer px-6 py-2">
              Sign In
            </button>
          </Link>
          <div className="p-3"></div>
          <Link to="/signup">
            <button className="bg-green-500 px-6 py-2 rounded cursor-pointer text-white ">
              Join Our Crew!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
