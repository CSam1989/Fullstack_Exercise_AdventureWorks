import "./NavMenu.styles.scss";

import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthMenu from "./AuthMenu.component";

export default () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button component={RouterLink} to="/" color="inherit">
          <Typography variant="h5">AdventureWorks</Typography>
        </Button>
        <div className="space-between"></div>
        <Button component={RouterLink} to="/customer" color="inherit">
          Customers
        </Button>
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
};
