import React, { Component, useState, useRef, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import history from "./history";
import Dropzone from "./elements/Dropzone";

class App extends Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Header} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
