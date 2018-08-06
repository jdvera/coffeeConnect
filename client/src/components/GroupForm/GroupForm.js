import React from "react";
import "./GroupForm.css";

const GroupForm = props =>

	<form>
		<div className="form-group">
			<div>Group Name</div>
			<input type="text" className="form-control" placeholder="Group Name" autoFocus="yes" name="groupName" value={props.state.groupName} onChange={props.handleInputChange} />
		</div>
		<div className="form-group" style={props.state.passCheck ? { display: "block" } : { display: "none" }}>
			<div>Password</div>
			<input type="password" className="form-control" placeholder="Password" name="password" value={props.state.password} onChange={props.handleInputChange} />
			<div style={props.state.type === "new" && props.state.passCheck ? { display: "block" } : { display: "none" }}>Re-Type Password</div>
			<input type="password" className="form-control" placeholder="Re-Type Password" name="retype" value={props.state.retype} onChange={props.handleInputChange} style={props.state.passCheck ? { display: "block" } : { display: "none" }} />
		</div>
		<input type="checkbox" id="pass-check" name="passCheck" onChange={props.handleInputChange} /><span>Require Password?</span>
		<p id="message" style={props.state.message === "" ? { visibility: "hidden" } : { visibility: "visible" }}> {props.state.message} </p>
		<button onClick={props.handleGroupSubmit}>Submit</button>
	</form>

export default GroupForm;