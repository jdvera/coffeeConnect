import React, { Component} from "react";
import "./Join.css";

class Join extends Component {
    state = {
        screenName: "",
        password: "",
        message: ""
    };

    // componentDidMount = () => this.setState({thing: true}, () => console.log("hello"));

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
    }

    render(){
        return (
            <div className="main-wrapper" style={{textAlign: "center"}}>
                Join page
                <hr/>
                <form>
                    <div className="form-group">
                        <div>Screen Name</div>
                        <input type="text" className="form-control" placeholder="Name" autoFocus="yes" name="groupName" value={this.state.screenName} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <div>Password</div>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <p id="message" style={this.state.message === "" ? { visibility: "hidden" } : { visibility: "visible" }}> {this.state.message} </p>
                    <button onClick={this.handleLogin}>Submit</button>
                </form>
                <hr/>
                <button onClick={() => window.location.replace("/")}>Home</button>
            </div>
        );
    }
}

export default Join;