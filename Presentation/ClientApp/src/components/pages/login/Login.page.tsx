import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ILogin } from "../../../interfaces/Login";
import { login } from "../../../redux/actions/Auth.actions";
import { ApplicationState } from "../../../redux/types/State";
import LoginForm from "../../loginForm/LoginForm.component";

const LoginPage = (props: RouteComponentProps<any>) => {
  const [error, setError] = useState("");
  const [LoginIn, setLoginIn] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (formValues: ILogin) => {
    setLoginIn(true);
    try {
      await dispatch(login(formValues));
      props.history.goBack();
    } catch (error) {
      setLoginIn(false);
      setError(error.message);
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
