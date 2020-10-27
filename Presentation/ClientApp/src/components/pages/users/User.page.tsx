import { ChangeSet } from "@devexpress/dx-react-grid";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

import { IAdminUser, UsersColumns } from "../../../interfaces/AdminUser";
import {
  getUsersAction,
  updateUserRoleAction,
} from "../../../redux/actions/Auth.actions";
import { ApplicationState } from "../../../redux/types/State";
import Tablegrid from "../../tablegrid/Tablegrid.components";
import { Link as RouterLink } from "react-router-dom";

import "./User.styles.scss";

const UserPage = () => {
  const [booleanColumns] = useState(["isAdmin"]);

  const [tableColumnExtensions] = useState<any>([
    { columnName: "username", editingEnabled: false },
    { columnName: "email", editingEnabled: false },
  ]);

  const [errors, setErrors] = useState<string[]>([]);

  const { isLoggedIn, user, users } = useSelector(
    (state: ApplicationState) => state.auth
  );
  const dispatch = useDispatch();

  const dispatchUsers = async () => {
    try {
      await dispatch(getUsersAction());
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

  const handleOnChange = async ({ added, changed }: ChangeSet) => {
    if (added) {
      console.log(added);
    }
    if (changed) {
      const changedRows = users && users.find((user) => changed[user.userId]);

      if (changedRows) {
        const changedUser: IAdminUser = {
          ...changedRows,
          ...changed[changedRows.userId],
        };

        try {
          await dispatch(updateUserRoleAction(changedUser));
        } catch (error) {
          setErrors(error);
          toast.error("Updating user failed", { autoClose: false });
        }
      }
    }
  };

  return (
    <>
      <h2>Users</h2>
      <Button
        className="create-button"
        component={RouterLink}
        to="/admin/create"
        color="primary"
      >
        New
      </Button>
      <Tablegrid
        columns={UsersColumns}
        rows={users || []}
        tableColumnExtensions={tableColumnExtensions}
        booleanColumns={booleanColumns}
        isEditable={true}
        getRowId={(row: IAdminUser) => row.userId}
        commitChanges={handleOnChange}
        errors={errors}
      />
    </>
  );
};

export default UserPage;
