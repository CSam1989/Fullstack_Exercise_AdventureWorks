import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ApplicationState } from "../../../redux/types/State";

const CustomerPage = () => {
  const { isLoggedIn } = useSelector((state: ApplicationState) => state.auth);

  if (!isLoggedIn) return <Redirect to="/login" />;

  return <h1>Customer page</h1>;
};

export default CustomerPage;
