import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(Auth);
  if (!user) {
    return <Navigate to="/sign-in" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
