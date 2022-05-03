import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersWithReduxSaga from "./containers/Users";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={UsersWithReduxSaga} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
