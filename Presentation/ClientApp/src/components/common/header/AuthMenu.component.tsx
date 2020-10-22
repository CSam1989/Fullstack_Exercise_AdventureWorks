import { Button, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { logout } from "../../../redux/actions/Auth.actions";
import { ApplicationState } from "../../../redux/types/State";

const AuthMenu = (props: RouteComponentProps<any>) => {
  const { user } = useSelector((state: ApplicationState) => state.auth);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    props.history.push("/");
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user ? (
        <Button onClick={handleClick}>
          Hello {user.unique_name || "User"} <ArrowDropDownIcon />
        </Button>
      ) : (
        <Button component={RouterLink} to="/login" color="inherit">
          Login
        </Button>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === "Admin" ? (
          <MenuItem
            component={RouterLink}
            to="/admin/users"
            onClick={handleClose}
          >
            Users
          </MenuItem>
        ) : null}

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(AuthMenu);
