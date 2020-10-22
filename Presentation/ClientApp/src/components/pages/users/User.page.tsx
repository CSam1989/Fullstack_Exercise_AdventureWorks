import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../redux/types/State";
import { toast } from "react-toastify";
import { Redirect } from "react-router";

const UserPage = () => {
  const { user } = useSelector((state: ApplicationState) => state.auth);

  if (user === null || user.role !== "Admin") {
    toast.error("Not Authorized", { autoClose: false });
    return <Redirect to="/" />;
  }

  return <h1>Users page</h1>;
};

export default UserPage;
