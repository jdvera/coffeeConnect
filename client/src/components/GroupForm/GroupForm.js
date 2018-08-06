import React from "react";
import "./GroupForm.css";

const GroupForm = props =>

	<form>
		<div className="form-group">
			<div>Group Name</div>
			<input type="text" className="form-control" placeholder="Group Name" autoFocus="yes" name="groupName" value={props.state.groupName} onChange={props.handleInputChange} />
		</div>
		<div className="form-group">
			<div>Password</div>
			<input type="password" className="form-control" placeholder="Password" name="password" value={props.state.password} onChange={props.handleInputChange} />
			<input type="password" id="retype" className="form-control" placeholder="Re-Type Password" name="retype" value={props.state.retype} onChange={props.handleInputChange} />
		</div>
		<p id="message" style={props.state.message === "" ? { visibility: "hidden" } : { visibility: "visible" }}> {props.state.message} </p>
		<button onClick={props.handleGroupSubmit}>Submit</button>
	</form>

export default GroupForm;