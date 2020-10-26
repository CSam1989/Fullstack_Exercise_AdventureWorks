import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ILogin } from "../../interfaces/Login";
import { LoginFormValidation } from "./LoginForm.validation";
import "./LoginForm.styles.scss";

export interface LoginFormProps extends RouteComponentProps<any> {
  error: string;
  LoginIn: boolean;
  handleSubmit(formvalues: ILogin): void;
}

const LoginForm = ({
  error,
  LoginIn,
  handleSubmit,
  history,
}: LoginFormProps) => {
  const initialValues: ILogin = {
    username: "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
      }}
      validationSchema={LoginFormValidation}
    >
      {({ errors, touched, values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            {error && (
              <div className="alert-danger" role="alert">
                {error === "Network Error"
                  ? "Network Error"
                  : "Wrong username/password combination"}
              </div>
            )}
            <TextField
              label="Username"
              name="username"
              className="inputfield"
              value={values.username}
              onChange={handleChange}
              error={!!errors.username && touched.username}
              helperText={
                !!errors.username && touched.username && errors.username
              }
            />
          </div>
          <div>
            <TextField
              label="Password"
              name="password"
              type="password"
              className="inputfield"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password && touched.password}
              helperText={
                !!errors.password && touched.password && errors.password
              }
            />
          </div>
          <ButtonGroup color="primary" fullWidth={true}>
            <Button type="submit" variant="contained" disabled={LoginIn}>
              {LoginIn ? "Login In..." : "Login"}
            </Button>
            <Button type="button" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
