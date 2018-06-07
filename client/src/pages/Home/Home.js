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

	handleGroup = event => {
		event.preventDefault();
		this.handleOverlay();
		console.log("I was clicked");
		this.setState({
			type: event.target.name
		}, console.log(this.state));
	};

	handleInputChange = event => {
		if (event.target.name === "passCheck" && this.state.passCheck === "on") {
			this.setState({
				passCheck: false
			}, console.log(this.state));
		}
		else {
			const { name, value } = event.target;
			this.setState({
				[name]: value
			}, console.log(this.state));
		}
	};

	handleOverlay = event => {
		event && event.preventDefault();
		const overlay = document.getElementById("overlay");
		overlay.style.display = (overlay.style.display === "inline-block") ? "none" : "inline-block";
		const overlayBackground = document.getElementById("overlay-background");
		overlayBackground.style.display = (overlayBackground.style.display === "inline-block") ? "none" : "inline-block";
		overlayBackground.style.display === "none" && this.setState({
			type: "",
			groupName: "",
			password: "",
			retype: ""
		});
	}

	handleGroupSubmit = event => {
		event.preventDefault();
		if (this.state.type === "new") {
			if (this.state.password === this.state.retype) {
				this.setState({
					message: ""
				}, console.log("we guccii"));

				API.createGroup({
					groupName: this.state.groupName,
					password: this.state.password
				}).then(res => {
					console.log(res);
					this.handleOverlay();
				}).catch(err => {
						this.setState({
							message: err.responseJSON
						}, console.log("there was an error"));
					});
			}
			else {
				this.setState({
					message: "Passwords do not match",
					password: "",
					retype: ""
				}, console.log("RIP"));
			}
		}
		else if (this.state.type === "join") {
			this.handleOverlay();

			API.loginGroup({
				groupName: this.state.groupName,
				password: this.state.password
			}).then(res => {
				console.log(res.data);
				window.location.replace(res.data);
			})
				.catch(err => console.log(err));
		}
	}

	handleTest = event => {
		event.preventDefault();
		API.getGroups().then(res => console.log(res.data)).catch(err => console.log(err));
	}




	render() {
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
							<button name="new" onClick={this.handleGroup}>create new group</button>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="">
						<div className="row">
							<button name="join" onClick={this.handleGroup}>join group</button>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="">
						<div className="row">
							<button name="get" onClick={this.handleTest}>test GET</button>
						</div>
					</div>
				</div>

				<div id="overlay">
					<div>
						<br />
						<GroupForm state={this.state} handleGroupSubmit={this.handleGroupSubmit} handleInputChange={this.handleInputChange} />
						<br />
					</div>
				</div>

				<div id="overlay-background" onClick={this.handleOverlay}>
				</div>
			</div>
		);
	}
}

export default Home;