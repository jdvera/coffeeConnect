import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Join from "./pages/Join";
import New from "./pages/New";
// import Loading from "./pages/Loading";
import FourOhFour from "./pages/FourOhFour";



class App extends Component {
  render() {
    return (
      <Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/new-group" component={New} />
					<Route path="/join-group" component={Join} />
					{/* <Route exact path="/loading" component={Loading} /> */}
					<Route component={FourOhFour} />
				</Switch>
			</Router>
    );
  }
}

export default App;
