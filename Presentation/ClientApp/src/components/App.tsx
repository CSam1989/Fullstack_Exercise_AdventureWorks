import "react-toastify/dist/ReactToastify.css";

import { Container } from "@material-ui/core";
import * as React from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";

import NavMenu from "./common/header/NavMenu.component";
import CustomerPage from "./pages/customer/Customer.page";
import Home from "./pages/home/Home.page";
import LoginPage from "./pages/login/Login.page";
import UserPage from "./pages/users/User.page";

export default () => (
  <>
    <NavMenu />
    <Container maxWidth="lg">
      <Route exact path="/" component={Home} />
      <Route path="/customer" component={CustomerPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/admin/users" component={UserPage} />
    </Container>
    <ToastContainer autoClose={3000} hideProgressBar position="bottom-right" />
  </>
);
