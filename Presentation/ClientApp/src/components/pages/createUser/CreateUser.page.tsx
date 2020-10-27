import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { IAdminUser } from "../../../interfaces/AdminUser";
import CreateUserForm from "../../createUserForm/CreateUserForm.component";

const CreateUserPage = (props: RouteComponentProps<any>) => {
  const [errors, setErrors] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreateUser = async (formValues: IAdminUser) => {
    console.log(formValues);
  };

  return (
    <>
      <h2>Create user</h2>
      <CreateUserForm
        error={errors}
        saving={saving}
        handleSubmit={handleCreateUser}
        {...props}
      />
    </>
  );
};

export default CreateUserPage;
