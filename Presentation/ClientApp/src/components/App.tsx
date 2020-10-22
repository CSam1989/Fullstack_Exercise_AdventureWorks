import * as React from "react";
import { Route } from "react-router";
import Home from "./pages/home/Home.page";

import CustomerPage from "./pages/customer/Customer.page";
import LoginPage from "./pages/login/Login.page";
import NavMenu from "./common/header/NavMenu.component";
import { Container } from "@material-ui/core";
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
  </>
);
