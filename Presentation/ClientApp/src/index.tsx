import { Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.styles.scss";

import App from "./components/App";
import configureStore from "./redux/configureStore";
import registerServiceWorker from "./registerServiceWorker";

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
