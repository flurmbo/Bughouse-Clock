import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { isCordova } from "./utils";
import App from "./App";

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
