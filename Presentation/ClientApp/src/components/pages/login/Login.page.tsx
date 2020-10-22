import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { ILogin } from "../../../interfaces/Login";
import { login } from "../../../redux/actions/Auth.actions";
import { toast } from "react-toastify";
import LoginForm from "../../loginForm/LoginForm.component";
import { ApplicationState } from "../../../redux/types/State";

const LoginPage = (props: RouteComponentProps<any>) => {
  const [error, setError] = useState("");
  const [LoginIn, setLoginIn] = useState(false);

  const { isLoggedIn } = useSelector((state: ApplicationState) => state.auth);
  const dispatch = useDispatch();

  if (isLoggedIn) return <Redirect to="/" />;

  const handleLogin = async (formValues: ILogin) => {
    setLoginIn(true);
    try {
      await dispatch(login(formValues));
      toast.success("Login successfull");
      props.history.goBack();
    } catch (error) {
      setLoginIn(false);
      setError(error.message);
      toast.error("Login failed", { autoClose: false });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm
        handleSubmit={handleLogin}
        error={error}
        LoginIn={LoginIn}
        {...props}
      />
    </>
  );
};

export default LoginPage;
