import React, { Component} from "react";
import { Router, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import history from "./history";

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
