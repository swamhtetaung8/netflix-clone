import React, { useContext } from "react";
import SavedShows from "../components/SavedShows";
import { Auth } from "../context/AuthContext";

const Account = () => {
  const { user } = useContext(Auth);
  return (
    <div>
      <div className=" relative w-full h-[400px]">
        <h1 className=" text-white absolute z-[500] w-full h-[400px] flex items-center pl-5 text-4xl md:text-5xl ">
          Hello {user?.email?.split("@")[0]}
        </h1>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-bb48-0899f55f103a/11f12d4f-4e06-4f36-9cc9-68a869925fdd/MM-en-20230220-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
          className="absolute w-full h-[400px] object-cover"
        />
        <div className=" absolute w-full h-[400px] bg-black/70"></div>
      </div>
      <SavedShows />
    </div>
  );
};

export default Account;
