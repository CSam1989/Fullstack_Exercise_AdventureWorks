import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import { getUsers } from "../../../redux/actions/Auth.actions";
import { ApplicationState } from "../../../redux/types/State";

const UserPage = () => {
  const { isLoggedIn, user, users } = useSelector(
    (state: ApplicationState) => state.auth
  );
  const dispatch = useDispatch();

  const dispatchUsers = async () => {
    try {
      await dispatch(getUsers());
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!users || users.length === 0) dispatchUsers();
  }, [users]);

  if (!isLoggedIn) return <Redirect to="/login" />;

  if (user === null || user.role !== "Admin") {
    toast.error("Not Authorized", { autoClose: false });
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Users page</h1>
      {users && users.map((user) => <p key={user.userId}>{user.username}</p>)}
    </>
  );
};

export default UserPage;
