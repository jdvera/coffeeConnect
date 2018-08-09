import React, { Component } from "react";
import "./Join.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import API from "../../utils/API";

class Join extends Component {

    state = {
        screenName: "",
        password: "",
        url: window.location.pathname.split("/")[2],
        copied: false,
        submitClicked: false,
        message: ""
    };

    componentDidMount = () => console.log(this.state);

    handleInputChange = event => {
		event.preventDefault();
		let { name, value } = event.target;
		this.setState({
			[name]: value,
			message: ""
		}, () => {
			console.log(name + ": " + value);
		});
    };
    
    handleLogin = event => {
        event.preventDefault();
        console.log("submit clicked");
    };

    handleClipboard = () => {
        this.setState({ copied: true });
    }


    render(){
        return (
            <div className="container">
                <div className="row">
                </div>

                <div className="row">
                        <img src="../images/coffeelogoMed.png" alt="logo" id="imgStyle" />
                </div>

                <div className="row">
                    <div className="" id="fontStyle">coffee</div>
                    <div className="" id="fontStyle2">connection</div>
                </div>
                
                
                <div className="row">
                    <p>Send this link to your friends!</p>
                    <a id="groupUrl">{window.location.href}</a><br />
                    <CopyToClipboard text={window.location.href} onCopy={this.handleClipboard}>
                        <a>Copy to clipboard<i className="fas fa-clipboard"></i></a>
                    </CopyToClipboard>
                    <div style={this.state.copied ? { visibility: "visible" } : { visibility: "hidden" }}>
                        Copied.
                    </div>
                </div>
                
                
                <form className="row">
                    <div className="form-group">
                        <div>Screen Name</div>
                        <input type="text" className="form-control" placeholder="Name" autoFocus="yes" name="screenName" value={this.state.screenName} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <div>Password</div>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <p id="message" style={this.state.message === "" ? { visibility: "hidden" } : { visibility: "visible" }}> {this.state.message} </p>
                    <button onClick={this.handleLogin}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Join;