import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(Auth);
  // console.log(user.email);

  const navigate = useNavigate();
  const userEmail = user?.email?.split("@");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className=" p-4 z-[1000] absolute w-full">
      <ul className=" flex justify-between items-center">
        <li>
          <Link to="/">
            <h1 className=" text-red-600 text-2xl md:text-4xl font-bold italic">
              NETFLIX
            </h1>
          </Link>
        </li>
        {user?.email ? (
          <li>
            <div className=" flex items-center gap-4">
              <Link to="/account">
                <button className="text-white py-2 px-6 rounded-lg">
                  {userEmail[0].toUpperCase()}
                  {/* {user?.email} */}
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className=" bg-red-600 py-2 px-6 rounded-md text-white">
                Logout
              </button>
            </div>
          </li>
        ) : (
          <li>
            <div className=" flex items-center gap-4">
              <Link to="/sign-in">
                <button className="text-white py-2 px-6 rounded-lg">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className=" bg-red-600 py-2 px-6 rounded-md text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
