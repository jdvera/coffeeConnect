import React, { Component } from "react";
import "./Home.css";
import API from "../../utils/API";
import GroupForm from "../../components/GroupForm";

class Home extends Component {
	type

	state = {
		groupName: "",
		passCheck: false,
		password: "",
		retype: "",
		message: ""
	};

	handleInputChange = event => {
		let { name, value } = event.target;

		//  checkboxes are weird so I need to toggle true/false
		if (name === "passCheck") {
			value = !this.state.passCheck;
		}
		else event.preventDefault();

		this.setState({
			[name]: value,
			message: ""
		}, () => {
			console.log(name + ": " + value);
		});
	};

	handleOverlay = event => {
		if (event) event.preventDefault();
		const overlayBackground = document.getElementById("overlay-background");
		overlayBackground.style.display = (overlayBackground.style.display === "inline-block") ? "none" : "inline-block";
		const overlay = document.getElementById("overlay");
		overlay.style.display = (overlay.style.display === "inline-block") ? "none" : "inline-block";
	};

	handleGroupSubmit = event => {
		event.preventDefault();
		let newObj = {};
		let callback = this.createGroup;

		if (this.state.passCheck) {
			if (this.state.password === this.state.retype) {
				newObj = { message: "" };
			}
			else {
				newObj = {
					message: "Passwords do not match",
					password: "",
					retype: ""
				};
				callback = () => console.log("Passwords didn't match");
			}
		}
		else {
			newObj = { password: "" };
		}

		this.setState(newObj, callback);
	};

	createGroup = () => API.createGroup({
		groupName: this.state.groupName,
		password: this.state.password,
		reqPass: this.state.passCheck
	}).then(res => {
		window.location.replace(res.data);
	}).catch(err => {
		if (err.response.status === 422) {
			this.setState({
				message: "Username taken"
			}, () => console.log("Home.js - createGroup - there was an error", this.state.message));
		}
	});

	handleTest = event => {
		event.preventDefault();
		API.getUser().then(res => console.log(res.data)).catch(err => console.log(err));
	};

	handleLogout = event =>{
		event.preventDefault();
		API.logout().then(res => {
            if (res.data) {
                console.log("Logout successful");
                window.location.href = "/";
            }
            else {
                console.log("Home.js - handleLogout - 'Something went wrong'");
            }
        }).catch(err => console.log(err));
	}

	render() {
		return (
			<div className="container">
				<div className="row">
				</div>

				<div className="row">
						<img src="./images/coffeelogoMed.png" alt="logo" id="imgStyle" />
				</div>

				<div className="row">
					<div className="" id="fontStyle">coffee</div>
					<div className="" id="fontStyle2">connection</div>
				</div>
				
				
				<div className="row">
					<button onClick={this.handleOverlay}>create new group</button>
				</div>
				
				<div className="row">
					<button name="get" onClick={this.handleTest}>get group info</button>
				</div>
				
				<div className="row">
					<button name="get" onClick={this.handleLogout}>logout group</button>
				</div>
						

				<div id="overlay">
					<br />
					<GroupForm state={this.state} handleGroupSubmit={this.handleGroupSubmit} handleInputChange={this.handleInputChange} />
					<br />
				</div>

				<div id="overlay-background" onClick={this.handleOverlay}>
				</div>
			</div>
		);
	};
}

export default Home;
