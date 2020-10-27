import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { RouteComponentProps } from "react-router";
import { IAdminUser } from "../../interfaces/AdminUser";
import { CreateUserFormValidation } from "./CreateUserForm.validation";

export interface CreateUserFormProps extends RouteComponentProps<any> {
  error: string;
  saving: boolean;
  handleSubmit(formvalues: IAdminUser): void;
}

const CreateUserForm = ({
  error,
  saving,
  handleSubmit,
  history,
}: CreateUserFormProps) => {
  const initialValues: IAdminUser = {
    userId: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
      }}
      validationSchema={CreateUserFormValidation}
    >
      {({ errors, touched, values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="app-form">
          <div>
            {error && (
              <div className="alert-danger" role="alert">
                {error}
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
          <div>
            <TextField
              label="Email"
              name="email"
              type="email"
              className="inputfield"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email && touched.email}
              helperText={!!errors.email && touched.email && errors.email}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isAdmin}
                  onChange={handleChange}
                  name="isAdmin"
                  color="primary"
                />
              }
              label="Admin?"
            />
          </div>
          <ButtonGroup color="primary" fullWidth={true}>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving..." : "Save"}
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

export default CreateUserForm;
