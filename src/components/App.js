import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./MovieDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie/:movieId" component={MovieDetails} />
        </Switch>
      </Router>
    );
  }
}

export default App;
