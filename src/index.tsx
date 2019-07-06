import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { isCordova } from "./utils";

declare let StatusBar: any;

const startApp = () => {
  if (isCordova()) {
    StatusBar.hide();
  }
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (isCordova()) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}
