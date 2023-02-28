import React from "react";

const Navbar = () => {
  return (
    <nav className=" p-4 z-50 absolute w-full">
      <ul className=" flex justify-between items-center">
        <li>
          <h1 className=" text-red-600 text-2xl md:text-4xl font-bold italic">
            NETFLIX
          </h1>
        </li>
        <li>
          <div className=" flex items-center gap-4">
            <button className="text-white py-2 px-6 rounded-lg">Sign In</button>
            <button className=" bg-red-600 py-2 px-6 rounded-md text-white">
              Sign Up
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
