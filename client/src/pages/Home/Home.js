import React, { Component } from "react";
import "./Home.css";
import API from "../../utils/API";
import GroupForm from "../../components/GroupForm";

class Home extends Component {

	state = {
		type: "",
		groupName: "",
		passCheck: false,
		password: "",
		retype: "",
		message: ""
	};

	handleInputChange = event => {
		let { name, value } = event.target;

		//  Still want the checkbox to toggle
		if (name !== "passCheck") event.preventDefault();

		//  for if the user chooses different button
		const oldType = this.state.type;

		//  checkboxes are weird so I need to toggle true/false
		if (name === "passCheck") {
			value = !this.state.passCheck;
		}

		this.setState({
			[name]: value,
			message: ""
		}, () => {
			console.log(name + ": " + value);

			//if the user presses a 
			if (name === "type") this.handleOverlay(oldType);
		});
	};

	handleOverlay = oldType => {
		const overlayBackground = document.getElementById("overlay-background");
		overlayBackground.style.display = (overlayBackground.style.display === "inline-block") ? "none" : "inline-block";

		//  If user chooses new type, clear out inputs
		if (overlayBackground.style.display === "inline-block" && this.state.type !== oldType) {
			this.setState({
				groupName: "",
				password: "",
				retype: "",
				message: ""
			}, () => console.log("clear inputs"));
		}

		const overlay = document.getElementById("overlay");
		overlay.style.display = (overlay.style.display === "inline-block") ? "none" : "inline-block";
	};

	handleGroupSubmit = event => {
		event.preventDefault();
		if (this.state.type === "new") {
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
		}
		else if (this.state.type === "join") {
			API.loginGroup({
				groupName: this.state.groupName,
				password: this.state.password
			}).then(res => {
				if (res.data.message) {
					this.setState({
						message: res.data.message
					}, () => console.log("group req's password"))
				}
				else {
					window.location.replace(res.data);
				}
			})
				.catch(err => console.log(err));
		}
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
					<button name="type" value="new" onClick={this.handleInputChange}>create new group</button>
				</div>
				
				<div className="row">
					<button name="type" value="join" onClick={this.handleInputChange}>join group</button>
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
