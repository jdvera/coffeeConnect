import React, { Component} from "react";
import "./Home.css";

class Home extends Component {


	state = {
		create: false,
		join: false
    };








    render(){
        return (
            <div className="container">
				<div className="row">
				</div>
				

				<div className="row">
					<div>
						<img src="./images/coffeelogoMed.png" alt="logo" id="imgStyle" />
					</div>
				</div>

				<div className="row">
					<div className="" id="fontStyle">coffee</div>
					<div className="" id="fontStyle2">connection</div>
				</div>
				
				<div className="row">
					<div className="">
						<div className="row">
							<a href="new-group"><button>create new group</button></a>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="">
						<div className="row">
							<a href="join-group"><button>join group</button></a>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default Home;