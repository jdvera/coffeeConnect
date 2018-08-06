import React from "react";
import "./GroupForm.css";

const GroupForm = props =>

	<form>
		<div className="form-group">
			<div>Group Name</div>
			<input type="text" className="form-control" placeholder="Group Name" autoFocus="yes" name="groupName" value={props.state.type === "" ? "" : props.state.groupName} onChange={props.handleInputChange} />
		</div>
		<div className="form-group" style={props.state.type === "join" || props.state.passCheck ? { display: "block" } : { display: "none" }}>
			<div>Password</div>
			<input type="password" className="form-control" placeholder={props.state.type === "join" ? "If there is no password, leave blank" : "Password"} name="password" value={props.state.type === "" ? "" : props.state.password} onChange={props.handleInputChange} />
			<div style={props.state.type === "new" && props.state.passCheck ? { display: "block" } : { display: "none" }}>Re-Type Password</div>
			<input type="password" className="form-control" placeholder="Re-Type Password" name="retype" value={props.state.type === "" ? "" : props.state.retype} onChange={props.handleInputChange} style={props.state.type === "new" && props.state.passCheck ? { display: "block" } : { display: "none" }} />
		</div>
		<div style={props.state.type === "new" ? { display: "block" } : { display: "none" }}>
			<input type="checkbox" id="pass-check" name="passCheck" style={{marginRight: "5px"}} onChange={props.handleInputChange} /><span>Require Password?</span>
		</div>
		<p id="message" style={props.state.message === "" ? { display: "none" } : { display: "block" }}> {props.state.message} </p>
		<button onClick={props.handleGroupSubmit}>Submit</button>
	</form>

export default GroupForm;