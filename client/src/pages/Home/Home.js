import React, { Component} from "react";
import "./Home.css";
import GroupForm from "../../components/GroupForm";

class Home extends Component {


	state = {
		type: "",
		groupName: "",
		password: "",
		retype: "",
		message: ""
	};
	
	handleGroup = event => {
		event.preventDefault();
		this.handleOverlay();
		console.log("I was clicked");
		this.setState({
			type: event.target.name
		}, console.log(this.state));
	};
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            hasSearched: false,
            dataOnFile: false
        }, console.log(this.state));
    };

	handleOverlay = event => {
		event && event.preventDefault();
		const overlay = document.getElementById("overlay");
		overlay.style.display = (overlay.style.display === "inline-block") ? "none" : "inline-block";
		const overlayBackground = document.getElementById("overlay-background");
		overlayBackground.style.display = (overlayBackground.style.display === "inline-block") ? "none" : "inline-block";
		overlayBackground.style.display === "none" && this.setState({type: "",
																	 groupName: "",
																	 password: "",
																	 retype: ""});
	 }

	handleGroupSubmit = event => {
		if(this.state.type === "new" && this.state.password !== this.state.retype) {
			this.setState({
				message: "Passwords do not match",
				password: "",
				retype: ""
			}, console.log("RIP"));
		}
		else {
			this.setState({
				message: ""
			}, console.log("we guccii"));
			this.handleOverlay();
		}
	}




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
							<button name="new" other="join" onClick={this.handleGroup}>create new group</button>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="">
						<div className="row">
							<button name="join" other="new" onClick={this.handleGroup}>join group</button>
						</div>
					</div>
				</div>

				<div id="overlay">
					<div>
						<GroupForm state={this.state} handleGroupSubmit={this.handleGroupSubmit} handleInputChange={this.handleInputChange} />
						<button onClick={this.handleGroupSubmit}> Submit </button>
					</div>
				</div>

				<div id="overlay-background" onClick={this.handleOverlay}>
				</div>

			</div>
        );
    }
}

export default Home;