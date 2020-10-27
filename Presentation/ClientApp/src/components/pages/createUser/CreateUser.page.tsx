import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { IAdminUser } from "../../../interfaces/AdminUser";
import { createUserAction } from "../../../redux/actions/Auth.actions";
import CreateUserForm from "../../createUserForm/CreateUserForm.component";

const CreateUserPage = (props: RouteComponentProps<any>) => {
  const [errors, setErrors] = useState("");
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();

  const handleCreateUser = async (formValues: IAdminUser) => {
    setSaving(true);
    try {
      await dispatch(createUserAction(formValues));
      toast.success("User created successfull");
      props.history.goBack();
    } catch (error) {
      setSaving(false);
      setErrors(error);
      toast.error("Creating user failed", { autoClose: false });
    }
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
