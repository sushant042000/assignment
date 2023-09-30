import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ component }) => {
  const { token } = useSelector((state) => state.user);
  console.log(token);

  return token ? component : <Navigate to="/" />;
};

export default Protected;
