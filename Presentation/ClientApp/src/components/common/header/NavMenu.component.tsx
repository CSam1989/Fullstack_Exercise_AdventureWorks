import "./NavMenu.styles.scss";

import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";
import AuthMenu from "./AuthMenu.component";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../redux/types/State";

export default () => {
  const { isLoggedIn } = useSelector((state: ApplicationState) => state.auth);
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Button component={RouterLink} to="/" color="inherit">
          <Typography variant="h6">AdventureWorks</Typography>
        </Button>
        <div className="space-between"></div>
        {isLoggedIn ? (
          <Button component={RouterNavLink} to="/customer" color="inherit">
            Customers
          </Button>
        ) : null}
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
};
