import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Join from "./pages/Join";
import New from "./pages/New";

class App extends Component {
  render() {
    return (
      <Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/new-group" component={New} />
					<Route exact path="/join-group" component={Join} />
				</Switch>
			</Router>
    );
  }
}

export default App;
