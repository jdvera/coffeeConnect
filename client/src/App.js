import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Main from "./pages/Main";

class App extends Component {
  render() {
    return (
      <Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/main" component={Main} />
				</Switch>
			</Router>
    );
  }
}

export default App;
