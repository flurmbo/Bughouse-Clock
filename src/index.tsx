import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

declare let window: any;
declare let StatusBar: any;

const startApp = () => {
  if (window.cordova) {
    StatusBar.hide();
  }
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (window.cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}
