import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn } = useContext(Auth);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <div className=" w-full h-screen">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-bb48-0899f55f103a/11f12d4f-4e06-4f36-9cc9-68a869925fdd/MM-en-20230220-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt=""
        className="absolute w-full h-full object-cover"
      />
      <div className=" absolute w-full h-full bg-black/70"></div>
      <div className=" w-full h-full flex justify-center items-center relative z-50">
        <div className="  w-[400px] h-[600px] bg-black/70 rounded-lg">
          <form
            action=""
            onSubmit={handleSubmit}
            className=" px-10 py-20 text-white">
            <h1 className=" text-3xl font-bold">Sign In</h1>
            {error && <p className=" p-3 bg-red-400 mt-5">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none w-full p-3 bg-gray-700 rounded mt-7 mb-5"
              required
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none w-full p-3 bg-gray-700 rounded mb-7"
              required
            />
            <button className=" bg-red-600 py-3 px-6 rounded-md text-white w-full">
              Sign In
            </button>
            <div className="flex items-center justify-between mt-5">
              <div className=" text-gray-500 text-sm flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <p className="text-gray-500 text-sm">Need Help?</p>
            </div>
            <p className="py-8">
              <span className=" text-gray-500 mr-1">New to Netflix?</span>
              <Link to="/sign-up">
                <span>Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
