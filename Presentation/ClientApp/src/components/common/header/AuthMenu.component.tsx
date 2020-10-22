import { Button, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const AuthMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button component={RouterLink} to="/login" color="inherit">
        Login
      </Button>
      <Button onClick={handleClick}>
        Hello User <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          component={RouterLink}
          to="/admin/users"
          onClick={handleClose}
        >
          Users
        </MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AuthMenu;
